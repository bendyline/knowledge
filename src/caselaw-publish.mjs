import { resolve } from 'node:path';
import { openAsBlob } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { listFiles, uploadFiles } from '@huggingface/hub';
import { assertVersion } from './build.mjs';
import { digest, exists, hashFile, inside, inventory, readJson, write, writeJson } from './files.mjs';
import { getJson, githubApi, githubHeaders, request } from './http.mjs';
import { publishRelease, verifyRemote } from './publish.mjs';

export async function publishCapCollection(root, config, { version, apply = false, services = {} } = {}) {
  assertVersion(version);
  if (!config.publish?.enabled) throw new Error('Collection publishing is disabled');
  const directory = inside(resolve(root, '.work/collections'), `${config.id}/${version}`);
  const index = await readJson(resolve(directory, 'collection.json'));
  if (index.collection !== config.id || index.version !== version || !index.complete || !index.coverageComplete
    || !index.parts.length || index.parts.some(p => !p.verified || !p.integrity || !p.semanticPassed || !p.semanticQueries)) throw new Error('Every collection part must pass integrity and semantic verification before publication');
  const ids = index.parts.flatMap(p => p.caseIds);
  if (ids.length !== index.coverage.selectedCases || new Set(ids).size !== ids.length) throw new Error('Collection membership is incomplete or overlaps');
  const io = { publishRelease, verifyRemote, getJson, githubApi, listFiles, uploadFiles, request,
    tokens: () => ({ hf: process.env.HF_TOKEN, github: process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN }), ...services };
  const parts = [];
  for (const part of index.parts) {
    const partDirectory = inside(resolve(root, '.work/releases'), `${part.catalogId}/${version}`);
    const release = await readJson(resolve(partDirectory, 'release.json'));
    if (release.sha256 !== part.sha256 || release.catalogId !== part.catalogId || release.manifest.counts.documents !== part.caseIds.length
      || digest(release.targets) !== digest(config.publish)) throw new Error('Collection part differs from its release or publishing destinations');
    parts.push({ part, partDirectory, release });
  }
  // Validate all parts before the first public side effect.
  for (const p of parts) await io.publishRelease(root, p.partDirectory, { apply: false });
  if (!apply) return { applied: false, collection: config.id, version, parts: parts.map(p => p.part.catalogId), publishIndexLast: true };
  const sourceCommit = parts[0].release.sourceCommit;
  if (parts.some(p => p.release.sourceCommit !== sourceCommit)) throw new Error('Collection parts must come from the same source commit');
  const published = [];
  for (const { part, partDirectory } of parts) {
    await io.publishRelease(root, partDirectory, { apply: true });
    const receipt = await readJson(resolve(partDirectory, 'published.json'));
    if (!receipt.github || !receipt.huggingface || receipt.sha256 !== part.sha256) throw new Error('Collection part publication receipts are incomplete');
    const { directory: localDirectory, ...publicPart } = part;
    published.push({ ...publicPart, downloads: receipt });
  }
  const publicDirectory = resolve(directory, 'public');
  const manifest = { ...index, sourceCommit, parts: published };
  await writeJson(resolve(publicDirectory, 'collection.json'), manifest);
  const sha256 = await hashFile(resolve(publicDirectory, 'collection.json'));
  await write(resolve(publicDirectory, 'SHA256SUMS'), `${sha256}  collection.json\n`);
  await write(resolve(publicDirectory, 'NOTICE.md'), `# ${config.name}\n\nCase data and metadata: CC0 1.0 Universal. Voluntary credit: Caselaw Access Project, Harvard Law School Library. Source: https://static.case.law/.\n\nHistorical CAP coverage; not a statement of current legal validity. Each archive contains full licensing evidence and source provenance. See collection.json for exact case membership, dates, checksums and immutable downloads.\n`);
  const receiptPath = resolve(directory, 'published.json');
  const receipt = await exists(receiptPath) ? await readJson(receiptPath) : { schemaVersion: 1, collection: config.id, version, sha256 };
  if (receipt.sha256 !== sha256) throw new Error('Collection publication receipt identifies different content');
  const { hf, github } = io.tokens();
  if (!hf || !github) throw new Error('Collection publication requires HF_TOKEN and GH_TOKEN');
  const repo = { type: 'dataset', name: config.publish.huggingFace };
  const base = `https://huggingface.co/datasets/${repo.name}`;
  const prefix = `collections/${config.id}/releases/${version}`;
  const metadata = await io.getJson(`https://huggingface.co/api/datasets/${repo.name}`, { headers: { Authorization: `Bearer ${hf}` } });
  if (metadata.private !== false) throw new Error('Collection dataset must be public');
  if (!receipt.huggingface) {
    let previous;
    try { previous = await io.getJson(`${base}/resolve/${metadata.sha}/${prefix}/collection.json`); } catch (e) { if (e.status !== 404) throw e; }
    if (previous && digest(previous) !== digest(manifest)) throw new Error('A different immutable collection version already exists');
    let revision;
    if (previous) {
      for await (const f of io.listFiles({ repo, accessToken: hf, path: prefix, revision: metadata.sha, expand: true })) if (f.path === `${prefix}/collection.json`) revision = f.lastCommit?.id;
    } else {
      const uploaded = await io.uploadFiles({ repo, accessToken: hf, parentCommit: metadata.sha, commitTitle: `${config.id} collection ${version}`,
        files: (await inventory(publicDirectory)).map(f => ({ path: `${prefix}/${f.path}`, content: pathToFileURL(inside(publicDirectory, f.path)) })) });
      revision = uploaded?.commit.oid;
    }
    if (!/^[a-f0-9]{40}$/.test(revision ?? '')) throw new Error('Collection host did not return an immutable commit');
    receipt.huggingface = { repo: repo.name, revision, path: `${prefix}/collection.json` };
  }
  const bytes = (await openAsBlob(resolve(publicDirectory, 'collection.json'))).size;
  await io.verifyRemote(`${base}/resolve/${receipt.huggingface.revision}/${receipt.huggingface.path}`, sha256, bytes);
  await writeJson(receiptPath, receipt);
  const repository = config.publish.github;
  const tag = `${config.id}-v${version}`;
  let gh;
  try { gh = await io.githubApi(`/repos/${repository}/releases/tags/${tag}`); } catch (e) { if (e.status !== 404) throw e; }
  if (!gh) gh = await io.githubApi(`/repos/${repository}/releases`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tag_name: tag, target_commitish: sourceCommit, name: `${config.name} ${version}`, draft: true,
      body: `${index.coverage.selectedCases} historical CAP case records in ${published.length} verified archives.\n\nDownload collection.json for the complete immutable set of archive URLs, checksums and case membership.\n\nLicense: CC0-1.0. Source: https://static.case.law/.` }) });
  for (const f of await inventory(publicDirectory)) {
    const blob = await openAsBlob(inside(publicDirectory, f.path));
    const existing = gh.assets.find(a => a.name === f.path);
    if (existing) await io.verifyRemote(existing.url, f.sha256, blob.size, { ...githubHeaders(github), Accept: 'application/octet-stream' });
    else {
      if (!gh.draft) throw new Error('Published collection release is missing assets; refusing to mutate it');
      await io.request(`${gh.upload_url.replace(/\{.*$/, '')}?name=${encodeURIComponent(f.path)}`, { method: 'POST', headers: { ...githubHeaders(github), 'Content-Type': 'application/octet-stream' }, body: blob, maxBytes: 1000000, attempts: 1 });
    }
  }
  if (gh.draft) gh = await io.githubApi(`/repos/${repository}/releases/${gh.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ draft: false }) });
  const url = `https://github.com/${repository}/releases/download/${tag}/collection.json`;
  await io.verifyRemote(url, sha256, bytes);
  receipt.github = { repository, tag, url: gh.html_url, indexUrl: url };
  await writeJson(receiptPath, receipt);
  return { applied: true, collection: config.id, version, parts: published.length, receipt };
}

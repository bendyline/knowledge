import test from 'node:test';
import assert from 'node:assert/strict';
import { copyFile, mkdtemp, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { ZipFile } from 'yazl';
import { CASELAW_TERMS } from '../src/caselaw-policy.mjs';
import { capCoverage, indexCapVolume, loadCapRoots, openCapInventory, scanCapInventory, readCapObject } from '../src/caselaw-inventory.mjs';
import { capDocument, ingestCapCorpus } from '../src/caselaw-corpus.mjs';
import { auditCapCorpus, auditCapText } from '../src/caselaw-audit.mjs';
import { compareCapRecords, compareCapSnapshots } from '../src/caselaw-diff.mjs';
import { CapCollection, bindCapPartLinks, buildCapCollection, estimateCapArchiveBytes, partitionCapCases, planCapCollection } from '../src/caselaw-packages.mjs';
import { fakeEmbedder } from './helpers.mjs';
import { digest, exists, json, readJson, removeWork, sha256 } from '../src/files.mjs';
import { capSelectionCoverage, capSelectionKey } from '../src/caselaw-selection.mjs';

const record = (id, jurisdiction = 33) => ({ id, name: `Example ${id} v. State`, name_abbreviation: `Example ${id} v. State`, file_name: `000${id}-01`, decision_date: '1954-05-01',
  jurisdiction: { id: jurisdiction, name: jurisdiction === 33 ? 'Wyo.' : 'Okla.', name_long: jurisdiction === 33 ? 'Wyoming' : 'Oklahoma' }, court: { id: 90, name: 'Example Court' },
  citations: [{ type: 'official', cite: `1 Wyo. ${id}` }], casebody: { opinions: [{ type: 'majority', author: 'Judge', text: 'A complete judgment.' }] } });
const metadata = records => records.map(({ casebody, ...r }) => r);
const html = '<section class="casebody"><article class="opinion" data-type="majority"><p>A complete judgment. See <a href="/p2d/1/0002-01">the other case</a>.</p></article></section>';
async function zip(records) {
  const zip = new ZipFile();
  zip.addBuffer(Buffer.from(json({ volume_number: '1' })), 'metadata/VolumeMetadata.json');
  zip.addBuffer(Buffer.from(json(metadata(records))), 'metadata/CasesMetadata.json');
  for (const r of records) { zip.addBuffer(Buffer.from(json(r)), `json/${r.file_name}.json`); zip.addBuffer(Buffer.from(html), `html/${r.file_name}.html`); }
  zip.end(); const chunks = []; for await (const c of zip.outputStream) chunks.push(c); return Buffer.concat(chunks);
}

test('CAP plans preserve whole cases and years, split oversized years, and reject overlap or oversized cases', () => {
  const rows = [1, 2, 3, 4].map(id => ({ id, date: id < 3 ? '1954-01-01' : '1955-01-01', court: 1, chunks: 1, estimatedBytes: 30 }));
  const parts = partitionCapCases(rows, { targetBytes: 100, ceilingBytes: 150 });
  assert.deepEqual(parts.map(p => p.cases.map(c => c.id)), [[1, 2], [3, 4]]);
  assert.deepEqual(partitionCapCases([...rows].reverse(), { targetBytes: 100, ceilingBytes: 150 }), parts);
  assert.equal(partitionCapCases(rows, { targetBytes: 50, ceilingBytes: 150 }).length, 4);
  assert.throws(() => partitionCapCases([...rows, rows[0]], { targetBytes: 100, ceilingBytes: 150 }), /Duplicate/);
  assert.throws(() => partitionCapCases([{ ...rows[0], estimatedBytes: 151 }], { targetBytes: 100, ceilingBytes: 150 }), /cannot fit/);
  const md = '[local](https://static.case.law/wyo/1/html/0001-01.html) [outside](https://static.case.law/wyo/1/html/0002-01.html)';
  const targets = new Map([['https://static.case.law/wyo/1/html/0001-01.html', '1954/cap-1.md'], ['https://static.case.law/wyo/1/html/0002-01.html', '1955/cap-2.md']]);
  const bound = bindCapPartLinks(md, targets, new Set(['1954/cap-1.md']), '1954/cap-3.md');
  assert.match(bound, /\[local\]\(cap-1.md\)/);
  assert.match(bound, /\[outside\]\(https:\/\/static.case.law/);
});

test('CAP coalesces tiny final parts within target tolerance without exceeding the ceiling', () => {
  const rows = [100, 5].map((estimatedBytes, i) => ({ id: i + 1, date: `${2000 + i}-01-01`, court: 1, chunks: i + 1, estimatedBytes }));
  const parts = partitionCapCases(rows, { targetBytes: 100, ceilingBytes: 150 });
  assert.equal(parts.length, 1);
  assert.equal(parts[0].estimatedBytes, 105);
  assert.equal(parts[0].chunks, 3);
  assert.deepEqual(parts[0].cases, rows);
  assert.equal(partitionCapCases(rows, { targetBytes: 100, ceilingBytes: 104 }).length, 2);
  assert.equal(partitionCapCases([rows[0], { ...rows[1], estimatedBytes: 6 }], { targetBytes: 100, ceilingBytes: 150 }).length, 2);
});

test('CAP uses a 1 GiB target and applies Wyoming calibration only to its measured profile', () => {
  const config = CapCollection.parse({ schemaVersion: 1, id: 'cap-size', name: 'Size', jurisdiction: 'wyo', sizeEstimate: 'wyoming-bge-v1' });
  assert.equal(config.targetBytes, 1073741824);
  assert.throws(() => CapCollection.parse({ ...config, embeddingProfile: 'multilingual-e5-small@2' }), /measured embedding profile/);
  assert.equal(estimateCapArchiveBytes(1000, 10, 100, 'wyoming-bge-v1'), Math.ceil(estimateCapArchiveBytes(1000, 10, 100) * 0.6));
});

test('CAP inventory resumes failures, reconciles regional membership, ingests once and builds a frozen collection offline', async () => {
  await mkdir('.work/tests', { recursive: true });
  const root = await mkdtemp(resolve('.work/tests', 'cap-collection-'));
  await copyFile('package-lock.json', resolve(root, 'package-lock.json'));
  const store = await openCapInventory(root, 'fixture');
  const previous = CASELAW_TERMS.sha256;
  CASELAW_TERMS.sha256 = sha256('fixture terms');
  try {
    const first = [{ ...record(1), file_name: 'Supp. 761-01' }]; const second = [record(2), { ...record(3, 13), file_name: '000?-01' }];
    const roots = {
      ReportersMetadata: ['wyo', 'p2d'].map(slug => ({ slug, jurisdictions: [{ id: 33 }] })),
      VolumesMetadata: ['wyo', 'p2d'].map(reporter_slug => ({ reporter_slug, volume_folder: '1', jurisdictions: [] })),
      JurisdictionsMetadata: [{ id: 33, slug: 'wyo', name_long: 'Wyoming', case_count: 2, reporters: [{ slug: 'wyo' }, { slug: 'p2d' }] },
        { id: 13, slug: 'okla', name_long: 'Oklahoma', case_count: 1, reporters: [{ slug: 'p2d' }] },
        { id: 9, slug: 'regional', name_long: 'Regional', reporters: [{ slug: 'p2d' }] }],
    };
    const responses = new Map(Object.entries(roots).map(([k, v]) => [`https://static.case.law/${k}.json`, Buffer.from(json(v))]));
    responses.set(CASELAW_TERMS.sourceUrl, Buffer.from('fixture terms'));
    responses.set('https://static.case.law/wyo/1/CasesMetadata.json', Buffer.from(json(metadata(first))));
    responses.set('https://static.case.law/p2d/1/CasesMetadata.json', Buffer.from(json(metadata(second))));
    responses.set('https://static.case.law/wyo/1.zip', await zip(first));
    responses.set('https://static.case.law/p2d/1.zip', await zip(second));
    const counts = new Map(); let failIndex = true; let failArchive = false;
    const download = async url => {
      counts.set(url, (counts.get(url) ?? 0) + 1);
      if (failIndex && url.includes('p2d/1/CasesMetadata')) throw new Error('temporary index failure');
      if (failArchive && url.endsWith('p2d/1.zip')) return { bytes: await zip([{ ...second[0], name: 'Changed' }, second[1]]) };
      if (!responses.has(url)) throw new Error(`Unexpected network request ${url}`);
      return { bytes: responses.get(url) };
    };
    const partial = await scanCapInventory(store, 'wyo', { download, concurrency: 2 });
    assert.equal(partial.metadataComplete, false);
    assert.equal(partial.unresolvedVolumes.length, 1);
    failIndex = false;
    const complete = await scanCapInventory(store, 'wyo', { download });
    assert.equal(complete.metadataComplete, true);
    assert.equal(complete.records, 2);
    const national = capCoverage(store, await loadCapRoots(store), 'all');
    assert.equal(national.advertisedCases, 3);
    assert.equal(national.metadataComplete, true);
    assert.equal(counts.get('https://static.case.law/wyo/1/CasesMetadata.json'), 1);
    failArchive = true;
    const bad = await ingestCapCorpus(store, 'wyo', { download });
    assert.equal(bad.ingestionComplete, false);
    assert.equal(bad.corpus.ready, 1);
    assert.match(bad.issues[0].reason, /metadata changed/);
    failArchive = false;
    const ready = await ingestCapCorpus(store, 'wyo', { download });
    assert.equal(ready.ingestionComplete, true);
    assert.equal((await compareCapSnapshots(store, store, 'wyo')).unchanged, 2);
    assert.equal(counts.get('https://static.case.law/wyo/1.zip'), 1);
    const audited = await auditCapCorpus(store, 'wyo');
    assert.equal(audited.verified, true, JSON.stringify(audited.issues));
    assert.equal(auditCapText('# Title\n\nChanged words', '<p>Original words</p>').textMatches, false);
    const config = CapCollection.parse({ schemaVersion: 1, id: 'cap-fixture', name: 'Fixture', jurisdiction: 'wyo' });
    // Planning and building have no download dependency: all sources are pinned local objects.
    const preview = await planCapCollection(store, { ...config, name: 'Preview' }, { embedderFactory: fakeEmbedder, freeze: false });
    assert.equal(preview.parts.flatMap(p => p.cases).length, 2);
    assert.equal(await exists(resolve(store.directory, 'cap-fixture-plan.json')), false);
    const plan = await planCapCollection(store, config, { embedderFactory: fakeEmbedder });
    assert.equal(plan.parts.flatMap(p => p.cases).length, 2);
    const result = await buildCapCollection(store, config, plan, { version: '2026.10.1', createdAt: '2026-10-06T00:00:00Z', embedderFactory: fakeEmbedder });
    assert.equal(result.complete, true);
    assert.equal(result.parts[0].counts.documents, 2);
    assert.equal(result.coverageComplete, true);
    const failedSearch = await buildCapCollection(store, config, plan, { version: '2026.10.1', embedderFactory: fakeEmbedder,
      verify: async () => ({ integrity: true, semantic: [{ passed: false }] }) });
    assert.equal(failedSearch.coverageComplete, true);
    assert.equal(failedSearch.complete, false);
    assert.equal(failedSearch.parts[0].integrity, true);
    assert.equal(failedSearch.parts[0].semanticPassed, false);
    const row = store.db.prepare('SELECT * FROM cases WHERE id=1').get();
    const source = (await readCapObject(store, capDocument(store, row).markdown_sha)).toString();
    assert.match(source, /https:\/\/static.case.law\/p2d\/1\/html\/0002-01.html/);
    assert.equal((await buildCapCollection(store, config, plan, { version: '2026.10.1', embedderFactory: fakeEmbedder })).parts[0].sha256, result.parts[0].sha256);
    // A reporter collection includes every jurisdiction in the selected books,
    // while retaining exact bounded volume membership and the same audit gates.
    const selection = { reporter: 'p2d', volumes: ['1'] };
    const reporterConfig = CapCollection.parse({ schemaVersion: 1, id: 'cap-reporter', name: 'Reporter', ...selection });
    assert.throws(() => CapCollection.parse({ ...reporterConfig, jurisdiction: 'wyo' }), /exactly one/);
    assert.throws(() => CapCollection.parse({ ...config, volumes: ['1'] }), /requires a reporter/);
    const reporterCoverage = capSelectionCoverage(store, await loadCapRoots(store), selection);
    assert.equal(reporterCoverage.records, 2);
    assert.equal(reporterCoverage.metadataComplete, true);
    assert.throws(() => capSelectionCoverage(store, roots, { reporter: 'p2d', volumes: ['missing'] }), /Unknown CAP reporter volume/);
    assert.equal(capSelectionKey({ reporter: 'p2d', volumes: ['2', '1'] }), capSelectionKey({ reporter: 'p2d', volumes: ['1', '2'] }));
    assert.equal((await ingestCapCorpus(store, selection, { download })).ingestionComplete, true);
    assert.equal((await auditCapCorpus(store, selection)).verified, true);
    const reporterPlan = await planCapCollection(store, reporterConfig, { embedderFactory: fakeEmbedder });
    assert.deepEqual(reporterPlan.parts.flatMap(p => p.cases.map(c => c.id)).sort(), [2, 3]);
    const frozenReporterPlan = await readJson(resolve(store.directory, 'cap-reporter-plan.json'));
    const reporterBuild = await buildCapCollection(store, reporterConfig, frozenReporterPlan, { version: '2026.10.1', embedderFactory: fakeEmbedder });
    assert.equal(reporterBuild.complete, true);
    assert.deepEqual(reporterBuild.selection, selection);
    assert.equal(reporterBuild.parts[0].counts.documents, 2);
    await assert.rejects(buildCapCollection(store, config, { ...plan, corpusDigest: 'changed' }, { version: '2026.10.2', embedderFactory: fakeEmbedder }), /plan or configuration/);
    indexCapVolume(store, 'p2d', '1', metadata([record(1)]), 'a'.repeat(64));
    const duplicate = capCoverage(store, await loadCapRoots(store), 'wyo');
    assert.equal(duplicate.metadataComplete, false);
    assert.equal(duplicate.duplicates.length, 1);
    store.db.prepare("UPDATE volumes SET status='pending' WHERE reporter='p2d'").run();
    assert.equal(capSelectionCoverage(store, await loadCapRoots(store), selection).metadataComplete, false);
    await assert.rejects(compareCapSnapshots(store, store, 'wyo'), /incomplete/);
  } finally { CASELAW_TERMS.sha256 = previous; store.close(); await removeWork(process.cwd(), root); }
});

test('CAP snapshot differences distinguish removals, additions, metadata and body changes', () => {
  const r = id => ({ id, metadata: 'm', html: 'h', json: 'j', markdown: 'd' });
  assert.deepEqual(compareCapRecords([r(1), r(2), r(3), r(4)], [r(1), { ...r(2), metadata: 'new' }, { ...r(3), html: 'new', json: 'new', markdown: 'new' }, r(5)]), {
    added: [5], removed: [4], changed: [{ id: 2, fields: ['metadata'] }, { id: 3, fields: ['html', 'json', 'markdown'] }], unchanged: 1,
  });
  assert.throws(() => compareCapRecords([r(1), r(1)], []), /duplicate/);
});

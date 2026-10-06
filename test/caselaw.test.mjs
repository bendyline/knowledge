import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { ZipFile } from 'yazl';
import { fixture, fakeEmbedder } from './helpers.mjs';
import { CatalogSchema } from '../src/schema.mjs';
import { caselawSnapshot, readCaselawZip } from '../src/sources/caselaw.mjs';
import { normalizeCaselaw, capAnchor, casePath } from '../src/sources/caselaw-normalize.mjs';
import { caselawLegal, attributionRequired, recognizeLicense } from '../src/licensing.mjs';
import { CASELAW_TERMS } from '../src/caselaw-policy.mjs';
import { applySnapshot, prepareCatalog } from '../src/sync.mjs';
import { catalogs, validateCatalog } from '../src/catalogs.mjs';
import { buildCatalog } from '../src/build.mjs';
import { verifyRelease } from '../src/verify.mjs';
import { loadMarkdownCatalog } from '../src/toolchain.mjs';
import { sha256, digest, json, removeWork, write, writeJson, inventory } from '../src/files.mjs';
import references from '../policy/license-references.json' with { type: 'json' };
import { createCapNormalizer } from '../src/caselaw-workers.mjs';
import { auditCapText } from '../src/caselaw-audit.mjs';

const record = (id = 1, jurisdiction = 39) => ({ id, name: `Example v. State ${id}`, name_abbreviation: `Example v. State ${id}`, file_name: `000${id}-01`, decision_date: '1954-05', jurisdiction: { id: jurisdiction, name: jurisdiction === 39 ? 'U.S.' : 'Pa.', name_long: jurisdiction === 39 ? 'United States' : 'Pennsylvania' }, court: { id: 9009, name: 'Example Court' }, citations: [{ type: 'official', cite: `347 U.S. ${id}` }], first_page: String(id), last_page: '20', casebody: { opinions: [{ type: 'majority', author: 'Judge Example', text: 'A judgment with a footnote.' }, { type: 'dissent', author: 'Judge Other', text: 'A separate dissent.' }] } });
const html = '<section class="casebody"><section class="head-matter"><p>Case caption</p></section><article class="opinion" data-type="majority"><p>The majority at <a class="page-label" id="p2" href="#p2">*2</a> decides the issue.<a class="footnotemark" id="ref_footnote_1_1" href="#footnote_1_1">1</a> See <a href="/us/347/0002-01">347 U.S. 2</a>.</p><aside class="footnote" id="footnote_1_1"><a href="#ref_footnote_1_1">1</a><p>Footnote body.</p></aside></article><article class="opinion" data-type="dissent"><p>I dissent.</p></article></section>';
async function zip(entries) {
  const archive = new ZipFile();
  for (const [name, bytes, options] of entries) archive.addBuffer(Buffer.from(bytes), name, options);
  archive.end();
  const chunks = []; for await (const chunk of archive.outputStream) chunks.push(chunk);
  return Buffer.concat(chunks);
}
async function sourceZip(records = [record(), record(2, 6)], mutate = entries => entries) {
  const metadata = records.map(({ casebody, ...meta }) => meta);
  return zip(mutate([
    ['metadata/VolumeMetadata.json', json({ volume_number: '347' })],
    ['metadata/CasesMetadata.json', json(metadata)],
    ...records.flatMap(r => [[`json/${r.file_name}.json`, json(r)], [`html/${r.file_name}.html`, html]]),
  ]));
}
async function capFixture(bytes, cases = 2) {
  const c = await fixture();
  await removeWork(process.cwd(), resolve(c.dir, 'content'));
  await mkdir(resolve(c.dir, 'content'));
  c.manifest = CatalogSchema.parse({ ...c.manifest,
    source: { type: 'caselaw', volumes: [{ reporter: 'us', volume: '347', sha256: sha256(bytes), cases }] },
    licensing: { status: 'automatic', policy: 'standard-open-v1', notice: 'NOTICE.md', licenses: [{ id: 'cc0', name: 'CC0', spdx: 'CC0-1.0', url: 'https://creativecommons.org/publicdomain/zero/1.0/', text: 'LICENSES/CC0.txt', attribution: 'CAP, voluntary credit' }], rules: [{ include: ['**'], license: 'cc0' }] },
  });
  return c;
}

test('CAP conversion keeps case identity, partial dates, opinion context, footnotes and page targets', async () => {
  const r = record();
  const result = await normalizeCaselaw(r, Buffer.from(html), { reporter: 'us', volume: '347', mapping: new Map([['/us/347/0002-01', casePath(record(2, 6))]]) });
  assert.match(result.markdown, /id: cap-1/);
  assert.match(result.markdown, /decisionDate: 1954-05/);
  assert.match(result.markdown, /## Majority opinion 1 — Judge Example/);
  assert.match(result.markdown, /## Dissent opinion 2 — Judge Other/);
  for (const id of ['p2', 'footnote_1_1', 'ref_footnote_1_1']) {
    assert.ok(result.markdown.includes(`<a id="${capAnchor(id)}"></a>`));
    assert.ok(result.markdown.includes(`(#${capAnchor(id)})`));
  }
  assert.match(result.markdown, /Footnote body/);
  assert.match(result.markdown, /\.\.\/\.\.\/\.\.\/jurisdiction-6\/court-9009\/1954\/cap-2.md/);
  assert.ok(!result.markdown.includes('capanchor'));
  const dangling = html.replace('id="ref_footnote_1_1"', '');
  const repaired = await normalizeCaselaw(r, Buffer.from(dangling), { reporter: 'us', volume: '347' });
  assert.match(repaired.transformation, /1 dangling upstream footnote return/);
  assert.match(repaired.markdown, /Footnote body/);
  await assert.rejects(normalizeCaselaw(r, Buffer.from(html.replace('id="footnote_1_1"', '')), { reporter: 'us', volume: '347' }), /unresolved source anchor/);
  await assert.rejects(normalizeCaselaw(r, Buffer.from(html.replace('data-type="dissent"', 'data-type="majority"')), { reporter: 'us', volume: '347' }), /opinion type differs/);
});

test('CAP archives reject traversal, collisions, symlinks and expansion beyond the budget', async () => {
  const limits = { maxFileBytes: 100000, maxExpandedBytes: 200000 };
  const bytes = await sourceZip();
  assert.equal((await readCaselawZip(bytes, limits)).files.size, 6);
  await assert.rejects(readCaselawZip(bytes, { ...limits, maxExpandedBytes: 10 }), /byte budget/);
  await assert.rejects(readCaselawZip(await zip([['json/one.json', 'a'], ['json/ONE.json', 'b']]), limits), /collision/);
  await assert.rejects(readCaselawZip(await zip([['json/one.json', 'a', { mode: 0o120777 }]]), limits), /symlink/);
  const unsafe = Buffer.from(bytes);
  const before = Buffer.from('json/0001-01.json'); const after = Buffer.from('../x/0001-01.json');
  for (let offset = unsafe.indexOf(before); offset !== -1; offset = unsafe.indexOf(before, offset + after.length)) after.copy(unsafe, offset);
  await assert.rejects(readCaselawZip(unsafe, limits), /invalid relative path|Unsafe|\.\./);
});

test('CAP literal OCR template punctuation survives conversion without serializer backtracking', async () => {
  const pool = createCapNormalizer({ workers: 1, timeoutMs: 10000 });
  try {
    const source = html.replace('Case caption', `department{[']s officials ${'"quoted testimony" '.repeat(100)}`);
    const result = await pool.run(record(), Buffer.from(source), { reporter: 'us', volume: '347' });
    assert.match(result.markdown, /&#123;/);
    assert.deepEqual(auditCapText(result.markdown, source), { textMatches: true, fragmentLinks: 3, missing: [] });
    assert.ok(!result.markdown.includes('capanchor'));
  } finally { await pool.close(); }
});

test('CAP worker watchdog replaces a stalled worker and continues queued cases', async () => {
  const url = new URL('data:text/javascript,' + encodeURIComponent(`
    import {parentPort} from 'node:worker_threads';
    parentPort.on('message', ({record}) => {
      if (record.id === 1) { while (true) {} }
      parentPort.postMessage({result: record.id});
    });
  `));
  const pool = createCapNormalizer({ workers: 1, timeoutMs: 500, url });
  try {
    const stalled = pool.run({ id: 1 }, Buffer.alloc(0), {});
    const next = pool.run({ id: 2 }, Buffer.alloc(0), {});
    await assert.rejects(stalled, /normalization exceeded/);
    assert.equal(await next, 2);
  } finally { await pool.close(); }
  await assert.rejects(pool.run({ id: 3 }, Buffer.alloc(0), {}), /closed/);
});

test('CAP preserves literal money, OCR backslashes, directive-like words, and links in preformatted captions', async () => {
  const text = 'The award is $_ and $334.72. This power to :purchase includes [:Trammel]. A\\ \nnew paragraph. $$**$$$';
  const source = html.replace('Case caption', text + ' In <em>Miranda, </em>:cferring to the award of <em> </em>$100.').replace('<p>Footnote body.</p>', '<pre><a href="#p2">*2</a> Footnote body with <em>emphasis</em>.</pre>');
  const result = await normalizeCaselaw(record(), Buffer.from(source), { reporter: 'us', volume: '347' });
  const checked = auditCapText(result.markdown, source);
  assert.equal(checked.textMatches, true); assert.deepEqual(checked.missing, []);
  assert.equal(checked.fragmentLinks, 4);
  assert.match(result.transformation, /preformatted blocks with active links/);
  const inert = '# Title\n\n[page](#cap-inert)\n\n```\n<a id="cap-inert"></a>\n```\n';
  assert.deepEqual(auditCapText(inert, '').missing, ['#cap-inert']);
});

test('CAP retains emphasis beginning with a colon after an unspaced case name', async () => {
  const source = html.replace('Case caption', '<em>The Written Statement Requirement of</em> Wolff v. McDonnell<em>: An Argument for Factual Specificity</em>');
  const result = await normalizeCaselaw(record(), Buffer.from(source), { reporter: 'us', volume: '347' });
  assert.equal(auditCapText(result.markdown, source).textMatches, true);
});

test('CAP evidence pins the complete terms and does not invent CC0 attribution conditions', () => {
  const manifest = { licensing: { licenses: [{ id: 'cc0', spdx: 'CC0-1.0', text: 'LICENSES/CC0.txt' }] } };
  assert.equal(attributionRequired(manifest), false);
  assert.deepEqual(recognizeLicense(references.licenses.find(r => r.id === 'CC0-1.0').text, 'CC0-1.0').obligations, []);
  assert.equal(caselawLegal(manifest, CASELAW_TERMS.sha256).length, 3);
  assert.throws(() => caselawLegal(manifest, '0'.repeat(64)), /terms changed/);
});

test('workspace CAP catalogs validate on a fresh checkout, prepare outside Git, reuse offline, and preserve local edits', async () => {
  const previous = CASELAW_TERMS.sha256;
  CASELAW_TERMS.sha256 = sha256('fixture terms');
  const bytes = await sourceZip(); const definition = await capFixture(bytes);
  try {
    definition.manifest.contentStorage = 'workspace';
    await writeJson(resolve(definition.dir, 'manifest.json'), definition.manifest);
    await write(resolve(definition.dir, 'LICENSES/CC0.txt'), references.licenses.find(r => r.id === 'CC0-1.0').text);
    const [catalog] = await catalogs(definition.root, definition.key);
    assert.equal(catalog.definitionDir, definition.dir);
    assert.ok(catalog.dir.includes(`${resolve(definition.root, '.work')}`));
    assert.match((await validateCatalog(catalog, { definitionOnly: true })).status, /definition valid/);
    await write(resolve(definition.dir, 'content/accidental.md'), 'Generated source in the wrong directory.\n');
    await assert.rejects(validateCatalog(catalog, { definitionOnly: true }), /must not contain generated source content/);
    await removeWork(process.cwd(), resolve(definition.dir, 'content/accidental.md'));
    await assert.rejects(validateCatalog(catalog), /not prepared/);
    await write(resolve(definition.dir, 'tests/obsolete.json'), '[]\n');
    const download = async url => ({ bytes: url === CASELAW_TERMS.sourceUrl ? Buffer.from('fixture terms') : bytes });
    const prepared = await prepareCatalog(catalog, { download });
    assert.equal(prepared.documents, 2); assert.equal(prepared.reused, false);
    await removeWork(process.cwd(), resolve(definition.dir, 'tests/obsolete.json'));
    const reused = await prepareCatalog(catalog, { download: async () => { throw new Error('Unexpected network request'); } });
    assert.equal(reused.reused, true);
    assert.ok(!(await inventory(catalog.dir)).some(f => f.path === 'tests/obsolete.json'));
    assert.ok(!(await inventory(definition.dir)).some(f => f.path.startsWith('content/') || f.path === 'sources.lock.json' || f.path === 'provenance.jsonl'));
    await write(resolve(catalog.dir, 'content', casePath(record())), 'An accidental local edit.\n');
    await assert.rejects(prepareCatalog(catalog, { download }), /local edits/);
  } finally { CASELAW_TERMS.sha256 = previous; await removeWork(process.cwd(), definition.root); }
});

// Test downloads inject the exact terms digest independently of network access.
// Use the checked-in rights policy and real evidence test above, then exercise
// the transport/selection with a test-only digest substitution in the policy.
test('CAP sync, filtering and real compilation preserve complete source membership', async () => {
  const originalHash = CASELAW_TERMS.sha256;
  CASELAW_TERMS.sha256 = sha256('fixture terms');
  try {
    const bytes = await sourceZip(); const c = await capFixture(bytes);
    const download = async url => ({ bytes: url === CASELAW_TERMS.sourceUrl ? Buffer.from('fixture terms') : bytes });
    const snapshot = await caselawSnapshot(c, { download });
    assert.equal(snapshot.files.filter(f => f.path.endsWith('.md')).length, 2);
    assert.ok(snapshot.files.some(f => f.path.startsWith('jurisdiction-6/')));
    const result = await applySnapshot(c, snapshot, { apply: true });
    assert.equal(result.applied, true);
    assert.equal((await applySnapshot(c, snapshot, { apply: true })).changed, false);
    const loaded = await loadMarkdownCatalog(resolve(c.dir, 'content'), { language: 'en' });
    assert.ok(loaded.topics.some(t => t.name === 'Pennsylvania'));
    assert.equal(loaded.documents.find(d => d.id === 'cap-1').meta.cap.decisionDate, '1954-05');
    // Replace handbook retrieval checks, which refer to its original articles.
    const { writeFile } = await import('node:fs/promises');
    await writeFile(resolve(c.dir, 'tests/queries.json'), json([{ query: '347 U.S. 1', expectedDocumentIds: ['cap-1'] }]));
    await assert.rejects(buildCatalog(c, { version: '2026.10.1', embedderFactory: fakeEmbedder }), /require semantic retrieval checks/);
    c.manifest.publish.enabled = false;
    const built = await buildCatalog(c, { version: '2026.10.1', embedderFactory: fakeEmbedder });
    assert.equal(built.manifest.counts.documents, 2);
    assert.equal(built.manifest.license.attributionRequired, false);
    assert.equal((await verifyRelease(c, built.directory)).integrity, true);
    c.manifest.source.jurisdictions = [6];
    const filtered = await caselawSnapshot(c, { download });
    assert.deepEqual(filtered.files.filter(f => f.path.endsWith('.md')).map(f => f.provenance.caselaw.caseId), [2]);
    c.manifest.source.volumes[0].cases = 3;
    await assert.rejects(caselawSnapshot(c, { download }), /case count/);
    c.manifest.source.volumes[0].cases = 2;
    await assert.rejects(caselawSnapshot(c, { download: async url => ({ bytes: url === CASELAW_TERMS.sourceUrl ? Buffer.from('changed terms') : bytes }) }), /terms changed/);
    const missing = await sourceZip(undefined, entries => entries.filter(([name]) => name !== 'html/0001-01.html'));
    const incomplete = await capFixture(missing);
    await assert.rejects(caselawSnapshot(incomplete, { download: async url => ({ bytes: url === CASELAW_TERMS.sourceUrl ? Buffer.from('fixture terms') : missing }) }), /Missing CAP ZIP entry/);
    await assert.rejects(caselawSnapshot(c, { download: async url => ({ bytes: url === CASELAW_TERMS.sourceUrl ? Buffer.from('fixture terms') : Buffer.from('corrupt') }) }), /checksum mismatch/);
  } finally { CASELAW_TERMS.sha256 = originalHash; }
});

test('CAP combines volume ZIPs with stable membership, cross-volume links and shared budgets', async () => {
  const originalHash = CASELAW_TERMS.sha256;
  CASELAW_TERMS.sha256 = sha256('fixture terms');
  try {
    const first = record();
    // The same filename in different source books must remain distinct cases.
    const second = { ...record(2, 6), file_name: first.file_name, citations: [{ type: 'official', cite: '348 U.S. 1' }] };
    const firstZip = await sourceZip([first], entries => entries.map(([path, bytes]) => [path,
      path.endsWith('.html') ? html.replace('/us/347/0002-01', '/us/348/0001-01') : bytes]));
    const secondZip = await sourceZip([second], entries => entries.map(([path, bytes]) => [path,
      path === 'metadata/VolumeMetadata.json' ? json({ volume_number: '348' }) :
        path.endsWith('.html') ? html.replace('/us/347/0002-01', '/us/347/0001-01') : bytes]));
    const c = await capFixture(firstZip, 1);
    c.manifest.source.volumes.push({ reporter: 'us', volume: '348', sha256: sha256(secondZip), cases: 1 });
    const download = async url => ({ bytes: url === CASELAW_TERMS.sourceUrl ? Buffer.from('fixture terms') : url.endsWith('/348.zip') ? secondZip : firstZip });
    const snapshot = await caselawSnapshot(c, { download });
    const documents = snapshot.files.filter(f => f.path.endsWith('.md'));
    assert.deepEqual(documents.map(f => f.provenance.caselaw.caseId), [1, 2]);
    assert.match(documents[0].bytes.toString(), /\.\.\/\.\.\/\.\.\/jurisdiction-6\/court-9009\/1954\/cap-2.md/);
    assert.match(documents[1].bytes.toString(), /\.\.\/\.\.\/\.\.\/jurisdiction-39\/court-9009\/1954\/cap-1.md/);
    assert.deepEqual(documents.map(f => f.provenance.caselaw.archiveSha256), [sha256(firstZip), sha256(secondZip)]);
    const selection = JSON.parse(snapshot.legal.find(f => f.path === 'LICENSES/caselaw-selection.json').bytes);
    assert.equal(selection.selectedCases, 2);
    assert.deepEqual(selection.archives.map(a => a.selected), [1, 1]);
    c.manifest.source.volumes.reverse();
    assert.equal(digest(await caselawSnapshot(c, { download })), digest(snapshot));

    await applySnapshot(c, snapshot, { apply: true });
    const loaded = await loadMarkdownCatalog(resolve(c.dir, 'content'), { language: c.manifest.language, uri: { publisherId: c.manifest.publisher.id, catalogId: c.manifest.id } });
    assert.ok(loaded.documents.find(d => d.id === 'cap-1').markdown.includes('knowledge://'));
    assert.ok(!loaded.documents.find(d => d.id === 'cap-1').markdown.includes('cap-2.md'));

    // Each ZIP fits alone, but the combined expanded bytes exceed the budget.
    c.manifest.source.maxExpandedBytes = Math.max(...selection.archives.map(a => a.expandedBytes));
    await assert.rejects(caselawSnapshot(c, { download }), /expanded byte budget/);
    c.manifest.source.maxExpandedBytes = 100000000;
    const accepted = await readFile(resolve(c.dir, 'sources.lock.json'), 'utf8');
    const { syncCatalog } = await import('../src/sync.mjs');
    await assert.rejects(syncCatalog(c, { apply: true, download: async url => ({ bytes: url.endsWith('/348.zip') ? Buffer.from('corrupt') : (await download(url)).bytes }) }), /checksum mismatch/);
    assert.equal(await readFile(resolve(c.dir, 'sources.lock.json'), 'utf8'), accepted);

    const duplicate = await sourceZip([first], entries => entries.map(([path, bytes]) => [path, path === 'metadata/VolumeMetadata.json' ? json({ volume_number: '348' }) : bytes]));
    c.manifest.source.volumes.find(v => v.volume === '348').sha256 = sha256(duplicate);
    await assert.rejects(caselawSnapshot(c, { download: async url => ({ bytes: url.endsWith('/348.zip') ? duplicate : (await download(url)).bytes }) }), /Duplicate CAP case ID/);
  } finally { CASELAW_TERMS.sha256 = originalHash; }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { gzipSync } from 'node:zlib';
import { fixture, fakeEmbedder } from './helpers.mjs';
import { CatalogSchema } from '../src/schema.mjs';
import { catalogs, validateCatalog } from '../src/catalogs.mjs';
import { prepareCatalog } from '../src/sync.mjs';
import { buildCatalog } from '../src/build.mjs';
import { attributionRequired, gutenbergLegal } from '../src/licensing.mjs';
import { decodeAttribute, displayName, normalizeBook, parseCatalogCsv, selectBooks, shortTitle } from '../src/sources/gutenberg-normalize.mjs';
import { json, removeWork, write, writeJson } from '../src/files.mjs';
import references from '../policy/license-references.json' with { type: 'json' };

const page = ({ rights = 'Public domain in the USA.', title = 'Camp Craft', body }) => `<!DOCTYPE html><html><head><meta charset="utf-8"><title>The Project Gutenberg eBook of ${title}</title>
<meta name="dc.title" content="${title}"><meta name="dc.rights" content="${rights}"><meta name="dc.creator" content="Sears, George Washington, 1821-1890"><meta name="dcterms.modified" content="2026-09-10T14:09:18+00:00"></head>
<body><header class="pg-boilerplate pgheader" id="pg-header"><h2 id="pg-header-heading">The Project Gutenberg eBook of ${title}</h2><div>This eBook is for the use of anyone anywhere at no cost; see www.gutenberg.org.</div><div id="pg-start-separator"><span>*** START OF THE PROJECT GUTENBERG EBOOK ***</span></div></header>
${body}
<footer class="pg-boilerplate pgheader" id="pg-footer"><div id="pg-end-separator"><span>*** END OF THE PROJECT GUTENBERG EBOOK ***</span></div><h2>THE FULL PROJECT GUTENBERG LICENSE</h2><p>Project Gutenberg™ is a registered trademark.</p></footer></body></html>`;
const para = (text, n = 12) => `<p>${Array.from({ length: n }, () => text).join(' ')}</p>`;
const chapters = `<h1>CAMP CRAFT</h1><p>by Nessmuk</p>
<p class="transnote">Transcribed for Project Gutenberg from the 1884 edition.</p>
<div class="toc"><p><a href="#ch1">Fires</a> <a href="#ch2">Cooking</a> <a href="#ch3">Shelter</a></p></div>
<div class="chapter" id="ch1"><h2>CHAPTER I. FIRES</h2>${para('Build the fire against a backlog of green hardwood.')}<p>See <a href="#ch2">cooking</a>, <a href="https://www.gutenberg.org/ebooks/1">another book</a>, or <a href="https://example.org/axe">an axe</a>.<span class="pagenum"><a id="Page_12">[12]</a></span></p></div>
<div class="chapter" id="ch2"><h2>CHAPTER II. COOKING</h2>${para('Fry the trout in a hot pan with salt pork.')}<p><a href="images/fig1.jpg"><img src="images/fig1.jpg" alt="A frying pan"></a></p></div>
<div class="chapter" id="ch3"><h2>CHAPTER III. SHELTER</h2>${para('Pitch the shanty tent facing the fire.')}</div>`;
const csv = (rows) => ['Text#,Type,Issued,Title,Language,Authors,Subjects,LoCC,Bookshelves', ...rows.map((r) => r.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(','))].join('\n') + '\n';
const shelf = 'Category: How To ...';

test('Gutenberg books lose all PG license and trademark text and split into linked chapter documents', async () => {
  const book = await normalizeBook(page({ body: chapters }), { ebook: 101, title: 'Camp Craft' });
  assert.equal(book.documents.length, 3);
  assert.deepEqual(book.documents.map((d) => d.path), ['001.md', '002.md', '003.md']);
  for (const d of book.documents) assert.doesNotMatch(d.markdown, /project gutenberg|gutenberg\.org/i);
  const [first, second, third] = book.documents.map((d) => d.markdown);
  assert.match(first, /^---\ntitle: Camp Craft\n/);
  assert.match(first, /ebook: 101\n/);
  assert.match(first, /Sears, George Washington, 1821-1890/);
  assert.match(first, /Build the fire/);
  assert.match(first, /\]\(002\.md\)/);
  assert.match(first, /\]\(003\.md\)/);
  assert.match(first, /\(https:\/\/example\.org\/axe\)/);
  assert.doesNotMatch(first, /\[12\]|another book\]/);
  assert.match(second, /title: "Camp Craft: CHAPTER II. COOKING"/);
  assert.match(second, /Fry the trout/);
  assert.doesNotMatch(second, /images\/fig1/);
  assert.match(third, /Pitch the shanty/);
  assert.match(book.transformation, /1 producer note block\(s\) naming Project Gutenberg removed; 1 page-number marker/);
  assert.match(book.transformation, /split into 3 section\(s\) at heading level 2/);
});

test('Gutenberg rights, boilerplate and long-text rules are enforced per book', async () => {
  const excluded = await normalizeBook(page({ body: chapters, rights: 'Copyrighted. Read the copyright notice inside this book for details.' }), { ebook: 5889 });
  assert.match(excluded.excluded, /^rights: Copyrighted/);
  await assert.rejects(normalizeBook(page({ body: chapters }).replace('id="pg-footer"', ''), { ebook: 1 }), /header\/footer boundaries/);
  await assert.rejects(normalizeBook(page({ body: `<h2>One</h2>${para('Project Gutenberg reference inside a long paragraph of real text.', 40)}` }), { ebook: 1 }), /long source block/);
  const long = await normalizeBook(page({ body: Array.from({ length: 30 }, (_, i) => para(`Plain paragraph ${i} without headings about mixing mortar.`, 30)).join('') }), { ebook: 2 });
  assert.ok(long.documents.length > 1);
  assert.match(long.documents[1].title, /^Camp Craft: Part 2: Plain paragraph \d+ without headings about mixing mortar\.…$/);
  assert.match(long.transformation, /by length/);
});

test('Gutenberg handles nested boilerplate, wrapped credits, books about PG and oversized headingless sections', async () => {
  const nested = page({ body: '' }).replace(/<body>[\s\S]*<\/body>/, `<body><div class="document"><header id="pg-header"><p>PG header</p></header>
<p>Produced by A. Volunteer and Project</p><p>Gutenberg Distributed Proofreaders</p>${chapters}<div class="language-en"><p>Last words of the book about green hardwood fires and pans.</p><footer id="pg-footer"><p>Project Gutenberg license</p></footer></div></div></body>`);
  const book = await normalizeBook(nested, { ebook: 7 });
  assert.equal(book.documents.length, 3);
  assert.match(book.documents.at(-1).markdown, /Last words of the book/);
  for (const d of book.documents) assert.doesNotMatch(d.markdown, /project[\s\\]*gutenberg|Distributed Proofreaders|PG header/i);
  assert.equal((await normalizeBook(page({ body: chapters, title: 'The Project Gutenberg RST Manual' }), { ebook: 181 })).excluded, 'title or creator names Project Gutenberg');
  const encyclopedia = await normalizeBook(page({ body: `<h2>One</h2>${para('x', 5)}<h2>Two</h2>${para('y', 5)}<h2>A CYCLOPÆDIA<br>OF RECEIPTS</h2>${Array.from({ length: 60 }, (_, i) => para(`Entry ${i} describes a practical receipt for varnish.`, 30)).join('')}` }), { ebook: 8 });
  assert.equal(encyclopedia.documents.length, 3);
  assert.match(encyclopedia.documents.at(-1).title, /^Camp Craft: A CYCLOPÆDIA OF RECEIPTS \(continued: Entry \d+ describes a practical receipt for varnish\.…\)$/);
});

test('Gutenberg names numbered chapters by subject and removes layout and image noise', async () => {
  const body = `<pre></pre><table><tr><td><br></td><td>
<h1>HANDY BOOK</h1>${para('A preface about tools and gardens for every reader.', 6)}<p><a href="#ch2">Second chapter</a></p>
<div class="chapter"><h2>CHAPTER I<span class="totoc"><a href="#toc">ToC</a></span></h2><h4>HOW TO SHARPEN TOOLS</h4>${para('Hone the edge on an oilstone.')}
<div class="figure"><img src="i/f1.png" alt="Fig. 1"><p class="caption">Fig. 1. The oilstone.</p></div><p><img src="x.png" alt="[Illustration]">Text after a decorative image.</p></div>
<p><a id="ch2"></a></p><hr>
<div class="chapter"><h2>CHAPTER TWO</h2><p>Composting Basics</p>${para('Pile leaves and manure in layers.')}</div>
<div class="chapter"><h2>III.</h2>${para('Turn the heap every two weeks so it heats evenly.')}</div></td><td></td></tr></table>`;
  const html = page({ body, title: 'Handy Book' }).replace(/<meta name="dc.creator"[^>]*>/, '');
  const book = await normalizeBook(html, { ebook: 9, authors: ['Routledge, Edmund, 1843-1899 [Editor]'] });
  assert.deepEqual(book.documents.map((d) => d.title), ['Handy Book', 'Handy Book: CHAPTER I: HOW TO SHARPEN TOOLS', 'Handy Book: CHAPTER TWO: Composting Basics', 'Handy Book: III: Turn the heap every two weeks so it…']);
  assert.match(book.documents[0].markdown, /\[Second chapter\]\(003\.md\)/);
  assert.match(book.documents[0].markdown, /Routledge, Edmund, 1843-1899 \[Editor\]/);
  const chapter = book.documents[1].markdown;
  assert.equal(chapter.match(/Fig\. 1/g).length, 1);
  assert.doesNotMatch(chapter, /ToC|Illustration|&#x20;/);
  for (const d of book.documents) assert.doesNotMatch(d.markdown, /^---[\s\S]*?---\n\n```/);
});

test('Gutenberg names headingless parts by styled subject paragraphs', async () => {
  const body = ['THE COOK.', 'THE GROOM.'].map((name, k) => `<p class="center bold">${name}</p>${Array.from({ length: 45 }, (_, i) => para(`Duty ${k}-${i} of this servant is described here at length.`, 25)).join('')}`).join('');
  const titles = (await normalizeBook(page({ body, title: 'Servant' }), { ebook: 10 })).documents.map((d) => d.title);
  assert.equal(titles[0], 'Servant: THE COOK.');
  assert.ok(titles.some((t) => /^Servant: THE COOK\. \(continued: Duty 0-\d+ /.test(t)));
  assert.ok(titles.some((t) => /^Servant: THE GROOM\./.test(t)));
  assert.ok(titles.every((t) => !/Part \d/.test(t)));
});

test('Gutenberg omits images in headings and figure wrappers and keeps each caption once', async () => {
  const body = `<h2>CHAPTER I</h2><h3>CHURNING.</h3>${para('Churn the cream until the butter comes in small grains.')}
<div class="figcenter" role="figure"><img alt="" src="images/ill-032.jpg"><div class="caption"><p>RECTANGULAR CHURN.</p></div></div>
<div class="figcenter"><img alt="FIG. 2—TOMATO FLOWERS." src="images/i0011.png"></div><p class="caption">FIG. 2—TOMATO FLOWERS.</p>
<p class="center smgray"><img alt="magnify" src="images/magnify.png">Click on image to view larger version</p>
<img alt="FIG. 3—LOOSE PLATE." src="images/x.png"><p class="caption">FIG. 3—LOOSE PLATE.</p>
<hr><h2><img alt="banner" src="images/078banner.gif">CHAPTER II: DOGS</h2>${para('Feed a working dog twice a day.')}
<h2>CHAPTER III: HORSES</h2>${para('Groom the horse before and after work.')}`;
  const book = await normalizeBook(page({ body }), { ebook: 11 });
  const all = book.documents.map((d) => d.markdown).join('\n');
  assert.doesNotMatch(all, /!\[|images\/|Click on image|banner|magnify/);
  assert.equal(all.match(/FIG\. 2—TOMATO FLOWERS\./g).length, 1);
  assert.equal(all.match(/FIG\. 3—LOOSE PLATE\./g).length, 1);
  assert.match(all, /RECTANGULAR CHURN\./);
  for (const d of book.documents) assert.doesNotMatch(d.markdown, /^---[\s\S]*?\n---\n\n(?:---|\* \* \*)/);
  assert.equal(book.documents[1].title, 'Camp Craft: CHAPTER II: DOGS');
});

test('Gutenberg can omit back-of-book indexes without renumbering other sections', async () => {
  const body = `${chapters.replace('<a href="#ch3">Shelter</a>', '<a href="#ch3">Shelter</a> <a href="#index">Index</a>')}
<div class="chapter" id="index"><h2>INDEX</h2>${para('Axe, 12; Backlog, 14; Bread, 31; Camp, 7.')}</div>
<div class="chapter" id="ch4"><h2>CHAPTER IV. CANOES</h2>${para('Paddle on alternate sides to keep the canoe straight.')}</div>`;
  const full = await normalizeBook(page({ body }), { ebook: 12 });
  assert.deepEqual(full.documents.map((d) => d.path), ['001.md', '002.md', '003.md', '004.md', '005.md']);
  const book = await normalizeBook(page({ body }), { ebook: 12, omitIndexes: true });
  assert.deepEqual(book.documents.map((d) => d.path), ['001.md', '002.md', '003.md', '005.md']);
  assert.match(book.documents[3].title, /CHAPTER IV\. CANOES/);
  assert.match(book.documents[0].markdown, / Index/);
  assert.doesNotMatch(book.documents[0].markdown, /\(004\.md\)/);
  assert.match(book.transformation, /1 back-of-book index section\(s\) omitted/);
});

test('Gutenberg catalog selection reads the CSV feed strictly and filters by bookshelf, language, type and exclusions', () => {
  const rows = parseCatalogCsv(csv([
    [3, 'Text', '2001-01-01', 'Woodcraft\nWith a "subtitle"', 'en', 'Sears, George Washington, 1821-1890', 'Camping', 'SK', `Camping; ${shelf}`],
    [1, 'Text', '2001-01-01', 'Gardening', 'en; la', 'Roe, E. P.', 'Gardens', 'SB', shelf],
    [2, 'Sound', '2001-01-01', 'Audio', 'en', '', '', '', shelf],
    [4, 'Text', '2001-01-01', 'Cuisine', 'fr', '', '', '', shelf],
    [5, 'Text', '2001-01-01', 'Novel', 'en', '', '', '', 'Category: Novels'],
    [6, 'Text', '2001-01-01', 'Excluded', 'en', '', '', '', shelf],
  ]));
  assert.equal(rows[0].Title, 'Woodcraft\nWith a "subtitle"');
  const books = selectBooks(rows, { bookshelf: shelf, language: 'en', exclude: [{ ebook: 6, reason: 'test' }] });
  assert.deepEqual(books.map((b) => b.ebook), [1, 3]);
  assert.equal(books[1].title, 'Woodcraft With a "subtitle"');
  assert.throws(() => parseCatalogCsv('Text#,Title\n1,x\n'), /columns changed/);
  assert.throws(() => parseCatalogCsv(csv([[1, 'Text']]).replace(/"Text"\n$/, '"Text\n')), /quoted field/);
  assert.equal(decodeAttribute('How to Fold Napkins&#10;Abundantly &amp; &#x27;Handsomely&#39; Illustrated &bogus;'), 'How to Fold Napkins\nAbundantly & \'Handsomely\' Illustrated &bogus;');
  assert.equal(shortTitle('The Boy Mechanic, Volume 1:\n700 Things for Boys to Do'), 'The Boy Mechanic, Volume 1');
  assert.equal(displayName('Sears, George Washington, 1821-1890'), 'George Washington Sears');
  assert.equal(displayName('Kains, M. G. (Maurice Grenville), 1868-1946'), 'M. G. Kains');
  assert.equal(displayName('Windsor, H. H. (Henry Haven), 1859-1924 [Editor]'), 'H. H. Windsor');
  assert.equal(displayName('Woman\'s Institute of Domestic Arts and Sciences'), 'Woman\'s Institute of Domestic Arts and Sciences');
});

test('Gutenberg policy rejects the website as a mirror and non-public-domain evidence', () => {
  const base = JSON.parse(JSON.stringify(manifest()));
  assert.throws(() => CatalogSchema.parse({ ...base, source: { ...base.source, mirror: 'https://www.gutenberg.org/cache/epub' } }), /mirror/);
  assert.throws(() => CatalogSchema.parse({ ...base, licensing: { ...base.licensing, status: 'approved', reviewedBy: 'x', reviewedAt: '2026-10-06T00:00:00Z' } }), /automatic public-domain evidence/);
  const m = CatalogSchema.parse(base);
  assert.equal(attributionRequired({ licensing: { licenses: [m.licensing.licenses[0]] } }), false);
  assert.equal(attributionRequired(m), true);
  const selection = { statement: 'Public domain in the USA.', books: [{ ebook: 1, rights: 'Public domain in the USA.' }] };
  assert.equal(gutenbergLegal(m, selection).length, 4);
  assert.throws(() => gutenbergLegal(m, { ...selection, books: [{ ebook: 1, rights: 'Copyrighted.' }] }), /public-domain rights statement/);
});

function manifest(extra = {}) {
  return {
    schemaVersion: 1, id: 'test-howto', name: 'Test how-to', description: 'Gutenberg fixture.', language: 'en', contentStorage: 'workspace',
    publisher: { id: 'bendyline', name: 'Bendyline', url: 'https://github.com/bendyline/knowledge' },
    source: { type: 'gutenberg', mirror: 'https://mirror.example', bookshelf: shelf, language: 'en', maxFailureFraction: 0.2, guides: true, userAgent: 'BendylineKnowledge/0.1 (https://github.com/bendyline/knowledge)', ...extra },
    licensing: { status: 'automatic', policy: 'standard-open-v1', notice: 'NOTICE.md',
      licenses: [
        { id: 'public-domain', name: 'Public Domain Mark 1.0', spdx: 'CC-PDM-1.0', url: 'https://creativecommons.org/publicdomain/mark/1.0/', text: 'LICENSES/CC-PDM-1.0.txt', attribution: 'Public-domain transcription; credit voluntary.' },
        { id: 'cc-by-sa', name: 'CC BY-SA 4.0', spdx: 'CC-BY-SA-4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0/', text: 'LICENSES/CC-BY-SA-4.0.txt', attribution: 'Guides by Bendyline, CC BY-SA 4.0.' },
      ],
      rules: [{ include: ['books/**'], license: 'public-domain' }, { include: ['guides/**'], license: 'cc-by-sa' }] },
    normalization: { images: 'omit' },
    build: { embeddingProfile: 'bge-small-en-v1.5@1', toc: { format: 'folders' } },
    publish: { enabled: false, huggingFace: 'Bendyline/knowledge', github: 'bendyline/knowledge', gilde: { repository: 'bendyline/gilde', category: 'manuals' } },
  };
}
const guide = (link = '../../books/pg101/002.md') => `---\ntitle: Fry trout over a campfire\nsummary: Fry fresh trout in a hot pan with a little pork fat.\naliases: [cook fish while camping]\n---\n\n# Fry trout over a campfire\n\n1. Heat the pan.\n\nSource: [Camp Craft, chapter II](${link}).\n`;

test('Gutenberg workspace catalogs combine public-domain books with cited guides, resync guides offline, and build', async () => {
  const handbook = await fixture();
  const dir = handbook.dir;
  try {
    await removeWork(process.cwd(), resolve(dir, 'content'));
    await writeJson(resolve(dir, 'manifest.json'), manifest());
    for (const id of ['CC-PDM-1.0', 'CC-BY-SA-4.0']) await write(resolve(dir, `LICENSES/${id}.txt`), references.licenses.find((r) => r.id === id).text);
    await write(resolve(dir, 'guides/_topic.yaml'), 'name: How-to guides\norder: 1\n');
    await write(resolve(dir, 'guides/outdoors/fry-trout.md'), guide());
    await writeFile(resolve(dir, 'tests/queries.json'), json([{ query: 'Fry trout over a campfire', expectedDocumentIds: ['guides/outdoors/fry-trout'] }]));
    const [catalog] = await catalogs(handbook.root, handbook.key);
    assert.match((await validateCatalog(catalog, { definitionOnly: true })).status, /definition valid/);
    const feed = csv([101, 102, 103, 104, 105].map((n) => [n, 'Text', '2001-01-01', `Book ${n}`, 'en', 'Sears, George Washington, 1821-1890', '', 'SK', shelf]));
    const requests = [];
    const download = async (url) => {
      requests.push(url);
      if (url === 'https://mirror.example/feeds/pg_catalog.csv.gz') return { bytes: gzipSync(feed) };
      const ebook = Number(/pg(\d+)-images\.html$/.exec(url)?.[1]);
      if (ebook === 103) { const error = new Error('HTTP 404: https://mirror.example'); error.status = 404; throw error; }
      return { bytes: Buffer.from(page({ body: chapters, title: `Book ${ebook}`, ...(ebook === 102 ? { rights: 'Copyrighted. Read the copyright notice inside this book for details.' } : {}) })) };
    };
    const options = { download, delayMs: 0, progress: () => {} };
    catalog.manifest = CatalogSchema.parse(manifest({ maxFailureFraction: 0 }));
    await assert.rejects(prepareCatalog(catalog, options), /1 Gutenberg books failed, above the budget of 0/);
    catalog.manifest = CatalogSchema.parse(manifest());
    const prepared = await prepareCatalog(catalog, options);
    assert.equal(prepared.documents, 10);
    const selection = JSON.parse(await readFile(resolve(catalog.dir, 'LICENSES/gutenberg-selection.json'), 'utf8'));
    assert.deepEqual(selection.books.map((b) => b.ebook), [101, 104, 105]);
    assert.match(selection.excluded[0].reason, /^rights: Copyrighted/);
    assert.equal(selection.failed[0].ebook, 103);
    const provenance = (await readFile(resolve(catalog.dir, 'provenance.jsonl'), 'utf8')).trim().split('\n').map(JSON.parse);
    const chapter = provenance.find((p) => p.path === 'books/pg101/002.md');
    assert.equal(chapter.license, 'public-domain'); assert.equal(chapter.gutenbergEbook, 101);
    assert.equal(chapter.sourceUrl, 'https://mirror.example/101/pg101-images.html');
    assert.equal(provenance.find((p) => p.path === 'guides/outdoors/fry-trout.md').license, 'cc-by-sa');
    assert.match(await readFile(resolve(catalog.dir, 'content/books/pg101/_topic.yaml'), 'utf8'), /name: Book 101 — George Washington Sears/);

    // A guide edit invalidates the accepted snapshot and is resynchronized from the source cache.
    await write(resolve(dir, 'guides/outdoors/fry-trout.md'), guide().replace('Heat the pan.', 'Heat the pan until fat shimmers.'));
    await assert.rejects(validateCatalog(catalog), /guides changed/);
    const offline = { ...options, download: async () => { throw new Error('Unexpected network request'); } };
    assert.equal((await prepareCatalog(catalog, offline)).reused, false);
    assert.match(await readFile(resolve(catalog.dir, 'content/guides/outdoors/fry-trout.md'), 'utf8'), /fat shimmers/);
    await write(resolve(dir, 'guides/outdoors/fry-trout.md'), guide('../../books/pg999/001.md'));
    await assert.rejects(prepareCatalog(catalog, offline), /does not name a catalog document/);
    await write(resolve(dir, 'guides/outdoors/fry-trout.md'), guide());
    await prepareCatalog(catalog, offline);

    const built = await buildCatalog(catalog, { version: '2026.10.1', embedderFactory: fakeEmbedder });
    assert.equal(built.manifest.counts.documents, 10);
    assert.equal(built.manifest.license.attributionRequired, true);
  } finally { await removeWork(process.cwd(), handbook.root); }
});

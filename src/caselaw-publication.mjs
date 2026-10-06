// A national publication scope and capacity estimate, not a frozen case plan.
// Full metadata/corpus audits are required before publishing any listed part.
const OTHER_JURISDICTIONS = new Map([
  ['us', 'federal'], ['dc', 'district'], ['am-samoa', 'territory'],
  ['guam', 'territory'], ['n-mar-i', 'territory'], ['pr', 'territory'],
  ['vi', 'territory'], ['dakota-territory', 'historical-territory'],
  ['navajo-nation', 'tribal'], ['tribal', 'tribal'], ['regional', 'reporter-group'],
]);
const slug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function planCapPublication(roots, benchmark) {
  const targetBytes = 1073741824;
  const ceilingBytes = 1610612736;
  const wyoming = roots.JurisdictionsMetadata.find(j => j.slug === 'wyo');
  if (!wyoming?.page_count || !benchmark.build?.totalArchiveBytes || !benchmark.audit?.verified
    || benchmark.corpus.records !== wyoming.case_count) throw new Error('National planning requires the complete audited Wyoming size benchmark');
  for (const source of roots.evidence) {
    if (!benchmark.roots.some(r => r.name === source.name && r.sha256 === source.sha256)) throw new Error('National metadata differs from the calibration snapshot');
  }
  const knownNames = new Set();
  const collections = []; const unresolved = [];
  for (const j of roots.JurisdictionsMetadata) {
    if (knownNames.has(j.slug)) throw new Error('Duplicate CAP jurisdiction');
    knownNames.add(j.slug);
    if (!Number.isSafeInteger(j.case_count) || !Number.isSafeInteger(j.page_count)) {
      unresolved.push({ jurisdiction: j.slug, jurisdictionId: j.id, name: j.name_long,
        reason: 'No advertised case/page counts. National case-index sweep must establish whether records need a separate collection; never silently discard them.' });
      continue;
    }
    if (j.case_count < 1 || j.page_count < 1) throw new Error('Invalid CAP jurisdiction statistics');
    const estimatedArchiveBytes = Math.ceil(j.page_count * benchmark.build.totalArchiveBytes / wyoming.page_count);
    const estimatedParts = Math.max(1, Math.ceil(estimatedArchiveBytes / targetBytes));
    const id = `caselaw-${slug(j.name_long)}`;
    collections.push({ id, name: j.name_long, kind: OTHER_JURISDICTIONS.get(j.slug) ?? 'state',
      jurisdiction: j.slug, jurisdictionId: j.id, advertisedCases: j.case_count, advertisedPages: j.page_count,
      estimatedArchiveBytes, estimatedParts,
      packageIds: Array.from({ length: estimatedParts }, (_, i) => `${id}-part-${String(i + 1).padStart(4, '0')}`),
      config: { schemaVersion: 1, id, name: `${j.name_long} caselaw — Caselaw Access Project`, jurisdiction: j.slug,
        targetBytes, ceilingBytes, sizeEstimate: 'wyoming-bge-v1', embeddingProfile: 'bge-small-en-v1.5@1' },
    });
  }
  if (collections.filter(c => c.kind === 'state').length !== 50) throw new Error('National scope must contain all 50 states');
  const federal = roots.JurisdictionsMetadata.find(j => j.slug === 'us');
  const federalReporterSlugs = new Set(federal.reporters.map(r => r.slug));
  for (const r of roots.ReportersMetadata) if (r.jurisdictions.some(j => j.id === federal.id)) federalReporterSlugs.add(r.slug);
  for (const v of roots.VolumesMetadata) if (v.jurisdictions.some(j => j.id === federal.id)) federalReporterSlugs.add(v.reporter_slug);
  const reporters = new Map(roots.ReportersMetadata.map(r => [r.slug, r]));
  const federalSourceReporters = [...federalReporterSlugs].sort().map(s => ({ slug: s, name: reporters.get(s)?.full_name ?? s,
    availableSourceVolumes: roots.VolumesMetadata.filter(v => v.reporter_slug === s).length }));
  const allReporterSlugs = new Set(roots.VolumesMetadata.map(v => v.reporter_slug));
  return { schemaVersion: 1, status: 'provisional-national-publication-plan', snapshot: benchmark.snapshot,
    targetBytes, ceilingBytes, sizeUnit: 'GiB (1,073,741,824 bytes)',
    selection: 'Every CAP case record, assigned by its source jurisdiction ID; all source reporters and volumes included in the national inventory. CAP classification anomalies are retained and disclosed, not silently reassigned or dropped.',
    sources: roots.evidence, sourceReporters: allReporterSlugs.size, sourceVolumes: roots.VolumesMetadata.length,
    advertisedCases: collections.reduce((n, c) => n + c.advertisedCases, 0), collections: collections.length,
    estimatedArchiveBytes: collections.reduce((n, c) => n + c.estimatedArchiveBytes, 0),
    estimatedParts: collections.reduce((n, c) => n + c.estimatedParts, 0),
    estimate: { method: 'CAP jurisdiction page counts multiplied by Wyoming measured archive bytes per source page; ceil(bytes / target) estimates part counts.',
      calibration: { collection: benchmark.collection, version: benchmark.build.version, archiveBytes: benchmark.build.totalArchiveBytes, sourcePages: wyoming.page_count },
      caveat: 'Capacity estimates from one jurisdiction, not measured national archive sizes or frozen membership. Compression, document lengths, languages, chunking, case overhead and year boundaries will change counts. No final date boundaries are claimed.' },
    collectionsPlan: collections, unresolvedJurisdictions: unresolved, federalSourceReporters,
    federalOrganization: 'One complete federal collection, split chronologically into approximately 1 GiB archives with court/reporter metadata retained. U.S. Reports 1–572 and every other CAP federal source are included. This does not publish a separate duplicate of each source reporter.',
    pilots: { role: 'Explicitly labeled limited public pilots may precede the national collections; consumers must not install overlapping selections together.', supersededCatalogs: ['caselaw-us-347', 'caselaw-us-347-349'], priorWyomingParts: 'The four 512 MiB-estimate pilot parts are replaced by a newly planned single archive; historical build evidence remains immutable.' },
    releaseGates: ['Exhaustive national case-index sweep and case-count reconciliation', 'Resolve uncounted/unmapped jurisdictions and duplicate CAP IDs',
      'Complete source normalization and fidelity audits', 'Freeze measured case membership and date spans',
      'Build and verify actual archive sizes, integrity, citations and semantic retrieval', 'Collection publishing and verified remote receipts'],
  };
}

export function renderCapPublication(plan) {
  const f = value => value.toLocaleString('en-US');
  const gib = value => (value / 1073741824).toFixed(2);
  const lines = ['# National CAP publication plan', '',
    `Scope: **${f(plan.advertisedCases)} CAP case records**, ${plan.collections} populated jurisdictions, ${f(plan.sourceVolumes)} source volumes and ${plan.sourceReporters} reporters in the pinned ${plan.snapshot} metadata.`, '',
    `Target: **1 GiB per .gezk**, with a 1.5 GiB actual ceiling. The capacity estimate is **${plan.estimatedParts} archives / ${gib(plan.estimatedArchiveBytes)} GiB**. These counts are provisional, not measured or frozen package boundaries.`, '',
    'The estimates scale CAP source-page counts against the four measured Wyoming archives. A national case inventory and measured normalized content must replace these estimates before release. Small jurisdictions remain standalone; cases are never split. Adjacent years are grouped into parts. The last part may be smaller.', '',
    'Every ID below is a collection prefix. Append `-part-0001`, `-part-0002`, etc. to identify the proposed archive slots, followed by an immutable release version in the filename. The JSON companion enumerates every provisional package ID and includes a usable collection configuration per jurisdiction.', '',
    '| Collection | ID prefix | CAP records | Estimated GiB | Estimated parts |',
    '| --- | --- | ---: | ---: | ---: |'];
  for (const c of plan.collectionsPlan) lines.push(`| ${c.name} | \`${c.id}\` | ${f(c.advertisedCases)} | ${gib(c.estimatedArchiveBytes)} | ${c.estimatedParts} |`);
  lines.push('', '## Federal coverage', '', plan.federalOrganization, '',
    'Reporter and volume jurisdiction labels are discovery hints. CAP case-level jurisdiction controls membership: for example, Pennsylvania-labeled cases in early U.S. Reports belong in Pennsylvania. The full national sweep includes reporters beyond the federal hints listed below. CAP classification is not always a clean state/federal separation: Alaska includes 21 U.S. District Court records that CAP labels Alaska. Such records retain their actual court names and are disclosed in collection scope notes.', '',
    '| Federal candidate source reporter | CAP slug | Source volumes available |', '| --- | --- | ---: |');
  for (const r of plan.federalSourceReporters) lines.push(`| ${r.name} | \`${r.slug}\` | ${r.availableSourceVolumes} |`);
  lines.push('', 'These volume counts describe complete source reporter inventories, not counts of exclusively federal books. Case-level selection prevents routing state cases into the federal archive.', '',
    '## Scope and release conditions', '',
    'CAP’s `regional` entry has no advertised case or page count. Treat it as unresolved until the exhaustive index sweep proves whether it contains records needing their own collection. It is not assumed to be empty.', '',
    'CAP record identity is preserved; equal case names or parallel citations are not grounds for silently dropping records. Unknown jurisdiction IDs and duplicate CAP IDs block completion. The root counts describe CAP coverage, not every decision ever issued by these courts.', '',
    'Explicitly labeled limited public pilots may precede national releases. The combined U.S. Reports 347–349 pilot is enabled for that purpose; the single-volume pilot and four-part Wyoming benchmark remain development artifacts. Full national releases supersede overlapping pilots, which should not be installed alongside their replacements.', '',
    'Wyoming’s four archives total 1,056,484,052 bytes (0.984 GiB). The updated token-based estimate selects all 10,931 cases for one part; a combined build still needs actual-size and retrieval verification. The existing semantic miss remains unresolved.', '',
    'The existing frozen Wyoming plan remains unchanged under snapshot `2026-10-06`. The current Wyoming configuration now requests 1 GiB using `wyoming-bge-v1`; use preview against the cached corpus, then a new snapshot/plan identity for a production freeze. Do not overwrite the old plan.', '',
    'Other collection configurations in the JSON are production-scope proposals, not a claim that those corpora are already ingested. Add representative citation and semantic checks before freezing each collection. Puerto Rico and other multilingual content require checking language coverage and the embedding profile; size calibration must be remeasured if that profile changes.', '',
    ...plan.releaseGates.map(g => `- ${g}.`), '',
    'Sources: [CAP jurisdiction metadata](https://static.case.law/JurisdictionsMetadata.json), [reporter metadata](https://static.case.law/ReportersMetadata.json), [volume metadata](https://static.case.law/VolumesMetadata.json). Exact source SHA-256 pins and all provisional package IDs are in `collections/caselaw/publication-plan.json`.', '');
  return lines.join('\n');
}

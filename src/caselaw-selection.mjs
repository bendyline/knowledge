import { digest } from './files.mjs';
import { capCoverage, capVolumeKey } from './caselaw-inventory.mjs';
import { CASELAW_TERMS } from './caselaw-policy.mjs';

export const collectionSelection = config => config.reporter
  ? { reporter: config.reporter, ...(config.volumes ? { volumes: config.volumes } : {}) }
  : config.jurisdiction;
export const capSelectionKey = selection => typeof selection === 'string' ? selection
  : `reporter-${selection.reporter}${selection.volumes ? `-${digest([...selection.volumes].sort()).slice(0, 16)}` : ''}`;
export function capSelectionFilter(selection) {
  if (typeof selection === 'number') return { where: 'jurisdiction=?', args: [selection] };
  if (!selection || typeof selection.reporter !== 'string') throw Error('Expected a CAP jurisdiction ID or reporter selection');
  capVolumeKey(selection.reporter, '1');
  const volumes = selection.volumes;
  if (volumes && (!volumes.length || new Set(volumes).size !== volumes.length)) throw Error('Reporter volumes must be nonempty and unique');
  for (const volume of volumes ?? []) capVolumeKey(selection.reporter, volume);
  return { where: `reporter=?${volumes ? ` AND folder IN (${volumes.map(() => '?').join(',')})` : ''}`, args: [selection.reporter, ...(volumes ?? [])] };
}
export function capSelectionCoverage(store, roots, selection) {
  if (typeof selection === 'string') return capCoverage(store, roots, selection);
  const { where, args } = capSelectionFilter(selection);
  const reporter = roots.ReportersMetadata.find(r => r.slug === selection.reporter);
  if (!reporter) throw Error(`Unknown CAP reporter ${selection.reporter}`);
  const candidates = roots.VolumesMetadata.filter(v => v.reporter_slug === selection.reporter && (!selection.volumes || selection.volumes.includes(v.volume_folder)));
  if (!candidates.length || (selection.volumes && candidates.length !== selection.volumes.length)) throw Error('Unknown CAP reporter volume in selection');
  const volumes = candidates.map(v => store.db.prepare('SELECT reporter,folder,index_sha,case_count,status,error FROM volumes WHERE reporter=? AND folder=?').get(v.reporter_slug, v.volume_folder));
  const counts = store.db.prepare(`SELECT COUNT(*) records,COUNT(DISTINCT id) distinctIds FROM cases WHERE ${where}`).get(...args);
  const duplicates = store.db.prepare(`SELECT id,COUNT(*) occurrences FROM cases WHERE ${where} GROUP BY id HAVING COUNT(*)>1`).all(...args);
  const membership = store.db.prepare(`SELECT id,reporter,folder,file,meta_sha FROM cases WHERE ${where} ORDER BY id,reporter,folder,file`).all(...args);
  const indexed = volumes.filter(v => v.status === 'indexed').length;
  const advertisedCases = volumes.reduce((n, v) => n + (v.case_count ?? 0), 0);
  return { schemaVersion: 1, snapshot: store.snapshot, selection, reporter: { ...(reporter.id === undefined ? {} : { id: reporter.id }), slug: reporter.slug, name: reporter.full_name ?? reporter.slug },
    scope: 'Every indexed case in the selected reporter volumes, including all CAP jurisdiction assignments; counts reconcile with each pinned volume index. This is a reporter selection, not an exhaustive jurisdiction collection.',
    roots: roots.evidence, termsSha256: CASELAW_TERMS.sha256, advertisedCases, candidateVolumes: volumes.length, indexedVolumes: indexed, ...counts, duplicates,
    unresolvedVolumes: volumes.filter(v => v.status !== 'indexed'),
    metadataComplete: indexed === volumes.length && counts.records === advertisedCases && !duplicates.length,
    inventoryDigest: digest({ roots: roots.evidence, volumes }), selectionDigest: digest(membership),
    sources: volumes.filter(v => v.status === 'indexed').map(({ reporter, folder, index_sha, case_count }) => ({ reporter, volume: folder, indexSha256: index_sha, cases: case_count })),
  };
}

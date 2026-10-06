import test from 'node:test';
import assert from 'node:assert/strict';
import { readJson } from '../src/files.mjs';
import { CapCollection } from '../src/caselaw-packages.mjs';
import { planCapPublication } from '../src/caselaw-publication.mjs';

test('national publication scope includes all states and federal/territorial/tribal cases without overlapping archive IDs', async () => {
  const plan = await readJson('collections/caselaw/publication-plan.json');
  assert.equal(plan.collectionsPlan.filter(c => c.kind === 'state').length, 50);
  assert.equal(plan.collectionsPlan.length, 60);
  assert.equal(plan.collectionsPlan.reduce((n, c) => n + c.advertisedCases, 0), 6920596);
  const ids = plan.collectionsPlan.flatMap(c => c.packageIds);
  assert.equal(ids.length, plan.estimatedParts);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(plan.collectionsPlan.find(c => c.jurisdiction === 'wyo').estimatedParts, 1);
  assert.equal(plan.collectionsPlan.find(c => c.jurisdiction === 'us').advertisedCases, 1842424);
  assert.equal(plan.federalSourceReporters.find(r => r.slug === 'us').availableSourceVolumes, 572);
  for (const c of plan.collectionsPlan) {
    assert.equal(CapCollection.parse(c.config).targetBytes, 1073741824);
    assert.equal(c.config.jurisdiction, c.jurisdiction);
  }
  assert.deepEqual(plan.unresolvedJurisdictions.map(j => j.jurisdiction), ['regional']);
});

test('national scope generation retains unknown jurisdictions and rejects incompatible calibration evidence', async () => {
  const saved = await readJson('collections/caselaw/publication-plan.json');
  const benchmark = await readJson('collections/caselaw/wyoming/benchmark-2026-10-06.json');
  const roots = { evidence: saved.sources,
    JurisdictionsMetadata: saved.collectionsPlan.map(c => ({ id: c.jurisdictionId, slug: c.jurisdiction, name_long: c.name,
      case_count: c.advertisedCases, page_count: c.advertisedPages, reporters: [] })),
    ReportersMetadata: [{ slug: 'us', full_name: 'United States Reports', jurisdictions: [{ id: 39 }] }],
    VolumesMetadata: [{ reporter_slug: 'us', volume_folder: '1', jurisdictions: [{ id: 39 }] }],
  };
  roots.JurisdictionsMetadata.push({ id: 999, slug: 'unknown', name_long: 'Unmapped', reporters: [] });
  const plan = planCapPublication(roots, benchmark);
  assert.equal(plan.advertisedCases, 6920596);
  assert.equal(plan.unresolvedJurisdictions[0].jurisdiction, 'unknown');
  assert.throws(() => planCapPublication({ ...roots, evidence: [{ name: 'JurisdictionsMetadata', sha256: 'changed' }] }, benchmark), /differs/);
  assert.throws(() => planCapPublication(roots, { ...benchmark, audit: { verified: false } }), /audited/);
});

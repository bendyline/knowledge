import { readJson } from './files.mjs';
import { resolve } from 'node:path';
import { currentEventsSeeds } from './sources/mediawiki.mjs';

export async function validateWikipediaSelection(catalog, provenance) {
  const { manifest: m } = catalog;
  if (m.source.type !== 'wikipedia' || !m.source.currentEvents) return;
  const selection = await readJson(resolve(catalog.dir, 'LICENSES/selection.json'));
  const days = currentEventsSeeds({ ...m.source.currentEvents, endDate: selection.window?.end });
  if (selection.window?.days !== days.length || selection.window?.start !== days[0].date || selection.dailyPages?.length !== days.length || selection.pages !== provenance.length) throw new Error('Wikipedia selection window/count disagrees with provenance');
  const byId = new Map(provenance.map((p) => [p.wikipediaPageId, p]));
  if (byId.size !== provenance.length || byId.has(undefined)) throw new Error('Wikipedia page IDs must be present and unique');
  const expectedParents = new Map();
  for (const [index, day] of selection.dailyPages.entries()) {
    const p = byId.get(day.pageId);
    if (day.date !== days[index].date || p?.newsDate !== day.date || p.depth !== 0 || p.path !== `days/${day.date}.md`) throw new Error(`Missing or inconsistent daily news page: ${days[index].date}`);
    if (new Set(day.articleIds).size !== day.articleIds.length) throw new Error(`Repeated referent IDs in daily selection: ${day.date}`);
    for (const id of day.articleIds) {
      if (!byId.has(id)) throw new Error(`Daily news links to missing article ID: ${id}`);
      if (!expectedParents.has(id)) expectedParents.set(id, new Set());
      expectedParents.get(id).add(String(day.pageId));
    }
  }
  const referents = provenance.filter((p) => p.depth > 0);
  if (selection.articlePages !== referents.length) throw new Error('Wikipedia referent count disagrees with provenance');
  if (m.source.depth === 1 && !(m.source.seeds?.length)) {
    for (const p of referents) {
      const parents = [...(expectedParents.get(p.wikipediaPageId) ?? [])].sort();
      if (!parents.length || JSON.stringify(parents) !== JSON.stringify(p.referredBy) || p.path !== `articles/${p.wikipediaPageId}.md`) throw new Error(`Wikipedia referent reachability disagrees with provenance: ${p.path}`);
    }
  }
}

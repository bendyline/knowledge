import { posix } from 'node:path';
import { stringify } from 'yaml';
import { parseYaml } from '../catalogs.mjs';
import { normalizeDocfxMarkdown } from '../../vendor/squisq/docfxMarkdown.mjs';

export { normalizeDocfxMarkdown };
export const yamlBodyType = (text) => /^###\s*YamlMime:\s*(\S+)/m.exec(text)?.[1];
export function docfxYamlToMarkdown(text, path) {
  const kind = yamlBodyType(text);
  if (!['Landing', 'FAQ'].includes(kind)) return null;
  const page = parseYaml(text, path);
  const title = page.title ?? page.metadata?.title;
  if (!title) throw new Error(`${path}: YAML document has no title`);
  const blocks = [`---\ntitle: ${JSON.stringify(title)}\n---\n`, `# ${title}`, page.summary ?? ''];
  if (kind === 'FAQ') {
    for (const section of page.sections ?? []) {
      if (section.name) blocks.push(`## ${section.name}`);
      for (const row of section.questions ?? []) blocks.push(`### ${row.question.trim()}`, row.answer.trim());
    }
    if (page.additionalContent) blocks.push(page.additionalContent);
  } else {
    for (const section of page.landingContent ?? []) {
      blocks.push(`## ${section.title}`);
      for (const list of section.linkLists ?? []) {
        for (const link of list.links ?? []) blocks.push(`- [${link.text.replace(/\]/g, '\\]')}](${link.url})`);
      }
    }
  }
  return blocks.filter(Boolean).join('\n\n') + '\n';
}
export function rewriteDocfxToc(text, path, mapping, resolveUrl) {
  const data = parseYaml(text, path);
  function visit(value) {
    if (Array.isArray(value)) return value.map(visit);
    if (!value || typeof value !== 'object') return value;
    const result = { ...value };
    if (typeof result.href === 'string') result.href = resolveUrl(result.href, path, path, mapping);
    if (typeof result.topicHref === 'string') result.topicHref = resolveUrl(result.topicHref, path, path, mapping);
    if (result.items) result.items = visit(result.items);
    return result;
  }
  return stringify(visit(data), { lineWidth: 0 });
}

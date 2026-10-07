import { parseFragment } from 'parse5';

// OCR sometimes leaves URL-shaped text with an invalid host. Keep that text
// literal, so Markdown autolinking cannot turn it into a broken source link.
export function protectMalformedCapUrls(root) {
  let count = 0;
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const visit = node => {
    if (node.nodeName === '#text') {
      for (let p = node.parentNode; p; p = p.parentNode) if (['a', 'pre', 'code'].includes(p.tagName)) return;
      const parts = []; let end = 0;
      for (const match of node.value.matchAll(/\bhttps?:\/\/[^\s<>]+/gi)) {
        try { new URL(match[0]); continue; } catch { /* Preserve malformed OCR literally. */ }
        if (match.index > end) parts.push({ nodeName: '#text', value: node.value.slice(end, match.index) });
        parts.push(parseFragment(`<code>${escape(match[0])}</code>`).childNodes[0]);
        end = match.index + match[0].length;
        count++;
      }
      if (parts.length) {
        if (end < node.value.length) parts.push({ nodeName: '#text', value: node.value.slice(end) });
        const parent = node.parentNode;
        for (const part of parts) part.parentNode = parent;
        parent.childNodes.splice(parent.childNodes.indexOf(node), 1, ...parts);
      }
      return;
    }
    for (const child of [...node.childNodes ?? []]) visit(child);
  };
  visit(root);
  return count;
}

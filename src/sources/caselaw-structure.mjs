import { parseFragment } from 'parse5';

const classes = node => (node.attrs?.find(a => a.name === 'class')?.value ?? '').split(/\s+/);
const sections = new Map([['headnotes', 'Headnotes'], ['summary', 'Summary'], ['attorneys', 'Attorneys']]);
const marks = new Set(['em', 'i', 'strong', 'b', 's', 'del', 'strike']);

// Compatibility with the pinned Squisq HTML importer: an empty mark currently
// serializes as visible delimiter characters. Preserve whitespace and IDs by
// making empty formatting transparent, including nested empty marks.
export function neutralizeEmptyCapMarks(root) {
  let count = 0;
  const content = node => node.nodeName === '#text' ? Boolean(node.value.trim())
    : node.nodeName === '#comment' ? false
      : marks.has(node.tagName) || node.tagName === 'span'
        ? (node.childNodes ?? []).some(content) : true;
  const visit = node => {
    for (const child of node.childNodes ?? []) visit(child);
    if (marks.has(node.tagName) && !(node.childNodes ?? []).some(content)) {
      node.nodeName = node.tagName = 'span';
      count++;
    }
  };
  visit(root);
  return count;
}

// CAP distinguishes editorial headnotes and procedural summaries from the
// opinion. Keep consecutive source blocks together without inventing a summary
// or changing their text. Headings also give the chunker meaningful boundaries.
export function addCapHeadMatterSections(root) {
  let count = 0;
  const visit = node => {
    if (classes(node).includes('head-matter')) {
      let previous = '';
      const children = [];
      for (const child of node.childNodes ?? []) {
        if (child.tagName) {
          const kind = classes(child).find(name => sections.has(name)) ?? '';
          if (kind !== previous && (kind || previous)) {
            const label = sections.get(kind) ?? 'Other case information';
            const heading = parseFragment(`<h3>${label}</h3>`).childNodes[0];
            heading.parentNode = node;
            children.push(heading);
            count++;
          }
          previous = kind;
        }
        children.push(child);
      }
      node.childNodes = children;
    }
    for (const child of node.childNodes ?? []) visit(child);
  };
  visit(root);
  return count;
}

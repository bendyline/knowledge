const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;
const text = node => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join('');

// A missing numbered note can coexist with other notes. Only recognize that
// case when every existing body has an unambiguous ID and matching label, and
// neither its label nor its return link could identify the missing target.
export function absentNumberedCapNote(target, links, notes) {
  const match = /^footnote_\d+_(\d+)$/.exec(target);
  if (!match || !links.length || !links.every(link => text(link).trim() === match[1])) return false;
  const returnTarget = `#ref_${target}`;
  const hasReturn = node => attr(node, 'href') === returnTarget || (node.childNodes ?? []).some(hasReturn);
  return notes.every(note => {
    const id = attr(note, 'id');
    const label = attr(note, 'data-label')?.trim();
    const number = /^footnote_\d+_(\d+)$/.exec(id ?? '')?.[1];
    return number && label === number && id !== target && label !== match[1] && !hasReturn(note);
  });
}

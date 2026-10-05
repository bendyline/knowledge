// Generated from @bendyline/squisq; MIT. Do not edit. See NOTICE.md.
import { parseMarkdown } from '@bendyline/squisq/markdown';
import { stringifyHtmlNodes } from '@bendyline/squisq/markdown';
import { stringifyMarkdown } from '@bendyline/squisq/markdown';
import { getChildren, splitFrontmatterBlock } from '@bendyline/squisq/markdown';
                                                                                                

                                           
                                                                                      
                                                                           
                                                                              
                               
 

/**
 * Rewrite references using the Markdown and HTML trees. Only changed node
 * spans are serialized: frontmatter, prose, and code outside those spans stay
 * byte-identical. Handles inline and reference links, images, and raw HTML.
 * Does not fetch resources and is not an HTML sanitizer.
 */
export function rewriteMarkdownReferences(
  source        ,
  options                           = {},
)         {
  const { frontmatter, body } = splitFrontmatterBlock(source);
  const document = parseMarkdown(body, { frontmatter: false });
  const html = (
    nodes            ,
    insidePicture = false,
  )                                          => {
    let changed = false;
    const output = nodes.flatMap((node)             => {
      if (node.type !== 'htmlElement') return [node];
      if (options.images === 'omit' && node.tagName === 'picture') {
        changed = true;
        return html(node.children, true).nodes;
      }
      if (
        options.images === 'omit' &&
        (node.tagName === 'img' || (node.tagName === 'source' && insidePicture))
      ) {
        changed = true;
        const alt = node.tagName === 'img' ? node.attributes.alt : undefined;
        return alt
          ? [
              {
                type: 'htmlText',
                value: alt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
              },
            ]
          : [];
      }
      const child = html(node.children);
      changed ||= child.changed;
      const copy = { ...node, attributes: { ...node.attributes }, children: child.nodes };
      const key = node.tagName === 'a' ? 'href' : node.tagName === 'img' ? 'src' : undefined;
      if (key && node.attributes[key]) {
        const value = options.rewriteUrl?.(node.attributes[key], key === 'href' ? 'link' : 'image');
        if (value !== undefined && value !== node.attributes[key]) {
          copy.attributes[key] = value;
          changed = true;
        }
      }
      return [copy];
    });
    return { nodes: output, changed };
  };
                                                           
                                                                                          
  const blocks = new Set([
    'heading',
    'paragraph',
    'blockquote',
    'code',
    'thematicBreak',
    'list',
    'table',
    'htmlBlock',
    'mathBlock',
    'definition',
    'footnoteDefinition',
    'containerDirective',
    'leafDirective',
    'definitionList',
  ]);
  const structural = new Set([
    'listItem',
    'tableRow',
    'tableCell',
    'definitionTerm',
    'definitionDescription',
  ]);
  const render = (node              )         => {
    if (node.type === 'document') return stringifyMarkdown(node).trimEnd();
    return stringifyMarkdown({
      type: 'document',
      children: blocks.has(node.type)
        ? [node                     ]
        : [{ type: 'paragraph', children: [node                      ] }],
    }).trimEnd();
  };
  const visit = (node              )         => {
    const children = getChildren(node).map(visit);
    const childChanged = children.some((child) => child.changed);
    let clone               =
      childChanged && 'children' in node
        ? ({ ...node, children: children.map((child) => child.node) }                )
        : node;
    let ownChange = false;
    if ((node.type === 'image' || node.type === 'imageReference') && options.images === 'omit') {
      clone = { type: 'text', value: node.alt ?? '' };
      ownChange = true;
    } else if (node.type === 'htmlBlock' || node.type === 'htmlInline') {
      const transformed = html(node.htmlChildren);
      if (transformed.changed) {
        clone = {
          ...node,
          htmlChildren: transformed.nodes,
          rawHtml: stringifyHtmlNodes(transformed.nodes),
        };
        ownChange = true;
      }
    } else if (clone.type === 'link' || clone.type === 'image' || clone.type === 'definition') {
      const url = options.rewriteUrl?.(clone.url, clone.type === 'image' ? 'image' : 'link');
      if (url !== undefined && url !== clone.url) {
        clone = { ...clone, url };
        ownChange = true;
      }
    }
    const changed = ownChange || childChanged;
    const pending = ownChange || children.some((child) => child.pending);
    const start = node.position?.start.offset;
    const end = node.position?.end.offset;
    // Parsers can synthesize autolinks without source positions (for example,
    // an escaped bare domain in emphasis). Reprint the nearest positioned
    // ancestor instead of guessing offsets or silently skipping its edit.
    if (pending && start !== undefined && end !== undefined && !structural.has(node.type)) {
      return { node: clone, changed, pending: false, edits: [{ start, end, text: render(clone) }] };
    }
    return { node: clone, changed, pending, edits: children.flatMap((child) => child.edits) };
  };
  const result = visit(document);
  if (result.pending) throw new Error('Reference edit has no positioned ancestor');
  const edits = result.edits;
  let output = body;
  let boundary = body.length;
  for (const e of edits.sort((a, b) => b.start - a.start)) {
    if (e.end > boundary) throw new Error('Overlapping reference edits');
    output = output.slice(0, e.start) + e.text + output.slice(e.end);
    boundary = e.start;
  }
  return (frontmatter ?? '') + output;
}

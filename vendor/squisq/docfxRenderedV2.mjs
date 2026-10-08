// Generated from @bendyline/squisq; MIT. Do not edit. See NOTICE.md.
import { parseMarkdown } from '@bendyline/squisq/markdown';
import { stringifyMarkdown } from '@bendyline/squisq/markdown';
import { splitFrontmatterBlock, walkMarkdownTree } from '@bendyline/squisq/markdown';

                                       
                                                     
                               
                                                                                       
                              
                                                                                
                                                                               
                                                                          
                                           
                                                                                    
                                                  
 

/** Convert presentational DocFX directives to portable Markdown without fetching.
 * Includes and code transclusions remain the source adapter's responsibility.
 * All zone variants are retained with their pivot labels. Code examples and
 * frontmatter remain untouched by default. Hosts can preserve unsupported syntax
 * and metadata visibly through the explicit preservation options.
 */
export function normalizeDocfxMarkdown(source        , options                       = {})         {
  let output = normalizeDocfxMarkdownPass(source, options);
  // Removing presentation containers can change whether an indented directive
  // is part of a list or code. Re-evaluate the resulting structure, preserving
  // true literal examples on every pass. Bound convergence for malformed input.
  if (options.unknownDirectives === 'preserve') {
    for (let pass = 0; pass < 2 && output !== source && /:::/u.test(output); pass++) {
      source = output;
      output = normalizeDocfxMarkdownPass(source, options);
    }
  }
  return output;
}

function normalizeDocfxMarkdownPass(source        , options                       = {})         {
  const { frontmatter, body: originalBody } = splitFrontmatterBlock(source);
  const body = flattenDocfxLayout(originalBody);
  const protectedSpans                          = [];
  for (const comment of body.matchAll(/<!--[\s\S]*?(?:-->|$)/g))
    protectedSpans.push([comment.index, comment.index + comment[0].length]);
  walkMarkdownTree(parseMarkdown(body, { frontmatter: false, directive: false }), (node) => {
    if (
      (node.type === 'code' || node.type === 'inlineCode') &&
      node.position?.start.offset !== undefined &&
      node.position.end.offset !== undefined
    )
      protectedSpans.push([node.position.start.offset, node.position.end.offset]);
  });
  const escape = (text        )         =>
    stringifyMarkdown({
      type: 'document',
      children: [{ type: 'paragraph', children: [{ type: 'text', value: text }] }],
    }).trimEnd();
  let output = body.replace(
    /(^[^\S\n]*(?:>\s*)?):::\s*([\w-]+)([^\n]*?)(?=\r?$)|(^[^\S\n]*>\s*)\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|div)\b([^\]]*)\]|:::\s*(image|no-loc)\b([^\n]*?):::/gim,
    (
      match        ,
      prefix                    ,
      name                    ,
      raw                    ,
      quote                    ,
      admonition                    ,
      _extra        ,
      inlineName                    ,
      inlineRaw                    ,
      offset        ,
    ) => {
      if (protectedSpans.some(([start, end]) => offset >= start && offset < end)) return match;
      if (admonition)
        return admonition.toLowerCase() === 'div'
          ? (quote ?? '')
          : `${quote}**${admonition[0] + admonition.slice(1).toLowerCase()}:**`;
      name ??= inlineName;
      raw ??= inlineRaw;
      const attributes = new Map                ();
      for (const attr of (raw ?? '').matchAll(/([\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g))
        attributes.set(attr[1], attr[2] ?? attr[3]);
      switch (name?.toLowerCase()) {
        case 'image': {
          const alt = attributes.get('alt-text') ?? '';
          const url = attributes.get('source');
          if (options.images === 'omit') return `${prefix ?? ''}${escape(alt)}`;
          if (!url) throw new Error('DocFX image has no source');
          const image = stringifyMarkdown({
            type: 'document',
            children: [{ type: 'paragraph', children: [{ type: 'image', url, alt }] }],
          }).trimEnd();
          return `${prefix ?? ''}${image}`;
        }
        case 'code':
          if (options.reference && attributes.has('source'))
            return (
              (prefix ?? '') +
              options.reference('code', attributes.get('source') , raw?.trim() ?? 'Code example')
            );
          throw new Error('Unsupported DocFX code without a source reference resolver');
        case 'no-loc':
          return (prefix ?? '') + escape(attributes.get('text') ?? '');
        case 'moniker':
          return (
            (prefix ?? '') +
            '**Applies to: ' +
            escape(attributes.get('range') ?? raw?.trim() ?? '') +
            '**'
          );
        case 'moniker-end':
          return '';
        case 'zone':
          return attributes.has('pivot')
            ? `${prefix ?? ''}**Applies to: ${escape(attributes.get('pivot') )}**\n`
            : '';
        case 'zone-end':
        case 'image-end':
        case 'row':
        case 'row-end':
        case 'column':
        case 'column-end':
          return '';
        default:
          if (options.unknownDirectives === 'preserve') {
            const fence = '`'.repeat(
              Math.max(1, ...Array.from(match.matchAll(/`+/g), (m) => m[0].length + 1)),
            );
            return `${prefix ?? ''}${fence}${match.trim()}${fence}`;
          }
          throw new Error(`Unsupported DocFX directive: ${name}`);
      }
    },
  );
  if (options.reference) {
    // Directive conversion changes offsets. Recompute spans before rewriting
    // references so literal examples and comments always remain untouched.
    const spans                          = [];
    for (const comment of output.matchAll(/<!--[\s\S]*?(?:-->|$)/g))
      spans.push([comment.index , comment.index  + comment[0].length]);
    walkMarkdownTree(parseMarkdown(output, { frontmatter: false, directive: false }), (node) => {
      if ((node.type === 'code' || node.type === 'inlineCode') && node.position)
        spans.push([node.position.start.offset , node.position.end.offset ]);
    });
    output = output.replace(
      /\[!code-[\w-]+\s*\[([^\]]*)\]\(([^)\n]+)\)\]|<xref:([^>\n]+)>/gi,
      (
        match,
        label                    ,
        target                    ,
        uid                    ,
        offset        ,
      ) => {
        if (spans.some(([start, end]) => offset >= start && offset < end)) return match;
        return uid
          ? options.reference ('xref', uid, uid.split('?')[0])
          : options.reference ('code', target , label || 'Code example');
      },
    );
  }
  if (options.unknownDirectives === 'preserve' && /\[!code-|\[!INCLUDE\b|<xref:/i.test(output)) {
    const spans                          = [];
    for (const comment of output.matchAll(/<!--[\s\S]*?(?:-->|$)/g))
      spans.push([comment.index , comment.index  + comment[0].length]);
    walkMarkdownTree(parseMarkdown(output, { frontmatter: false, directive: false }), (node) => {
      if ((node.type === 'code' || node.type === 'inlineCode') && node.position)
        spans.push([node.position.start.offset , node.position.end.offset ]);
    });
    output = output.replace(
      /\[!code-[^\n]*|\[!INCLUDE[^\n]*|<xref:[^\n]*/gi,
      (match, offset        ) => {
        if (spans.some(([start, end]) => offset >= start && offset < end)) return match;
        options.onPreservedReference?.(match);
        const fence = String.fromCharCode(96).repeat(
          Math.max(1, ...Array.from(match.matchAll(/\x60+/g), (m) => m[0].length + 1)),
        );
        return fence + ' ' + match + ' ' + fence;
      },
    );
  }
  if (options.frontmatterAsCode && frontmatter) {
    const fence = '`'.repeat(
      Math.max(3, ...Array.from(frontmatter.matchAll(/`+/g), (m) => m[0].length + 1)),
    );
    return (
      output +
      '\n\n## Original source metadata\n\n' +
      fence +
      'text\n' +
      frontmatter.trimEnd() +
      '\n' +
      fence +
      '\n'
    );
  }
  return (frontmatter ?? '') + output;
}

/** Flatten layout indentation before CommonMark mistakes column prose for code.
 * Fenced examples, ordinary indented code, and comments stay literal.
 */
function flattenDocfxLayout(source        )         {
  const stack                                          = [];
  let fence                                                   ;
  let comment = false;
  return source
    .split('\n')
    .map((line) => {
      const column = [...stack].reverse().find((entry) => entry.kind === 'column');
      const margin = column ? column.indent + 4 : 0;
      const indent = /^ */.exec(line) [0].length;
      const content = line.slice(Math.min(indent, margin));
      const boundary = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(content);
      if (fence) {
        if (
          boundary &&
          boundary[1][0] === fence.character &&
          boundary[1].length >= fence.length &&
          !boundary[2].trim()
        )
          fence = undefined;
        return content;
      }
      const commented = comment || line.includes('<!--');
      const opening = line.lastIndexOf('<!--');
      const closing = line.lastIndexOf('-->');
      if (opening > closing) comment = true;
      else if (closing >= 0) comment = false;
      if (commented) return content;
      if (boundary) {
        fence = { character: boundary[1][0], length: boundary[1].length };
        return content;
      }
      const marker = /^ *:::(row|column)(-end)?(?=\s|:|$)[^\n]*$/i.exec(line);
      if (!marker || (!stack.length && indent > 3)) return content;
      const kind = marker[1].toLowerCase();
      if (marker[2]) {
        const index = stack.map((entry) => entry.kind).lastIndexOf(kind);
        if (index < 0) return content;
        stack.splice(index);
      } else {
        if (stack.length >= 128)
          throw new Error('DocFX layout exceeds the 128-level nesting safety limit');
        stack.push({ kind, indent });
      }
      return '';
    })
    .join('\n');
}

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
  const { frontmatter, body } = splitFrontmatterBlock(source);
  const protectedSpans                          = [];
  for (const comment of body.matchAll(/<!--[\s\S]*?-->/g))
    protectedSpans.push([comment.index, comment.index + comment[0].length]);
  walkMarkdownTree(parseMarkdown(body, { frontmatter: false }), (node) => {
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
    for (const comment of output.matchAll(/<!--[\s\S]*?-->/g))
      spans.push([comment.index , comment.index  + comment[0].length]);
    walkMarkdownTree(parseMarkdown(output, { frontmatter: false }), (node) => {
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
  if (options.unknownDirectives === 'preserve' && /\[!code-|<xref:/i.test(output)) {
    const spans                          = [];
    for (const comment of output.matchAll(/<!--[\s\S]*?-->/g))
      spans.push([comment.index , comment.index  + comment[0].length]);
    walkMarkdownTree(parseMarkdown(output, { frontmatter: false }), (node) => {
      if ((node.type === 'code' || node.type === 'inlineCode') && node.position)
        spans.push([node.position.start.offset , node.position.end.offset ]);
    });
    output = output.replace(/\[!code-[^\n]*|<xref:[^\n]*/gi, (match, offset        ) => {
      if (spans.some(([start, end]) => offset >= start && offset < end)) return match;
      options.onPreservedReference?.(match);
      const fence = String.fromCharCode(96).repeat(
        Math.max(1, ...Array.from(match.matchAll(/\x60+/g), (m) => m[0].length + 1)),
      );
      return fence + ' ' + match + ' ' + fence;
    });
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

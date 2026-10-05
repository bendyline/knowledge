import { extname, posix } from 'node:path';
import { convert, defaultRegistry } from '@bendyline/squisq-formats/registry';
import { rewriteMarkdownReferences } from '../vendor/squisq/contentReferences.mjs';
import { condenseMarkdownSource } from '../vendor/squisq/condenseMarkdown.mjs';
import { portablePath, sha256 } from './files.mjs';
import bridge from '../vendor/squisq/source.json' with { type: 'json' };

export const NORMALIZER_VERSION = `squisq-formats@2.6.12+references@${bridge.sha256}`;
const formats = { '.md': 'md', '.markdown': 'md', '.html': 'html', '.htm': 'html', '.docx': 'docx', '.pdf': 'pdf' };
export const isDocument = (path) => Boolean(formats[extname(path).toLowerCase()]);
export const markdownPath = (path) => portablePath(path.replace(/\.(md|markdown|html?|docx|pdf)$/i, '.md'));

export function resolveSourceLink(url, sourcePath, outputPath, mapping, baseUrl) {
  if (!url || url.startsWith('#') || /^(?:mailto|tel|knowledge):/i.test(url)) return url;
  if (/^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith('//')) return url;
  const match = /^([^?#]*)([?#].*)?$/.exec(url);
  let target;
  try { target = posix.normalize(posix.join(posix.dirname(sourcePath), decodeURIComponent(match[1]))); } catch { return url; }
  const mapped = mapping.get(target);
  if (mapped) return (posix.relative(posix.dirname(outputPath), mapped) || posix.basename(mapped)) + (match[2] ?? '');
  return baseUrl ? new URL(url, baseUrl).href : url;
}

export async function normalizeDocument(bytes, filename, { images = 'omit', rewriteUrl, assetPrefix = `_assets/${sha256(filename).slice(0, 12)}` } = {}) {
  const format = formats[extname(filename).toLowerCase()];
  if (!format) throw new Error(`Unsupported source document: ${filename}`);
  if (bytes.length > 20000000) throw new Error(`${filename}: document exceeds 20 MB`);
  let markdown;
  const assets = [];
  const assetMap = new Map();
  if (format === 'md') markdown = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  else {
    const definition = defaultRegistry().get(format);
    if (images === 'preserve' && definition.importContainer) {
      const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
      const container = await definition.importContainer(buffer, { autoTemplates: false, formatOptions: { html: { sanitize: true } } });
      markdown = await container.readDocument();
      for (const entry of await container.listFiles()) {
        if (entry.path === await container.getDocumentPath()) continue;
        if (!/\.(png|jpe?g|gif|webp|svg)$/i.test(entry.path)) throw new Error(`${filename}: unsupported extracted asset ${entry.path}`);
        portablePath(entry.path);
        const path = portablePath(`${assetPrefix}/${entry.path}`);
        assets.push({ path, bytes: Buffer.from(await container.readFile(entry.path)) });
        assetMap.set(entry.path, posix.relative(posix.dirname(markdownPath(filename)), path));
      }
    } else {
      const result = await convert({ kind: 'bytes', data: bytes, filename }, 'md', { autoTemplates: false, formatOptions: { html: { sanitize: true } } });
      if (result.warnings.length) throw new Error(`${filename}: conversion warnings: ${result.warnings.join('; ')}`);
      markdown = new TextDecoder().decode(result.bytes);
    }
  }
  if (!markdown?.trim()) throw new Error(`${filename}: conversion produced no text (scanned PDFs require OCR before import)`);
  markdown = markdown.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  markdown = rewriteMarkdownReferences(markdown, {
    images,
    rewriteUrl: (url, kind) => assetMap.get(url) ?? rewriteUrl?.(url, kind),
  });
  markdown = condenseMarkdownSource(markdown);
  return { markdown: markdown.trimEnd() + '\n', assets, transformation: `${NORMALIZER_VERSION}; ${format}->markdown; images=${images}; references rewritten; table padding and dividers condensed` };
}

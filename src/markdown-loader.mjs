import { loadMarkdownCatalog } from './toolchain.mjs';
import { rewriteMarkdownReferences } from '../vendor/squisq/contentReferences.mjs';

export async function loadNormalizedMarkdown(root, options, { images }) {
  const source = await loadMarkdownCatalog(root, {
    ...options,
    // The published loader also scans image syntax inside comments and inline
    // code. With images omitted, check candidate documents against the AST
    // instead of requiring files for non-rendered examples. Content is unchanged.
    missingAssets: images === 'omit' ? 'warn' : 'error',
  });
  // Loader warnings are capped, so they cannot determine which documents need
  // this check. Literal examples and comments remain byte-identical.
  if (images === 'omit') for (const document of source.documents) {
    if (/!\[|<\s*(?:img|picture)\b/i.test(document.markdown) && rewriteMarkdownReferences(document.markdown, { images: 'omit' }) !== document.markdown) {
      throw new Error(`${document.id}: a rendered image remains in an images=omit catalog; normalize it during sync`);
    }
  }
  return source;
}

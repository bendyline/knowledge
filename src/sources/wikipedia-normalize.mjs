import { posix } from 'node:path';
import { normalizeDocument } from '../normalize.mjs';

export async function normalizeWikipediaPage(html, { id, title, date, path, origin }, targets) {
  const normalized = await normalizeDocument(Buffer.from(html), `${id}.html`, {
    images: 'omit',
    rewriteUrl: (url) => {
      if (url.startsWith('#')) return url;
      let absolute;
      try { absolute = new URL(url, `${origin}/wiki/${encodeURIComponent(title.replaceAll(' ', '_'))}`); } catch { return url; }
      let linkedTitle;
      if (absolute.origin === origin && absolute.pathname.startsWith('/wiki/')) {
        try { linkedTitle = decodeURIComponent(absolute.pathname.slice(6)).replaceAll('_', ' '); } catch { /* Retain the original absolute URL. */ }
      }
      const target = targets.get(linkedTitle);
      return target ? `${posix.relative(posix.dirname(path), target)}${absolute.hash}` : absolute.href;
    },
  });
  const heading = date ? `News of the day: ${date}` : title;
  return { ...normalized, markdown: `---\nid: "${id}"\ntitle: ${JSON.stringify(heading)}\n---\n\n# ${heading}\n\n${normalized.markdown}` };
}

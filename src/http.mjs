import { setTimeout } from 'node:timers/promises';

export async function request(url, options = {}) {
  const { maxBytes = 20000000, attempts = 4, fetchImpl = fetch, ...init } = options;
  for (let attempt = 0; attempt < attempts; attempt++) {
    let response;
    try { response = await fetchImpl(url, { ...init, signal: init.signal ?? AbortSignal.timeout(60000) }); }
    catch (error) {
      if (attempt === attempts - 1 || !(error instanceof TypeError || error.name === 'TimeoutError')) throw error;
      await setTimeout(Math.min(30000, 1000 * 2 ** attempt));
      continue;
    }
    if ((response.status === 429 || response.status >= 500) && attempt < attempts - 1) {
      await response.body?.cancel();
      const header = response.headers.get('retry-after');
      const retry = header === null ? NaN : /^\d+$/.test(header) ? Number(header) * 1000 : Date.parse(header) - Date.now();
      await setTimeout(Number.isFinite(retry) ? Math.max(0, retry) : Math.min(30000, 1000 * 2 ** attempt));
      continue;
    }
    if (!response.ok) {
      await response.body?.cancel();
      const error = new Error(`HTTP ${response.status}: ${new URL(url).origin}${new URL(url).pathname}`);
      error.status = response.status;
      throw error;
    }
    if (Number(response.headers.get('content-length')) > maxBytes) { await response.body?.cancel(); throw new Error(`Response exceeds ${maxBytes} bytes`); }
    try {
      const chunks = []; let total = 0;
      for await (const part of response.body ?? []) {
        total += part.length;
        if (total > maxBytes) throw new Error(`Response exceeds ${maxBytes} bytes`);
        chunks.push(part);
      }
      return { response, bytes: Buffer.concat(chunks) };
    } catch (error) {
      // A connection can close after successful headers. Discard partial bytes
      // and retry the entire response; never accept a truncated article.
      if (attempt === attempts - 1 || !(error instanceof TypeError || error.name === 'TimeoutError')) throw error;
      await setTimeout(Math.min(30000, 1000 * 2 ** attempt));
    }
  }
}
export async function getJson(url, options) { return JSON.parse((await request(url, options)).bytes.toString('utf8')); }
export const githubHeaders = (token) => ({ Accept: 'application/vnd.github+json', 'User-Agent': 'bendyline-knowledge/0.1', ...(token ? { Authorization: `Bearer ${token}` } : {}) });
export const githubApi = (path, { token = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN, ...options } = {}) => getJson(`https://api.github.com${path}`, { ...options, headers: { ...githubHeaders(token), ...options.headers } });

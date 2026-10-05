import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { githubApi } from './http.mjs';
import { exists, inside } from './files.mjs';

export async function workingChanges(root, allow) {
  const options = { cwd: root, encoding: 'utf8' };
  const tracked = execFileSync('git', ['diff', '--name-only', '-z', 'HEAD'], options).split('\0');
  const added = execFileSync('git', ['ls-files', '--others', '--exclude-standard', '-z'], options).split('\0');
  const paths = [...new Set([...tracked, ...added].filter(Boolean))].sort();
  for (const path of paths) if (!allow(path)) throw new Error(`Automation would modify an unexpected path: ${path}`);
  return Promise.all(paths.map(async (path) => ({ path, bytes: await exists(inside(root, path)) ? await readFile(inside(root, path)) : null })));
}

export async function proposeChanges({ repository, branch, title, body, changes, baseSha, token = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN, api = githubApi }) {
  if (!branch.startsWith('codex/knowledge-')) throw new Error('PR branches must use the codex/knowledge- automation prefix');
  if (!changes.length) return { changed: false };
  const call = (path, options) => api(path, { token, ...options });
  const post = (path, data, method = 'POST') => call(path, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  const repo = await call(`/repos/${repository}`);
  const base = await call(`/repos/${repository}/git/ref/heads/${encodeURIComponent(repo.default_branch)}`);
  if (base.object.sha !== baseSha) throw new Error('Upstream branch changed while preparing the PR; rerun from its current revision');
  const parent = await call(`/repos/${repository}/git/commits/${baseSha}`);
  const tree = [];
  for (const change of changes) {
    const blob = change.bytes === null ? null : await post(`/repos/${repository}/git/blobs`, { content: change.bytes.toString('base64'), encoding: 'base64' });
    tree.push({ path: change.path, mode: '100644', type: 'blob', sha: blob?.sha ?? null });
  }
  const nextTree = await post(`/repos/${repository}/git/trees`, { base_tree: parent.tree.sha, tree });
  if (nextTree.sha === parent.tree.sha) return { changed: false };
  const commit = await post(`/repos/${repository}/git/commits`, { message: `${title}\n\nManaged by bendyline/knowledge.`, tree: nextTree.sha, parents: [baseSha] });
  let existing;
  try { existing = await call(`/repos/${repository}/git/ref/heads/${encodeURIComponent(branch)}`); } catch (e) { if (e.status !== 404) throw e; }
  if (existing) {
    const head = await call(`/repos/${repository}/git/commits/${existing.object.sha}`);
    if (!head.message.includes('Managed by bendyline/knowledge.')) throw new Error('Automation branch has a human commit; refusing to overwrite it');
    await post(`/repos/${repository}/git/refs/heads/${branch}`, { sha: commit.sha, force: true }, 'PATCH');
  } else await post(`/repos/${repository}/git/refs`, { ref: `refs/heads/${branch}`, sha: commit.sha });
  const prs = await call(`/repos/${repository}/pulls?state=open&head=${encodeURIComponent(repository.split('/')[0] + ':' + branch)}`);
  const pr = prs[0]
    ? await post(`/repos/${repository}/pulls/${prs[0].number}`, { title, body }, 'PATCH')
    : await post(`/repos/${repository}/pulls`, { title, body, head: branch, base: repo.default_branch });
  return { changed: true, url: pr.html_url };
}

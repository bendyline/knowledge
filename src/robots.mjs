// Implements the group selection and longest-path allow/disallow rules used by
// Wikimedia's robots.txt. Only applies to website HTML, not authenticated APIs.
export function robotsPolicy(text, userAgent) {
  const groups = []; let group;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    const match = /^([a-z-]+):\s*(.*)$/i.exec(line);
    if (!match) continue;
    const key = match[1].toLowerCase(); const value = match[2].trim();
    if (key === 'user-agent') {
      if (!group || group.sawDirective) { group = { agents: [], rules: [], sawDirective: false }; groups.push(group); }
      group.agents.push(value.toLowerCase());
    } else if (group) {
      group.sawDirective = true;
      if (['allow', 'disallow'].includes(key) && value) group.rules.push({ allow: key === 'allow', value });
    }
  }
  const product = userAgent.split(/[\s/]/)[0].toLowerCase();
  const score = (g) => Math.max(-1, ...g.agents.map((a) => a === '*' ? 0 : product.startsWith(a.replace(/\*$/, '')) ? a.length : -1));
  const best = Math.max(-1, ...groups.map(score));
  const rules = groups.filter((g) => score(g) === best && best >= 0).flatMap((g) => g.rules).map((r) => {
    const end = r.value.endsWith('$');
    const value = end ? r.value.slice(0, -1) : r.value;
    const pattern = value.split('*').map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.*');
    return { ...r, length: value.replaceAll('*', '').length, pattern: new RegExp(`^${pattern}${end ? '$' : ''}`) };
  });
  return (path) => {
    const matched = rules.filter((r) => r.pattern.test(path)).sort((a, b) => b.length - a.length || Number(b.allow) - Number(a.allow));
    return !matched.length || matched[0].allow;
  };
}

import test from 'node:test';
import assert from 'node:assert/strict';
import { robotsPolicy } from '../src/robots.mjs';
test('robots rules select the matching agent and longest path with allow winning ties', () => {
  const source = 'User-agent: *\nDisallow: /private\nAllow: /private/public\nDisallow: /*?\nDisallow: /same\nAllow: /same\n\nUser-agent: ClosedBot\nDisallow: /\n';
  const allowed = robotsPolicy(source, 'BendylineKnowledge/0.1');
  assert.equal(allowed('/wiki/Article'), true);
  assert.equal(allowed('/private/page'), false);
  assert.equal(allowed('/private/public/page'), true);
  assert.equal(allowed('/wiki/Article?oldid=1'), false);
  assert.equal(allowed('/same'), true);
  assert.equal(robotsPolicy(source, 'ClosedBot/2')('/wiki/Article'), false);
});

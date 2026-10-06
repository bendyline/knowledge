import { portablePath } from './files.mjs';

// CAP page labels include spaces, parentheses, equals signs and unknown-page
// question marks. They are in-memory ZIP keys and URL components; generated
// filesystem documents always use numeric CAP IDs.
export function isCapFileName(value) {
  if (typeof value !== 'string' || !value || value.length > 240 || value.includes('/')) return false;
  try { portablePath(value); return true; } catch { return false; }
}

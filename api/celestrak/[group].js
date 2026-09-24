import celestrakHandler from '../_lib/celestrak.js';

/**
 * Vercel dynamic-route adapter. The client always requests a path segment
 * (`/api/celestrak/active`, `/api/celestrak/stations`, …) — see
 * src/data/satellites.js and src/data/rocketLaunches.js. Vite's
 * `middlewares.use('/api/celestrak', handler)` hands the shared handler a
 * `req.url` with the mount prefix already stripped (e.g. `/active`); Vercel's
 * file-based routing instead gives us the segment via `req.query.group`. This
 * adapter reconstructs the same shape so the shared handler's existing
 * path-parsing logic needs no changes and stays identical on both platforms.
 * @param {import('http').IncomingMessage & { query?: Record<string, unknown> }} req
 * @param {import('http').ServerResponse} res
 */
export default function handler(req, res) {
  const group = Array.isArray(req.query?.group) ? req.query.group[0] : req.query?.group;
  req.url = '/' + (group || '');
  return celestrakHandler(req, res);
}

import assert from 'node:assert/strict';
import { BOOK_SEATS, bookSeatForTexture, bookSymbolForTexture, bookCitation } from '../js/data/book-catalog.js';
import { MANDALA_EDITION, SAIIN_EDITION } from '../js/data/edition.js';
import { drawBookSeat } from '../js/book-drawing.js';
import { byId } from '../js/data/deities.js';
import { kongoLocal, taizoPosition, assemblyEchoes, cellCenter } from '../js/layout.js';

const tests = [];
function test(name, fn) { fn(); tests.push(name); console.log(`PASS ${name}`); }
test('The book is the primary edition; Saiin remains an independent comparison', () => {
  assert.equal(MANDALA_EDITION.id, 'mandala-study-2011');
  assert.equal(MANDALA_EDITION.isbn, '978-7-80253-355-4');
  assert.equal(SAIIN_EDITION.id, 'toji-saiin');
});
test('Every occurrence has a unique ID, finite position, name and book reference', () => {
  for (const [realm, seats] of Object.entries(BOOK_SEATS)) {
    const ids = new Set(), positions = new Set();
    for (const s of seats) {
      assert.equal(s.realm, realm); assert.equal(s.side, realm);
      assert.ok(s.name && !/未辨|待判|候選/.test(s.name), s.seatId);
      assert.ok(!ids.has(s.seatId), `duplicate ${s.seatId}`); ids.add(s.seatId);
      assert.ok(!positions.has(`${s.u},${s.v}`), `overlap ${s.seatId}`); positions.add(`${s.u},${s.v}`);
      for (const field of ['u', 'v', 'w', 'h']) assert.ok(Number.isFinite(s[field]) && s[field] > 0 && s[field] < 1, `${s.seatId}.${field}`);
      assert.ok(s.source && ['上', '下'].includes(s.source.volume), s.seatId);
      assert.ok(Number.isInteger(s.source.page) && s.source.page > 0, `page ${s.seatId}`);
      assert.equal(s.source.pdfPage, s.source.page + (s.source.volume === '上' ? 29 : -347), `PDF offset ${s.seatId}`);
      assert.equal(s.reviewStatus, 'source-checked');
      assert.ok(bookCitation(s).includes(String(s.source.page)));
      if (s.canonicalId) assert.ok(byId[s.canonicalId], `unknown canonical ID ${s.canonicalId}`);
    }
  }
});
test('The Taizo catalogue follows the 209 inner and 203 outer diagram seats', () => {
  assert.equal(BOOK_SEATS.t.length, 412);
  assert.equal(BOOK_SEATS.t.filter(s => s.court === 'gekongobu').length, 203);
  assert.equal(new Set(BOOK_SEATS.t.map(s => s.court)).size, 12);
  assert.equal(BOOK_SEATS.t.filter(s => s.court === 'renge').length, 37);
  assert.equal(BOOK_SEATS.t.filter(s => s.court === 'shaka').length, 39);
});
test('Kongo includes nine assemblies and 1000 individually addressable kalpa seats', () => {
  assert.equal(new Set(BOOK_SEATS.k.map(s => s.assembly)).size, 9);
  assert.equal(BOOK_SEATS.k.length, 1481);
  assert.equal(BOOK_SEATS.k.filter(s => /賢劫千佛/.test(s.name)).length, 1000);
  assert.equal(BOOK_SEATS.k.filter(s => s.assembly === 'sammaya').length, 77);
  assert.equal(BOOK_SEATS.k.filter(s => s.assembly === 'gozanze').length, 81);
  assert.equal(BOOK_SEATS.k.filter(s => s.assembly === 'rishu').length, 17);
});
test('Lookups preserve each assembly and side; unsupported IDs never acquire another deity', () => {
  assert.equal(bookSeatForTexture('unknown|t'), null);
  assert.equal(bookSeatForTexture('center|t')?.realm, 't');
  assert.equal(bookSeatForTexture('center|k')?.assembly, 'jojin');
  assert.equal(bookSymbolForTexture('center|k')?.assembly, 'sammaya');
  assert.equal(bookSymbolForTexture('gozanze|fugen')?.assembly, 'gozanze-s');
  assert.equal(bookSymbolForTexture('center|t'), null);
  for (const s of BOOK_SEATS.k) if (s.canonicalId) assert.equal(bookSeatForTexture(`${s.assembly}|${s.canonicalId}`)?.assembly, s.assembly);
});
test('Book-corrected compass directions also hold in the morphing study', () => {
  const expected = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  ['p-kon', 'p-ho', 'p-hou', 'p-katsu'].forEach((id, i) => {
    const p = kongoLocal(byId[id]);
    const r = Math.hypot(p.x, p.z);
    assert.ok(Math.abs(p.x / r - expected[i][0]) < 1e-10);
    assert.ok(Math.abs(p.z / r - expected[i][1]) < 1e-10);
  });
  const shiin = assemblyEchoes().find(a => a.assembly.key === 'shiin');
  const c = cellCenter(shiin.assembly);
  const corners = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
  ['p-kon', 'p-ho', 'p-hou', 'p-katsu'].forEach((id, i) => {
    const p = shiin.nodes.find(n => n.d.id === id).pos.clone().sub(c);
    assert.deepEqual([Math.sign(p.x), Math.sign(p.z)], corners[i]);
  });
  let previous = -Infinity;
  for (const id of ['daiitoku', 'hannya', 'gozanze-t', 'fudo']) {
    const p = taizoPosition(byId[id]); assert.ok(p.x < 0 && p.z > previous); previous = p.z;
  }
});
function context() {
  let depth = 0, calls = 0;
  const supported = new Set(['beginPath', 'closePath', 'moveTo', 'lineTo', 'stroke', 'fill', 'ellipse', 'arc', 'quadraticCurveTo', 'bezierCurveTo', 'translate', 'scale', 'rotate', 'fillText']);
  const c = new Proxy({ globalAlpha: 1 }, {
    get(target, key) {
      if (key === 'save') return () => { depth++; };
      if (key === 'restore') return () => { assert.ok(depth > 0); depth--; };
      if (key in target) return target[key];
      assert.ok(supported.has(key), `unsupported/raster API ${String(key)}`);
      return (...args) => { for (const a of args) if (typeof a === 'number') assert.ok(Number.isFinite(a), `${key}: ${a}`); calls++; };
    },
    set(target, key, value) { target[key] = value; return true; },
  });
  return { c, check: () => { assert.equal(depth, 0); assert.ok(calls > 0); } };
}
test('All 1893 seats render with finite vector geometry, balanced state and no raster APIs', () => {
  const totals = {};
  for (const s of [...BOOK_SEATS.t, ...BOOK_SEATS.k]) {
    const { c, check } = context(); const result = drawBookSeat(c, s, 100); check();
    totals[result.kind] = (totals[result.kind] || 0) + 1;
  }
  console.log('Drawing coverage:', JSON.stringify(totals));
});
console.log(`${tests.length}/${tests.length} book checks passed.`);

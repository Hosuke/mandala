// Native Node checks; no dependency installation, no source-image decoding.
import assert from 'node:assert/strict';
import test from 'node:test';
import { TAIZO_SEATS } from '../js/data/saiin-taizo.js';
import { KONGO_SEATS } from '../js/data/saiin-kongo.js';
import { MANDALA_EDITION } from '../js/data/edition.js';
import { byId } from '../js/data/deities.js';
import { drawSaiinSeat } from '../js/saiin-drawing.js';

const all = [...TAIZO_SEATS, ...KONGO_SEATS];
test('Saiin review uses distinct, stable occurrence IDs', () => {
  assert.equal(MANDALA_EDITION.id, 'toji-saiin');
  assert.ok(TAIZO_SEATS.length > 0); assert.ok(KONGO_SEATS.length > 0);
  assert.equal(new Set(all.map(s => s.seatId)).size, all.length);
  for (const seat of all) { assert.equal(typeof seat.seatId, 'string'); assert.ok(seat.seatId.length > 0); }
});

test('All positions are finite normalized image coordinates', () => {
  for (const seat of all) {
    for (const key of ['u', 'v', 'w', 'h']) {
      assert.ok(Number.isFinite(seat[key]), `${seat.seatId}.${key} is not finite`);
      assert.ok(seat[key] >= 0 && seat[key] <= 1, `${seat.seatId}.${key} is outside the image`);
    }
    assert.ok(seat.w > 0 && seat.h > 0, `${seat.seatId} has no measured extent`);
  }
});

test('Every source occurrence remains pending human review', () => {
  for (const seat of all) {
    assert.equal(seat.reviewStatus, 'pending', seat.seatId);
    assert.ok(['candidate', 'unidentified', 'group'].includes(seat.identityStatus), seat.seatId);
    assert.ok(!JSON.stringify(seat).includes('"verified"'), `${seat.seatId} silently marked verified`);
    assert.ok(seat.canonicalId === null || typeof seat.canonicalId === 'string', seat.seatId);
    if (seat.canonicalId) {
      assert.ok(byId[seat.canonicalId], `${seat.seatId}: unknown canonical identity`);
      assert.ok(byId[seat.canonicalId][seat.side], `${seat.seatId}: no canonical face on the stated side`);
    }
  }
});

// Regress the explicitly reviewed orientation convention. These comparisons do not
// certify the candidate identities or the accuracy of the measured image centers.
function kongoSeat(assembly, canonicalId) {
  const matches = KONGO_SEATS.filter(s => s.assembly === assembly && s.canonicalId === canonicalId);
  assert.equal(matches.length, 1, `${assembly}/${canonicalId}: expected one candidate occurrence`);
  return matches[0];
}

function above(seat, center) {
  assert.ok(seat.v < center.v, `${seat.seatId}: must be above ${center.seatId} in the source image`);
}
function below(seat, center) {
  assert.ok(seat.v > center.v, `${seat.seatId}: must be below ${center.seatId} in the source image`);
}

test('Kongo image keeps west above, east below, south left and north right', () => {
  const center = kongoSeat('jojin', 'center');
  above(kongoSeat('jojin', 'west'), center);
  below(kongoSeat('jojin', 'east'), center);
  assert.ok(kongoSeat('jojin', 'south').u < center.u, 'southern Buddha must be to image left');
  assert.ok(kongoSeat('jojin', 'north').u > center.u, 'northern Buddha must be to image right');
  const shiin = kongoSeat('shiin', 'center');
  below(kongoSeat('shiin', 'fugen'), shiin);
  above(kongoSeat('shiin', 'kannon'), shiin);
  const rishu = kongoSeat('rishu', 'fugen');
  below(kongoSeat('rishu', 'r-yoku'), rishu);
  above(kongoSeat('rishu', 'r-ai'), rishu);
});

test('Kongo gate candidates keep hook below and chain above in each applicable assembly', () => {
  for (const assembly of ['jojin', 'kuyo', 'gozanze', 'misai', 'sammaya', 'gozanze-s', 'rishu']) {
    const center = kongoSeat(assembly, assembly === 'rishu' ? 'fugen' : 'center');
    below(kongoSeat(assembly, 's-ko'), center);
    above(kongoSeat(assembly, 's-sa'), center);
  }
});

// Fail on unsupported APIs (including drawImage), non-finite geometry and leaking
// Canvas state. This is a drawing-contract check, not an iconographic judgement.
function strictCanvas(label) {
  let state = {
    lineWidth: 1, lineCap: 'butt', lineJoin: 'miter', globalAlpha: 1,
    globalCompositeOperation: 'source-over', strokeStyle: '#000', fillStyle: '#000',
  };
  const stack = [];
  let paths = 0, marks = 0;
  const methods = {
    save() { stack.push({ ...state }); },
    restore() { assert.ok(stack.length > 0, `${label}: unmatched restore()`); state = stack.pop(); },
    beginPath() { paths++; }, closePath() {},
    stroke() { marks++; }, fill() { marks++; },
  };
  const arities = { moveTo: 2, lineTo: 2, quadraticCurveTo: 4, bezierCurveTo: 6,
    translate: 2, rotate: 1, scale: 2, arc: 5, ellipse: 7 };
  for (const [name, arity] of Object.entries(arities)) {
    methods[name] = (...args) => {
      const optionalDirection = name === 'arc' || name === 'ellipse';
      assert.ok(args.length === arity || (optionalDirection && args.length === arity + 1), `${label}: ${name} arity`);
      for (const value of args.slice(0, arity)) assert.ok(Number.isFinite(value), `${label}: ${name} received ${String(value)}`);
      if (args.length > arity) assert.equal(typeof args[arity], 'boolean', `${label}: invalid arc direction`);
      if (optionalDirection) assert.ok(args[2] >= 0, `${label}: negative radius`);
      if (name === 'ellipse') assert.ok(args[3] >= 0, `${label}: negative ellipse radius`);
    };
  }
  const ctx = new Proxy({}, {
    get(_, key) {
      if (Object.hasOwn(methods, key)) return methods[key];
      assert.ok(Object.hasOwn(state, key), `${label}: unsupported Canvas API ${String(key)}`);
      return state[key];
    },
    set(_, key, value) {
      assert.ok(Object.hasOwn(state, key), `${label}: unsupported Canvas property ${String(key)}`);
      if (key === 'lineWidth') assert.ok(Number.isFinite(value) && value > 0, `${label}: invalid lineWidth`);
      if (key === 'globalAlpha') assert.ok(Number.isFinite(value) && value >= 0 && value <= 1, `${label}: invalid globalAlpha`);
      state[key] = value; return true;
    },
  });
  return { ctx, verify(expectMarks) {
    assert.equal(stack.length, 0, `${label}: unbalanced save/restore`);
    assert.equal(paths > 0 && marks > 0, expectMarks, `${label}: unexpected drawing activity`);
  } };
}

test('Every source occurrence draws with finite Canvas arguments and balanced state', () => {
  const outcomes = {};
  for (const seat of all) {
    const stub = strictCanvas(seat.seatId);
    const result = drawSaiinSeat(stub.ctx, seat, 128);
    assert.ok(['reference', 'draft', 'unknown'].includes(result?.kind), `${seat.seatId}: invalid drawing result`);
    assert.equal(typeof result.note, 'string', `${seat.seatId}: missing drawing provenance`);
    assert.ok(result.note.length > 0, `${seat.seatId}: empty drawing provenance`);
    stub.verify(seat.identityStatus !== 'group');
    outcomes[result.kind] = (outcomes[result.kind] || 0) + 1;
  }
  console.log(`Canvas checked ${all.length} records: ${JSON.stringify(outcomes)}; group outlines are drawn by the UI.`);
});

test('Realms and evidence stay attached to the correct scroll', () => {
  for (const [seats, side, evidence] of [[TAIZO_SEATS, 't', 'saiin-taizo-commons'], [KONGO_SEATS, 'k', 'saiin-kongo-commons']]) {
    for (const seat of seats) {
      assert.equal(seat.realm, side, seat.seatId); assert.equal(seat.side, side, seat.seatId);
      assert.equal(seat.evidence, evidence, seat.seatId);
      assert.equal(typeof seat.name, 'string', seat.seatId);
      assert.equal(typeof seat.note, 'string', seat.seatId);
      assert.ok(Array.isArray(seat.observation?.attributes), seat.seatId);
    }
  }
});

test('Group areas are distinct from individual deity seats', () => {
  for (const seat of all.filter(s => s.identityStatus === 'group')) {
    assert.equal(seat.observation.kind, 'group', seat.seatId);
    assert.equal(seat.canonicalId, null, `${seat.seatId}: group must not pretend to be one deity`);
    assert.ok(seat.memberCount == null || (Number.isInteger(seat.memberCount) && seat.memberCount > 0), seat.seatId);
  }
  for (const [realm, seats] of [['taizo', TAIZO_SEATS], ['kongo', KONGO_SEATS]]) {
    const groups = seats.filter(s => s.identityStatus === 'group');
    console.log(`${realm}: ${seats.length - groups.length} individual seat candidates; ${groups.length} group areas (not counted as deities)`);
  }
});

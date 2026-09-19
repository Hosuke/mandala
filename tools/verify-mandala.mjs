// Run with Node.js 22+: node tools/verify-mandala.mjs
// Contract/geometry smoke tests only; these do not certify iconography or visual quality.
import assert from 'node:assert/strict';
import test from 'node:test';
import { DEITIES, byId, FAMILY_ANCHOR } from '../js/data/deities.js';
import {
  BASE37, COURTS, ASSEMBLIES, taizoPosition, kongoLocal, morphTargets,
  assemblyEchoes, taizoEdges, kongoEdges,
} from '../js/layout.js';
import { 落筆, 器筆, figureIdentity, figureStatus } from '../js/funpon.js';
import { 上壇之 } from '../vendor/fenben/dist/baimiao.js';

const faces = DEITIES.flatMap(d => ['t', 'k'].filter(side => d[side]).map(side => ({ d, side })));
const approved = faces.filter(({ d, side }) => 上壇之(d.id, side));
const EPSILON = 1e-9;

function finitePosition(position, label) {
  assert.ok(position, `${label}: missing position`);
  for (const axis of ['x', 'y', 'z']) {
    assert.ok(Number.isFinite(position[axis]), `${label}.${axis}: non-finite coordinate`);
  }
  assert.equal(position.y, 0, `${label}: must remain on the mandala plane`);
}

function assertPosition(position, expected, label) {
  finitePosition(position, label);
  ['x', 'y', 'z'].forEach((axis, index) => {
    assert.ok(Math.abs(position[axis] - expected[index]) < EPSILON,
      `${label}.${axis}: expected ${expected[index]}, got ${position[axis]}`);
  });
}

function uniquePositions(entries, label) {
  for (let i = 0; i < entries.length; i++) {
    const [id, position] = entries[i];
    finitePosition(position, `${label}/${id}`);
    for (let j = 0; j < i; j++) {
      const [otherId, other] = entries[j];
      assert.ok(position.distanceTo(other) > EPSILON, `${label}: ${id} overlaps ${otherId}`);
    }
  }
}

// Deliberately strict: unknown methods (including drawImage) fail rather than silently pass.
// This validates numeric drawing arguments and Canvas state balance, not the rendered shape.
function canvasStub(label) {
  let state = {
    lineWidth: 1, lineCap: 'butt', globalAlpha: 1,
    globalCompositeOperation: 'source-over', strokeStyle: '#000', fillStyle: '#000',
  };
  const stack = [];
  let paths = 0, marks = 0;
  const methods = {
    save() { stack.push({ ...state }); },
    restore() {
      assert.ok(stack.length, `${label}: restore without save`);
      state = stack.pop();
    },
    beginPath() { paths++; },
    closePath() {},
    stroke() { marks++; },
    fill() { marks++; },
  };
  const arities = {
    moveTo: 2, lineTo: 2, quadraticCurveTo: 4, bezierCurveTo: 6,
    translate: 2, rotate: 1, scale: 2, arc: 5, ellipse: 7,
  };
  for (const [name, arity] of Object.entries(arities)) {
    methods[name] = (...args) => {
      assert.ok(args.length === arity ||
        (['arc', 'ellipse'].includes(name) && args.length === arity + 1),
      `${label}: invalid ${name} arguments`);
      args.slice(0, arity).forEach(value => {
        assert.ok(Number.isFinite(value), `${label}: ${name} received ${String(value)}`);
      });
      if (args.length > arity) assert.equal(typeof args[arity], 'boolean', `${label}: arc direction`);
      if (name === 'arc' || name === 'ellipse') assert.ok(args[2] >= 0, `${label}: negative radius`);
      if (name === 'ellipse') assert.ok(args[3] >= 0, `${label}: negative radius`);
    };
  }
  const ctx = new Proxy({}, {
    get(_, key) {
      if (Object.hasOwn(methods, key)) return methods[key];
      assert.ok(Object.hasOwn(state, key), `${label}: unsupported Canvas property ${String(key)}`);
      return state[key];
    },
    set(_, key, value) {
      assert.ok(Object.hasOwn(state, key), `${label}: unsupported Canvas property ${String(key)}`);
      if (key === 'lineWidth') assert.ok(Number.isFinite(value) && value > 0, `${label}: lineWidth`);
      if (key === 'globalAlpha') assert.ok(Number.isFinite(value) && value >= 0 && value <= 1, `${label}: alpha`);
      state[key] = value;
      return true;
    },
  });
  return {
    ctx,
    verify(drawn) {
      assert.equal(stack.length, 0, `${label}: unbalanced save/restore`);
      assert.equal(paths > 0 && marks > 0, drawn, `${label}: unexpected drawing activity`);
    },
  };
}

test('data keeps 87 unique identities, 98 t/k faces and the 37-member base assembly', () => {
  assert.equal(DEITIES.length, 87);
  assert.equal(new Set(DEITIES.map(d => d.id)).size, DEITIES.length);
  assert.equal(faces.length, 98);
  assert.equal(faces.filter(({ side }) => side === 't').length, 53);
  assert.equal(faces.filter(({ side }) => side === 'k').length, 45);
  assert.equal(BASE37.length, 37);
  for (const d of DEITIES) {
    assert.equal(byId[d.id], d);
    assert.ok(byId[FAMILY_ANCHOR[d.family]], `${d.id}: missing family anchor`);
    assert.ok(d.t || d.k, `${d.id}: missing both faces`);
    for (const side of ['t', 'k']) {
      if (!d[side]) continue;
      assert.ok(d[side].zh, `${d.id}|${side}: missing name`);
      assert.equal(typeof d[side].bija, 'string', `${d.id}|${side}: bija must remain a string`);
      if (!d[side].bija) {
        assert.equal(d.bijaPending, true, `${d.id}|${side}: absent bija must be explicitly pending`);
      }
    }
    if (d.t) assert.ok(COURTS.some(c => c.key === d.t.court), `${d.id}: unknown court`);
    if (d.k && !d.k.circle) assert.equal(d.rishuOnly, true, `${d.id}: missing kongo circle`);
  }
  const awaitingBija = DEITIES.filter(d => d.bijaPending);
  assert.deepEqual(awaitingBija.map(d => d.id).sort(),
    ['r-yoku-nyo', 'r-soku-nyo', 'r-ai-nyo', 'r-man-nyo'].sort());
  for (const d of awaitingBija) {
    assert.equal(d.rishuOnly, true, `${d.id}: must remain exclusive to rishu`);
    assert.equal(d.k.bija, '', `${d.id}: pending bija must not borrow another deity's syllable`);
  }
});

test('both projections have finite, distinct seats; missing sides use valid morph anchors', () => {
  uniquePositions(DEITIES.filter(d => d.t).map(d => [d.id, taizoPosition(d)]), 'taizo');
  uniquePositions(BASE37.map(d => [d.id, kongoLocal(d)]), 'kongo');
  for (const d of DEITIES) {
    const targets = morphTargets(d);
    finitePosition(targets.posT, `${d.id}/morphT`);
    finitePosition(targets.posK, `${d.id}/morphK`);
    assert.equal(targets.hasT, !!d.t);
    assert.equal(targets.hasK, !!d.k?.circle);
    if (!d.t) assert.equal(taizoPosition(d), null);
    if (!d.k?.circle) assert.equal(kongoLocal(d), null);
  }
});

test('the eight directional devas keep E/SE/S/SW/W/NW/N/NE seats', () => {
  const seats = {
    taishaku: [34, 0, 0], katen: [24.041630560342615, 0, 24.041630560342615],
    emma: [0, 0, 34], rasetsu: [-24.041630560342615, 0, 24.041630560342615],
    suiten: [-34, 0, 0], futen: [-24.041630560342615, 0, -24.041630560342615],
    bishamon: [0, 0, -34], ishana: [24.041630560342615, 0, -24.041630560342615],
  };
  for (const [id, position] of Object.entries(seats)) assertPosition(taizoPosition(byId[id]), position, id);
  // Brahma, earth, sun and moon use illustrative gaps; these are not certified compass seats.
});

test('the sixteen attendants occupy front, right, left and rear seats around their lords', () => {
  // Literal world coordinates: east=+x, south=+z. A lord faces the mandala centre.
  // Keep expectations independent of kongoLocal's angle formula.
  const seats = {
    fugen: [4.6, 0, 0], 'k-o': [7.2, 0, -2.6], 'k-ai': [7.2, 0, 2.6], 'k-ki': [9.8, 0, 0],
    kokuzo: [0, 0, 4.6], 'k-ko': [2.6, 0, 7.2], 'k-do': [-2.6, 0, 7.2], 'k-sho': [0, 0, 9.8],
    kannon: [-4.6, 0, 0], monju: [-7.2, 0, 2.6], miroku: [-7.2, 0, -2.6], 'k-go': [-9.8, 0, 0],
    'k-gyo': [0, 0, -4.6], 'k-gou': [-2.6, 0, -7.2], 'k-ge': [2.6, 0, -7.2], 'k-ken': [0, 0, -9.8],
  };
  for (const [id, position] of Object.entries(seats)) assertPosition(kongoLocal(byId[id]), position, id);
});

test('the eight offerings follow SE/SW/NW/NE; the four gates follow E/S/W/N', () => {
  const seats = {
    'g-ki': [4.9384337598068475, 0, 4.9384337598068475],
    'g-man': [-4.9384337598068475, 0, 4.9384337598068475],
    'g-ka': [-4.9384337598068475, 0, -4.9384337598068475],
    'g-bu': [4.9384337598068475, 0, -4.9384337598068475],
    'g-ko': [8.24769349575989, 0, 8.24769349575989],
    'g-ke': [-8.24769349575989, 0, 8.24769349575989],
    'g-to': [-8.24769349575989, 0, -8.24769349575989],
    'g-zu': [8.24769349575989, 0, -8.24769349575989],
    's-ko': [12.816, 0, 0], 's-saku': [0, 0, 12.816],
    's-sa': [-12.816, 0, 0], 's-rei': [0, 0, -12.816],
  };
  for (const [id, position] of Object.entries(seats)) assertPosition(kongoLocal(byId[id]), position, id);
});

test('rishu and shiin keep their cardinal deities and diagonal companions in the intended seats', () => {
  const echoes = assemblyEchoes();
  const seats = {
    rishu: {
      fugen: [30, 0, -30],
      'r-yoku': [35.814, 0, -30], 'r-soku': [30, 0, -24.186],
      'r-ai': [24.186, 0, -30], 'r-man': [30, 0, -35.814],
      'r-yoku-nyo': [34.111118825818587, 0, -25.888881174181413],
      'r-soku-nyo': [25.888881174181413, 0, -25.888881174181413],
      'r-ai-nyo': [25.888881174181413, 0, -34.111118825818587],
      'r-man-nyo': [34.111118825818587, 0, -34.111118825818587],
      'g-ki': [37.49674609413978, 0, -22.503253905860222],
      'g-man': [22.503253905860222, 0, -22.503253905860222],
      'g-ka': [22.503253905860222, 0, -37.49674609413978],
      'g-bu': [37.49674609413978, 0, -37.49674609413978],
      's-ko': [40.602, 0, -30], 's-saku': [30, 0, -19.398],
      's-sa': [19.398, 0, -30], 's-rei': [30, 0, -40.602],
    },
    shiin: {
      center: [-30, 0, -30],
      fugen: [-23.16, 0, -30], kokuzo: [-30, 0, -23.16],
      kannon: [-36.84, 0, -30], 'k-gyo': [-30, 0, -36.84],
      'g-ki': [-23.126922086866758, 0, -23.126922086866758],
      'g-man': [-36.873077913133244, 0, -23.126922086866758],
      'g-ka': [-36.873077913133244, 0, -36.873077913133244],
      'g-bu': [-23.126922086866758, 0, -36.873077913133244],
    },
  };
  for (const [key, expected] of Object.entries(seats)) {
    const { nodes } = echoes.find(e => e.assembly.key === key);
    for (const [id, position] of Object.entries(expected)) {
      assertPosition(nodes.find(n => n.d.id === id).pos, position, `${key}/${id}`);
    }
  }
});

test('the eight echo assemblies retain their casts and distinct seats', () => {
  const echoes = assemblyEchoes();
  assert.equal(echoes.length, 8);
  assert.equal(echoes.find(e => e.assembly.key === 'rishu').nodes.length, 17);
  const shiin = echoes.find(e => e.assembly.key === 'shiin');
  assert.equal(shiin.nodes.length, 13);
  const instruments = ['p-kon', 'p-ho', 'p-hou', 'p-katsu', 'g-ki', 'g-man', 'g-ka', 'g-bu'];
  assert.deepEqual(shiin.nodes.filter(n => n.display?.form === 'samaya').map(n => n.d.id), instruments);
  assert.equal(shiin.nodes.filter(n => (n.display?.form ?? shiin.assembly.form) === 'figure').length, 5);
  assert.deepEqual(echoes.map(e => e.assembly.key), ASSEMBLIES.filter(a => a.key !== 'jojin').map(a => a.key));
  for (const { assembly, nodes } of echoes) {
    assert.equal(nodes.length, assembly.cast === 'rishu' ? 17 : (assembly.subset?.length ?? 37));
    uniquePositions(nodes.map(n => [n.d.id, n.pos]), assembly.key);
    for (const { d } of nodes) assert.equal(byId[d.id], d);
  }
  for (const [a, b] of [...taizoEdges(), ...kongoEdges()]) {
    assert.ok(byId[a] && byId[b], `edge ${a}/${b}: unknown deity`);
    assert.notEqual(a, b, `edge ${a}/${b}: self-link`);
  }
});

test('figure identities preserve their side and substitute gozanze independently of its seat', () => {
  assert.deepEqual(figureIdentity('fugen|t'), { id: 'fugen', side: 't' });
  assert.deepEqual(figureIdentity('fugen|k'), { id: 'fugen', side: 'k' });
  assert.deepEqual(figureIdentity('rishu|fugen'), { id: 'fugen', side: 'k' });
  for (const assembly of ['gozanze', 'gozanze-s']) {
    assert.deepEqual(figureIdentity(`${assembly}|fugen`), { id: 'gozanze', side: 'k' });
    assert.deepEqual(figureIdentity(`${assembly}|center`), { id: 'center', side: 'k' });
  }
  assert.equal(figureIdentity('unknown'), null);
  assert.equal(faces.filter(({ d, side }) => figureStatus(d.id, side) === 'verified').length, 44);
  for (const { d, side } of approved) assert.equal(figureStatus(d.id, side), 'verified');
  assert.equal(figureStatus('henchi', 't'), 'symbol');
  assert.equal(figureStatus('miroku', 't'), 'pending');
  assert.equal(figureStatus('k-go', 'k'), 'pending');
  assert.equal(figureStatus('fudo', 't'), 'missing');
  assert.equal(figureStatus('k-ken', 't'), 'missing'); // Same ID's verified k-side cannot stand in.
  assert.notEqual(figureStatus('gozanze', 'k'), 'verified');
});

test('all 44 approved faces draw; the 54 unapproved faces do not acquire a substitute figure', () => {
  assert.equal(approved.length, 44);
  assert.equal(faces.length - approved.length, 54);
  assert.equal(approved.filter(({ side }) => side === 't').length, 8);
  assert.equal(approved.filter(({ side }) => side === 'k').length, 36);
  for (const { d, side } of faces) {
    const allowed = !!上壇之(d.id, side);
    const stub = canvasStub(`${d.id}|${side}`);
    assert.equal(落筆(stub.ctx, 128, d.id, side), allowed, `${d.id}|${side}: approval gate`);
    stub.verify(allowed);
  }
  const stub = canvasStub('unknown figure');
  assert.equal(落筆(stub.ctx, 128, 'unknown', 't'), false);
  stub.verify(false);
});

test('all 37 base-assembly instruments draw through the public samaya API', () => {
  for (const d of BASE37) {
    const stub = canvasStub(`${d.id}/samaya`);
    assert.equal(器筆(stub.ctx, 128, d.id), true, `${d.id}: missing instrument`);
    stub.verify(true);
  }
  const stub = canvasStub('unknown instrument');
  assert.equal(器筆(stub.ctx, 128, 'unknown'), false);
  stub.verify(false);
});

// Run with Node.js 22+: node tools/export-seat-audit.mjs > /tmp/mandala-seat-audit.json
// Export current engine occurrences for human review; this is not a complete Saiin roster.
import assert from 'node:assert/strict';
import { DEITIES } from '../js/data/deities.js';
import { MANDALA_EDITION } from '../js/data/edition.js';
import {
  BASE37, COURTS, ASSEMBLIES, taizoPosition, kongoLocal, cellCenter, assemblyEchoes,
} from '../js/layout.js';
import { figureIdentity, figureStatus } from '../js/funpon.js';

const seats = [];
const courtByKey = Object.fromEntries(COURTS.map(court => [court.key, court]));
const occurrenceCounts = new Map();

function addSeat({ d, side, court = null, assembly = null, position, display = null }) {
  const location = court ?? assembly;
  const groupKey = `${side}:${location.key}`;
  const occurrence = (occurrenceCounts.get(groupKey) ?? 0) + 1;
  occurrenceCounts.set(groupKey, occurrence);
  const seatKey = `${groupKey}:${String(occurrence).padStart(3, '0')}`;
  const interactive = side === 't' || assembly.key === 'jojin';
  const textureId = interactive ? `${d.id}|${side}` : `${assembly.key}|${d.id}`;
  const identity = figureIdentity(textureId);
  const face = d[side];
  assert.ok(identity, `${seatKey}: missing figure identity`);
  assert.ok(position, `${seatKey}: missing engine position`);
  for (const axis of ['x', 'y', 'z']) {
    assert.ok(Number.isFinite(position[axis]), `${seatKey}: invalid ${axis} coordinate`);
  }
  seats.push({
    seatKey,
    editionId: MANDALA_EDITION.id,
    realm: side === 't' ? { key: 't', zh: '胎藏界' } : { key: 'k', zh: '金剛界' },
    court: court ? { key: court.key, zh: court.zh } : null,
    assembly: assembly ? { key: assembly.key, zh: assembly.zh } : null,
    engineOccurrence: occurrence,
    engineRecordId: d.id,
    deityId: identity.id,
    deitySide: identity.side,
    name: { zh: display?.zh ?? face.zh, sk: display?.sk ?? face.sk },
    bija: display?.bija ?? face.bija,
    family: d.family,
    engineCircle: face.circle ?? null,
    engineSlot: face.slot ?? null,
    form: interactive ? 'bija' : (display?.form ?? assembly.form),
    formMode: interactive ? 'interactive' : 'fixed',
    funponStatus: figureStatus(identity.id, identity.side),
    enginePosition: { basis: 'engine-topology', x: position.x, y: position.y, z: position.z },
    sourceSeat: null,
    sourcePosition: null,
    identityEvidence: null,
    positionEvidence: null,
    reviewStatus: 'pending',
  });
}

for (const d of DEITIES) {
  if (d.t) addSeat({ d, side: 't', court: courtByKey[d.t.court], position: taizoPosition(d) });
}

const jojin = ASSEMBLIES.find(assembly => assembly.key === 'jojin');
assert.ok(jojin, 'Missing base assembly');
for (const d of BASE37) {
  addSeat({ d, side: 'k', assembly: jojin, position: kongoLocal(d).add(cellCenter(jojin)) });
}
for (const { assembly, nodes } of assemblyEchoes()) {
  for (const { d, pos, display } of nodes) {
    addSeat({ d, side: 'k', assembly, position: pos, display });
  }
}

assert.equal(new Set(seats.map(seat => seat.seatKey)).size, seats.length, 'Duplicate occurrence key');

const countRealm = side => seats.filter(seat => seat.realm.key === side).length;
const output = {
  schemaVersion: 1,
  purpose: '現有表示席位之逐席覆核交接表；並非西院本完整尊名表。',
  edition: { id: MANDALA_EDITION.id, catalogueUrl: MANDALA_EDITION.catalogueUrl },
  scope: {
    roster: 'current-engine-occurrences-only',
    seatKey: 'Engine occurrence key, not a source seat number; identical deities in different seats remain separate.',
    position: 'Engine topology only, not coordinates measured from the Saiin Mandala. East=+x, south=+z; y is height.',
    form: 'Interactive seats show the initial bija mode; the other eight assemblies retain their fixed display forms.',
    funponStatus: 'Existing drawing gate only; verified does not certify identity, form or position against the Saiin Mandala.',
    review: 'All source seats, coordinates and evidence await human review; null is not a verified absence.',
  },
  counts: {
    total: seats.length,
    taizo: countRealm('t'),
    kongo: countRealm('k'),
    assemblies: Object.fromEntries(ASSEMBLIES.map(assembly => [assembly.key,
      seats.filter(seat => seat.assembly?.key === assembly.key).length])),
  },
  seats,
};

process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);

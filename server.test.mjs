import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { after, test } from 'node:test';

const carpeta = fs.mkdtempSync(path.join(os.tmpdir(), 'zaynix-web-'));
process.env.DATOS = carpeta;
process.env.RAILWAY_PROJECT_ID = 'prueba';
const { servidor } = await import('./server.mjs');
const { MeGusta, ipDe } = await import('./me-gusta.mjs');
await new Promise((listo) => servidor.listen(0, '127.0.0.1', listo));
const base = `http://127.0.0.1:${servidor.address().port}`;

after(() => {
  servidor.close();
  servidor.closeAllConnections();
  fs.rmSync(carpeta, { recursive: true, force: true });
});

const pedir = (ip, opciones = {}) =>
  fetch(`${base}/api/me-gusta`, { ...opciones, headers: { ...(ip && { 'X-Real-IP': ip }), ...opciones.headers } });
const marcar = (ip, origen = base) => pedir(ip, { method: 'POST', headers: { Origin: origen } });

test('cuenta una sola vez por IP', async () => {
  assert.deepEqual(await (await pedir('203.0.113.1')).json(), { total: 0, marcado: false });
  await marcar('203.0.113.1');
  assert.deepEqual(await (await marcar('203.0.113.1')).json(), { total: 1, marcado: true });
  assert.deepEqual(await (await marcar('203.0.113.2')).json(), { total: 2, marcado: true });
  assert.deepEqual(await (await pedir('203.0.113.3')).json(), { total: 2, marcado: false });
});

test('en IPv6 cuenta por red', async () => {
  const antes = (await (await marcar('2001:db8:1:2::1')).json()).total;
  assert.equal((await (await marcar('2001:0db8:1:2:ffff::9')).json()).total, antes);
  assert.equal((await (await marcar('2001:db8:1:3::1')).json()).total, antes + 1);
});

test('rechaza otros sitios, otros métodos y peticiones sin IP', async () => {
  assert.equal((await marcar('203.0.113.9', 'https://otro.example')).status, 403);
  assert.equal((await pedir('203.0.113.9', { method: 'POST' })).status, 403);
  assert.equal((await pedir('203.0.113.9', { method: 'DELETE' })).status, 405);
  assert.equal((await pedir(null)).status, 503);
  assert.equal((await pedir('no-es-ip')).status, 503);
});

test('no guarda la IP y conserva los votos al reiniciar', () => {
  assert.ok(!fs.readFileSync(path.join(carpeta, 'me-gusta.txt'), 'utf8').includes('203.0.113'));
  const otro = new MeGusta(carpeta);
  assert.ok(otro.estado('203.0.113.1').marcado);
  fs.appendFileSync(path.join(carpeta, 'me-gusta.txt'), 'abc');
  otro.marcar('198.51.100.7');
  assert.ok(new MeGusta(carpeta).estado('198.51.100.7').marcado);
});

test('fuera de Railway no cree en la cabecera', () => {
  const req = { headers: { 'x-real-ip': '203.0.113.1' }, socket: { remoteAddress: '::ffff:127.0.0.1' } };
  assert.equal(ipDe(req, false), '127.0.0.1');
});

import crypto from 'node:crypto';
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';

export function ipDe(req, enRailway) {
  const ip = enRailway ? req.headers['x-real-ip'] : req.socket.remoteAddress;
  if (typeof ip !== 'string') return null;
  const limpia = ip.trim().replace(/^::ffff:(?=\d+\.)/i, '');
  if (net.isIPv4(limpia)) return limpia;
  return net.isIPv6(limpia) ? redIPv6(limpia) : null;
}

function redIPv6(ip) {
  const [inicio, fin] = ip.split('%')[0].toLowerCase().split('::');
  const a = inicio ? inicio.split(':') : [];
  const b = fin ? fin.split(':') : [];
  const grupos = fin === undefined ? a : [...a, ...Array(Math.max(0, 8 - a.length - b.length)).fill('0'), ...b];
  const red = grupos.slice(0, 4).map((g) => parseInt(g, 16).toString(16));
  return `${red.join(':')}::/64`;
}

export class MeGusta {
  constructor(carpeta) {
    fs.mkdirSync(carpeta, { recursive: true });
    this.archivo = path.join(carpeta, 'me-gusta.txt');
    const clave = path.join(carpeta, 'clave');
    if (!fs.existsSync(clave)) fs.writeFileSync(clave, crypto.randomBytes(32).toString('hex'), { mode: 0o600 });
    this.clave = fs.readFileSync(clave, 'utf8').trim();
    if (!/^[0-9a-f]{64}$/.test(this.clave)) throw new Error('La clave de los me gusta no es válida');
    const lineas = fs.existsSync(this.archivo) ? fs.readFileSync(this.archivo, 'utf8').split('\n') : [];
    this.votos = new Set(lineas.filter((l) => /^[0-9a-f]{64}$/.test(l)));
  }

  codigo(ip) {
    return crypto.createHmac('sha256', this.clave).update(ip).digest('hex');
  }

  estado(ip) {
    return { total: this.votos.size, marcado: this.votos.has(this.codigo(ip)) };
  }

  marcar(ip) {
    const codigo = this.codigo(ip);
    if (!this.votos.has(codigo)) {
      fs.appendFileSync(this.archivo, `\n${codigo}\n`);
      this.votos.add(codigo);
    }
    return this.estado(ip);
  }
}

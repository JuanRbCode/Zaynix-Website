import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PUERTO = Number(process.env.PORT) || 3000;
const RAIZ = path.resolve('dist/Zaynix-Website/browser');
const REPO = process.env.ZAYNIX_REPO || 'JuanRbCode/Zaynix';
const CACHE_MS = 10 * 60 * 1000;

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

function respaldo() {
  try {
    return JSON.parse(fs.readFileSync(path.join(RAIZ, 'version.json'), 'utf8').replace(/^﻿/, ''));
  } catch {
    return { version: '0.0.0', descarga: `https://github.com/${REPO}/releases/latest` };
  }
}

function resumir(cuerpo = '') {
  const puntos = cuerpo
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.startsWith('- '))
    .map((l) => l.slice(2).replace(/\*\*/g, ''));
  return puntos.slice(0, 3).join(' · ');
}

let cache = { momento: 0, datos: null };

async function ultimaVersion() {
  if (cache.datos && Date.now() - cache.momento < CACHE_MS) return cache.datos;
  try {
    const cabeceras = { 'User-Agent': 'zaynix-website', Accept: 'application/vnd.github+json' };
    if (process.env.GITHUB_TOKEN) cabeceras.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const r = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, { headers: cabeceras });
    if (!r.ok) throw new Error(`GitHub respondió ${r.status}`);
    const rel = await r.json();
    const instalador = rel.assets.find((a) => /^ZaynixSetup.*\.exe$/i.test(a.name));
    const hash = (rel.body || '').match(/\b[a-f0-9]{64}\b/i);
    cache = {
      momento: Date.now(),
      datos: {
        version: rel.tag_name.replace(/^v/, ''),
        fecha: (rel.published_at || '').slice(0, 10),
        descarga: instalador?.browser_download_url || rel.html_url,
        archivo: instalador?.name || null,
        tamano: instalador?.size || null,
        sha256: hash ? hash[0].toLowerCase() : null,
        notas: resumir(rel.body),
        pagina: rel.html_url,
      },
    };
  } catch (error) {
    console.error('API de GitHub no disponible:', error.message);
    const porRedireccion = await versionPorRedireccion();
    if (porRedireccion) {
      cache = { momento: Date.now(), datos: porRedireccion };
    } else if (!cache.datos) {
      return respaldo();
    }
  }
  return cache.datos;
}

async function versionPorRedireccion() {
  try {
    const r = await fetch(`https://github.com/${REPO}/releases/latest`, {
      method: 'HEAD',
      redirect: 'follow',
      headers: { 'User-Agent': 'zaynix-website' },
    });
    const etiqueta = r.url.match(/\/releases\/tag\/(v?[\w.-]+)$/)?.[1];
    if (!etiqueta) return null;
    const version = etiqueta.replace(/^v/, '');
    return {
      version,
      descarga: `https://github.com/${REPO}/releases/download/${etiqueta}/ZaynixSetup-${version}.exe`,
      archivo: `ZaynixSetup-${version}.exe`,
      pagina: r.url,
    };
  } catch (error) {
    console.error('Tampoco se pudo leer la redirección:', error.message);
    return null;
  }
}

function enviarArchivo(res, ruta) {
  const tipo = TIPOS[path.extname(ruta).toLowerCase()] || 'application/octet-stream';
  const inmutable = /-[A-Z0-9]{8}\.(js|css)$/.test(ruta);
  res.writeHead(200, {
    'Content-Type': tipo,
    'Cache-Control': inmutable ? 'public, max-age=31536000, immutable' : 'no-cache',
    'X-Content-Type-Options': 'nosniff',
  });
  fs.createReadStream(ruta).pipe(res);
}

const servidor = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname === '/version.json') {
    const datos = await ultimaVersion();
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
    });
    return res.end(JSON.stringify(datos));
  }

  if (url.pathname === '/descargar') {
    const datos = await ultimaVersion();
    res.writeHead(302, { Location: datos.descarga, 'Cache-Control': 'no-store' });
    return res.end();
  }

  if (url.pathname === '/salud') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('ok');
  }

  const pedido = path.normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, '');
  const ruta = path.join(RAIZ, pedido);
  if (ruta.startsWith(RAIZ) && fs.existsSync(ruta) && fs.statSync(ruta).isFile()) {
    return enviarArchivo(res, ruta);
  }
  enviarArchivo(res, path.join(RAIZ, 'index.html'));
});

servidor.listen(PUERTO, () => console.log(`Zaynix Website en el puerto ${PUERTO}`));

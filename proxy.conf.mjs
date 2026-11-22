import { servidor } from './server.mjs';

await new Promise((listo, error) => servidor.once('error', error).listen(0, '127.0.0.1', listo));
servidor.unref();

const destino = { target: `http://127.0.0.1:${servidor.address().port}`, changeOrigin: false };

export default { '/descargar': destino, '/version.json': destino, '/api': destino };

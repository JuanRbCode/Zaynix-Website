# Zaynix Website

Sitio web oficial de [Zaynix](https://github.com/JuanRbCode/Zaynix), hecho con Angular.

## Desarrollo

```powershell
npm install
npm run dev        # http://localhost:4200
npm test -- --watch=false
npm run test:servidor
```

## Producción (Railway)

Railway ejecuta automáticamente:

```
npm install
npm run build
npm start          # node server.mjs en $PORT
```

## Cómo se publica una versión nueva (automático)

1. En el repo Zaynix se hace push a `main` con una `VERSION` nueva.
2. GitHub Actions compila el instalador y crea el Release `vX.Y.Z`.
3. `server.mjs` consulta el último Release de GitHub (caché de 10 minutos), así que en menos de 10 minutos:
   - `/descargar` redirige al instalador nuevo.
   - `/version.json` informa la versión nueva y las apps instaladas muestran el aviso.

No hay que tocar nada en este repositorio. `public/version.json` solo se usa si GitHub no responde.

## Me gusta

`/api/me-gusta` cuenta un voto por IP (en IPv6, por red /64). Guarda un HMAC, nunca la IP. En Railway necesita un volumen: usa `RAILWAY_VOLUME_MOUNT_PATH`. Sin volumen la sección no se muestra. En local guarda en `.datos`.

## Variables opcionales en Railway

- `GITHUB_TOKEN`: token de solo lectura para no depender del límite público de la API de GitHub (permite mostrar tamaño, notas y SHA-256).
- `ZAYNIX_REPO`: repositorio de la app (por defecto `JuanRbCode/Zaynix`).

## Ramas

- `main`: lo que está publicado en Railway.
- `develop`: cambios en curso.

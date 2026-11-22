# Zaynix Website

Sitio web oficial de [Zaynix](https://github.com/JuanRbCode/Zaynix), hecho con Angular.

## Desarrollo

```powershell
npm install
npm run dev        # http://localhost:4200
npm test -- --watch=false
```

## Producción (Railway)

Railway ejecuta automáticamente:

```
npm install
npm run build
npm start          # node server.mjs en $PORT
```

## Publicar una nueva versión de la app

La app de escritorio consulta `https://<dominio>/version.json` cada 6 horas. Al publicar una versión:

1. Sube el instalador al Release de GitHub de Zaynix.
2. Actualiza `public/version.json`:

```json
{
  "version": "0.8.0",
  "fecha": "2026-12-01",
  "descarga": "https://github.com/JuanRbCode/Zaynix/releases/latest",
  "notas": "Resumen corto de las novedades."
}
```

3. Haz push a `main`. Railway vuelve a desplegar y todas las apps instaladas verán el aviso.

## Ramas

- `main`: lo que está publicado en Railway.
- `develop`: cambios en curso.

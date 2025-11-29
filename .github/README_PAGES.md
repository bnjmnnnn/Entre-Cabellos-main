# GitHub Pages Deployment

Este documento explica cómo funciona el despliegue automático del sitio a GitHub Pages.

## ¿Cómo funciona?

El workflow de GitHub Actions en `.github/workflows/deploy-pages.yml` se encarga de:

1. **Detectar cambios**: Se ejecuta automáticamente cuando se hacen push a la rama `main`, o se puede ejecutar manualmente desde la pestaña "Actions" en GitHub.

2. **Construir el sitio**: Instala las dependencias del proyecto con `npm ci` y ejecuta `npm run build` para generar los archivos estáticos de Next.js.

3. **Desplegar**: Sube el contenido de la carpeta `./out` (generada por Next.js en modo estático) a GitHub Pages.

## Carpeta publicada

- **Carpeta de salida**: `./out`
- **Tipo de proyecto**: Next.js con exportación estática (`output: 'export'`)

## ¿Cómo cambiar la configuración?

### Cambiar la rama de despliegue

Para cambiar la rama que activa el despliegue, edita el archivo `.github/workflows/deploy-pages.yml` y modifica la sección:

```yaml
on:
  push:
    branches: ["main"]  # Cambia "main" por tu rama preferida
```

### Cambiar la carpeta de salida

La carpeta de salida está configurada por Next.js. Si necesitas cambiarla, modifica `next.config.mjs`:

```js
const nextConfig = {
  output: 'export',
  distDir: 'custom-out-folder', // Cambia el nombre de la carpeta de salida
  // ...
}
```

Y actualiza el workflow en consecuencia.

### Configurar un basePath (subpath)

Si tu sitio se despliega en una subruta (por ejemplo, `https://usuario.github.io/nombre-repo/`), descomenta y ajusta la línea `basePath` en `next.config.mjs`:

```js
const nextConfig = {
  output: 'export',
  basePath: '/Entre-Cabellos-main', // Ajusta según el nombre de tu repositorio
  // ...
}
```

## Requisitos previos

1. **Habilitar GitHub Pages**: Ve a Settings > Pages en tu repositorio y selecciona "GitHub Actions" como fuente de despliegue.

2. **Permisos**: El workflow tiene los permisos necesarios configurados (`pages: write`, `id-token: write`, `contents: read`).

## Archivo .nojekyll

Se incluye un archivo `.nojekyll` vacío en la carpeta `public/` que se copia al directorio de salida. Esto evita que GitHub Pages procese los archivos con Jekyll, lo cual podría causar problemas con archivos que comienzan con guión bajo (`_`).

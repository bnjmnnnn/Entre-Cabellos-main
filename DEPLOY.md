# 🚀 Guía de Deploy - Entre Cabellos

## Plataformas Recomendadas

### 1. Vercel (Recomendado para Next.js)

#### Opción A: Deploy desde GitHub

1. Ve a [vercel.com](https://vercel.com)
2. Click en "Add New Project"
3. Conecta tu repositorio de GitHub
4. Selecciona el repositorio `Entre-Cabellos-main`
5. Configura las variables de entorno (ver abajo)
6. Click en "Deploy"

#### Opción B: Deploy desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### 2. Netlify

1. Ve a [netlify.com](https://netlify.com)
2. Click en "Add new site" → "Import an existing project"
3. Conecta tu repositorio de GitHub
4. Configuración de build:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Agrega las variables de entorno
6. Click en "Deploy site"

### 3. Railway

1. Ve a [railway.app](https://railway.app)
2. Click en "New Project" → "Deploy from GitHub repo"
3. Selecciona tu repositorio
4. Railway detectará automáticamente que es Next.js
5. Agrega las variables de entorno
6. Deploy automático

## ⚙️ Variables de Entorno Requeridas

Debes configurar estas variables en tu plataforma de deploy:

```env
NEXT_PUBLIC_BASE_URL=https://tu-dominio.com
WEBPAY_URL=https://webpay3gint.transbank.cl
WEBPAY_COMMERCE_CODE=597055555532
WEBPAY_API_KEY=579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C
```

### En Vercel:
1. Ve a tu proyecto → Settings → Environment Variables
2. Agrega cada variable con su valor
3. Asegúrate de seleccionar "Production", "Preview" y "Development"
4. Click en "Save"

### En Netlify:
1. Ve a Site settings → Environment variables
2. Click en "Add a variable"
3. Agrega cada variable
4. Click en "Save"

## 🔧 Solución de Problemas Comunes

### Error: "Build failed"

**Causa**: Errores de TypeScript o dependencias faltantes

**Solución**:
```bash
# Verifica que el build funcione localmente
npm run build

# Si hay errores, corrígelos antes de hacer deploy
```

### Error: "Module not found"

**Causa**: Dependencias no instaladas correctamente

**Solución**:
```bash
# Elimina node_modules y reinstala
rm -rf node_modules
npm install

# Verifica que package-lock.json esté en el repo
git add package-lock.json
git commit -m "Add package-lock.json"
git push
```

### Error: "Failed to load environment variables"

**Causa**: Variables de entorno no configuradas

**Solución**:
1. Verifica que todas las variables estén en la plataforma
2. Asegúrate de que los nombres sean exactos (case-sensitive)
3. Re-deploya después de agregar las variables

### Error: "Cannot connect to database"

**Causa**: No tienes base de datos configurada todavía

**Solución**:
Por ahora el sistema funciona sin base de datos. Para producción, deberás:
1. Configurar una base de datos (PostgreSQL, MongoDB, etc.)
2. Agregar las variables de conexión
3. Actualizar el código para guardar transacciones

### Página en blanco o error 404

**Causa**: Configuración incorrecta de rutas

**Solución**:
1. Verifica que `NEXT_PUBLIC_BASE_URL` esté configurada correctamente
2. Asegúrate de que apunte a tu dominio real (sin / al final)
3. Re-deploya

## 📝 Checklist Pre-Deploy

- [ ] El proyecto compila sin errores localmente (`npm run build`)
- [ ] Todas las variables de entorno están configuradas
- [ ] El archivo `.env.local` NO está en el repositorio
- [ ] Has hecho push de todos los cambios a GitHub
- [ ] Has probado el flujo de pago localmente
- [ ] Has configurado tu dominio personalizado (opcional)

## 🌐 Después del Deploy

1. **Prueba tu sitio**: Visita la URL que te dio tu plataforma
2. **Prueba el carrito**: Agrega productos y verifica que funcione
3. **Prueba WebPay**: Haz una compra de prueba con la tarjeta de test
4. **Configura dominio**: Si tienes uno, configúralo en la plataforma
5. **SSL**: Verifica que tu sitio tenga HTTPS (automático en Vercel/Netlify)

## 🔐 Producción Real

Para usar en producción con pagos reales:

1. **Obtén credenciales de producción** de Transbank
2. **Actualiza las variables de entorno**:
   ```env
   WEBPAY_URL=https://webpay3g.transbank.cl
   WEBPAY_COMMERCE_CODE=TU_CODIGO_REAL
   WEBPAY_API_KEY=TU_API_KEY_REAL
   ```
3. **Certifica tu integración** con Transbank
4. **Prueba exhaustivamente** antes de lanzar

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs de build en tu plataforma
2. Verifica que todas las variables estén configuradas
3. Asegúrate de que el build funcione localmente primero
4. Consulta la documentación de tu plataforma de deploy

---

**¡Listo para deploy! 🎉**

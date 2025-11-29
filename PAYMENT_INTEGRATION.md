# Integración de Pasarela de Pago - WebPay Plus (Transbank)

## 🔧 Configuración

### 1. Variables de Entorno

Copia el archivo `.env.local.example` a `.env.local`:

```bash
cp .env.local.example .env.local
```

### 2. Modo Integración (Pruebas)

El proyecto ya está configurado con las credenciales de prueba de Transbank. Las credenciales actuales son:

- **Commerce Code**: 597055555532
- **API Key**: 579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C
- **URL**: https://webpay3gint.transbank.cl

### 3. Tarjetas de Prueba

Para probar pagos en modo integración, usa estas tarjetas:

#### Tarjeta Visa (Aprobada)
- **Número**: 4051885600446623
- **CVV**: 123
- **Fecha**: Cualquier fecha futura
- **RUT**: 11.111.111-1
- **Clave**: 123

#### Tarjeta Mastercard (Aprobada)
- **Número**: 5186059559590568
- **CVV**: 123
- **Fecha**: Cualquier fecha futura

## 🚀 Cómo Funciona

### Flujo de Pago:

1. **Usuario agrega productos** al carrito
2. **Click en "Proceder al Pago"** en el carrito
3. **API crea transacción** (`/api/payment/create`)
4. **Redirección a WebPay** donde el usuario ingresa datos de tarjeta
5. **Usuario completa el pago** en el formulario de Transbank
6. **WebPay redirige** a `/api/payment/confirm`
7. **API confirma transacción** y valida el pago
8. **Redirección final** a `/payment/success` o `/payment/error`

### Archivos Importantes:

```
app/
├── api/
│   └── payment/
│       ├── create/
│       │   └── route.ts      # Crea transacción en WebPay
│       └── confirm/
│           └── route.ts      # Confirma y valida el pago
├── payment/
│   ├── success/
│   │   └── page.tsx         # Página de pago exitoso
│   └── error/
│       └── page.tsx         # Página de error en pago
components/
└── CartSheet.tsx            # Botón de pago integrado
contexts/
└── CartContext.tsx          # Manejo global del carrito
```

## 📦 APIs Creadas

### POST `/api/payment/create`
Crea una nueva transacción en WebPay.

**Body**:
```json
{
  "amount": 15000,
  "sessionId": "SESSION-abc123",
  "buyOrder": "ORDER-1234567890"
}
```

**Response**:
```json
{
  "success": true,
  "token": "token_de_transaccion",
  "url": "https://webpay3gint.transbank.cl/webpayserver/initTransaction"
}
```

### GET/POST `/api/payment/confirm`
Confirma la transacción después del pago.

**Query Params**:
- `token_ws`: Token de la transacción

## 🔐 Modo Producción

Para usar en producción:

1. **Solicita credenciales** en [Transbank](https://www.transbankdevelopers.cl/)
2. **Actualiza `.env.local`**:
   ```env
   WEBPAY_URL=https://webpay3g.transbank.cl
   WEBPAY_COMMERCE_CODE=TU_CODIGO_REAL
   WEBPAY_API_KEY=TU_API_KEY_REAL
   NEXT_PUBLIC_BASE_URL=https://tu-dominio.com
   ```
3. **Reinicia el servidor**

## 🎯 Próximos Pasos

- [ ] Guardar transacciones en base de datos
- [ ] Enviar emails de confirmación
- [ ] Implementar webhooks para notificaciones
- [ ] Agregar más métodos de pago (Mercado Pago, PayPal)
- [ ] Sistema de gestión de órdenes

## 📚 Recursos

- [Documentación WebPay Plus](https://www.transbankdevelopers.cl/producto/webpay)
- [API Reference](https://www.transbankdevelopers.cl/referencia/webpay)
- [SDKs y Ejemplos](https://github.com/TransbankDevelopers)

## ⚠️ Notas Importantes

- En modo integración, **NO se cobran** las tarjetas
- Las transacciones de prueba se eliminan automáticamente
- Para producción, necesitas certificar tu integración con Transbank
- Todas las transacciones en producción tienen comisiones

## 🆘 Solución de Problemas

### Error "Commerce code inválido"
- Verifica que estés usando las credenciales correctas
- En producción, asegúrate de haber activado tu comercio

### Pago rechazado en pruebas
- Usa las tarjetas de prueba proporcionadas
- Verifica que los datos sean exactos

### Timeout en confirmación
- Verifica tu conexión a internet
- Revisa los logs en consola del servidor

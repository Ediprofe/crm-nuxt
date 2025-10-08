# 🐛 Guía de Depuración del Tema

## ❓ Problema: "Sigue apareciendo tema oscuro por defecto"

### 🔍 Causa
El navegador tiene guardada tu preferencia anterior en `localStorage`. El sistema **prioriza tu preferencia guardada** sobre el tema por defecto.

## 🛠️ Solución Rápida

### Opción 1: Usando el helper (Recomendado)

1. Abre la consola del navegador (F12)
2. Verás estos mensajes:
   ```
   [Theme Plugin] localStorage: dark
   [Theme Plugin] Aplicando tema guardado: dark
   💡 Tip: Ejecuta window.resetTheme() para resetear el tema
   ```
3. Ejecuta en la consola:
   ```javascript
   window.resetTheme()
   ```
4. La página se recargará automáticamente con el tema claro

### Opción 2: Manual

1. Abre la consola del navegador (F12)
2. Ejecuta:
   ```javascript
   localStorage.removeItem('ediprofe-theme')
   location.reload()
   ```

### Opción 3: DevTools

1. Abre DevTools (F12)
2. Ve a la pestaña "Application" (Chrome) o "Storage" (Firefox)
3. En el menú lateral: Local Storage → http://localhost:3001
4. Busca la clave `ediprofe-theme`
5. Click derecho → Delete
6. Recarga la página

## ✅ Verificar que Funciona

Después de resetear, deberías ver en la consola:

```
[Theme Plugin] localStorage: no guardado
[Theme Plugin] Aplicando tema por defecto: light
💡 Tip: Ejecuta window.resetTheme() para resetear el tema
```

✅ **La página debe cargar en tema claro**

## 🎯 Comportamiento Esperado

### Primera Visita (sin localStorage)
```
✓ Tema CLARO por defecto
✓ Usuario puede cambiar con el toggle
✓ Se guarda su preferencia
```

### Visitas Posteriores (con localStorage)
```
✓ Usa la preferencia guardada del usuario
✓ Puede cambiar en cualquier momento
✓ Su elección se mantiene
```

## 🧪 Pruebas Completas

### Test 1: Tema por defecto
```javascript
// En consola:
localStorage.removeItem('ediprofe-theme')
location.reload()
// Resultado esperado: Tema CLARO
```

### Test 2: Persistencia tema oscuro
```javascript
// 1. Click en el toggle (cambiar a oscuro)
// 2. Recargar la página
// Resultado esperado: Mantiene tema OSCURO
```

### Test 3: Persistencia tema claro
```javascript
// 1. Estando en tema oscuro, click en toggle (cambiar a claro)
// 2. Recargar la página
// Resultado esperado: Mantiene tema CLARO
```

## 🔧 Comandos Útiles (Consola del Navegador)

```javascript
// Ver valor actual en localStorage
localStorage.getItem('ediprofe-theme')

// Ver si tiene clase dark
document.documentElement.classList.contains('dark')

// Forzar tema oscuro
localStorage.setItem('ediprofe-theme', 'dark')
location.reload()

// Forzar tema claro
localStorage.setItem('ediprofe-theme', 'light')
location.reload()

// Resetear (usar tema por defecto)
window.resetTheme()
```

## 📊 Mensajes de Debug

El plugin ahora muestra mensajes en consola:

| Mensaje | Significado |
|---------|-------------|
| `localStorage: no guardado` | Primera visita, usará tema claro |
| `localStorage: light` | Tema claro guardado |
| `localStorage: dark` | Tema oscuro guardado |
| `Aplicando tema por defecto: light` | No hay preferencia, usando claro |
| `Aplicando tema guardado: dark` | Aplicando tu preferencia guardada |

## 🚫 NO es por...

- ❌ **La configuración del sistema**: Ya NO detectamos `prefers-color-scheme`
- ❌ **El navegador**: Todos los navegadores modernos funcionan igual
- ❌ **El código**: El plugin está configurado correctamente para tema claro

## ✅ SÍ es por...

- ✅ **localStorage tiene guardado 'dark'**: De una sesión anterior
- ✅ **El sistema respeta tu preferencia**: Por diseño, tu elección tiene prioridad

## 🎓 Conclusión

El sistema está funcionando **correctamente**. Solo necesitas limpiar tu preferencia anterior para ver el tema claro por defecto:

```javascript
window.resetTheme()
```

Después de esto, el tema claro será el predeterminado, pero tu preferencia se guardará cuando cambies manualmente con el toggle.








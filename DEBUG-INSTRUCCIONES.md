# 🔧 DEBUG - VERIFICAR CARDS NO FUNCIONAN

**Fecha:** 9 de octubre de 2025  
**Problema:** Cards siguen mostrando superposición  
**Estado:** En debugging

---

## 🎯 CAMBIOS REALIZADOS

### 1. CSS Corregido
- ✅ Eliminada regla duplicada de `td`
- ✅ Consolidado en una sola regla con todas las propiedades
- ✅ Añadido `order: -1` al `::before` para asegurar que aparezca primero

### 2. Plugin Mejorado
- ✅ Añadidos timeouts de 100ms y 500ms
- ✅ Múltiples intentos de enhancement
- ✅ Mejor timing para asegurar que el DOM esté listo

---

## 🧪 PARA DEBUGGING EN TU IPHONE

### Paso 1: Hard Refresh
```
En Safari iOS:
1. Mantener presionado el botón de recarga
2. Soltar cuando aparezca "Recargar sin caché de contenido"
```

### Paso 2: Verificar en Desktop (DevTools)

**Abrir DevTools (F12) en tu Mac:**

1. **Ir a:**
   ```
   http://localhost:3001/quimica/enlace-quimico
   ```

2. **Responsive Mode:**
   - Presionar: `Cmd + Shift + M`
   - Seleccionar: iPhone SE (375px)

3. **Abrir Console:**
   - Presionar: `Cmd + Option + J`

4. **Copiar y pegar este script:**
   ```javascript
   // Contenido de debug-tables.js
   ```

5. **Ver resultado:**
   - Si dice "TODO OK" → El plugin funciona
   - Si dice "HAY PROBLEMAS" → Ver qué falla

---

## 🔍 QUÉ VERIFICAR

### En el script de debug, verifica:

1. **¿Hay tablas?**
   ```
   ✅ Total tablas encontradas: 1 (o más)
   ```

2. **¿Tienen la clase?**
   ```
   ✅ Clase 'responsive-table': SÍ
   ```

3. **¿Tienen wrapper?**
   ```
   ✅ Wrapper 'table-wrap': SÍ
   ```

4. **¿Tienen data-labels?**
   ```
   ✅ Celdas con data-label: 12 (o más)
   Ejemplo: data-label="Compuesto"
   ```

5. **¿CSS se aplica?**
   ```
   display: flex
   flex-direction: column
   gap: 8px (o similar)
   ```

---

## 🚨 POSIBLES PROBLEMAS

### Problema 1: Plugin no se ejecuta
```javascript
// Solución en Console:
$nuxt.$enhanceTables()
```

### Problema 2: CSS no se carga
```
Solución: Hard refresh (Cmd + Shift + R)
```

### Problema 3: Timing issue
```
El plugin se ejecuta antes que el contenido cargue
Solución: Los timeouts deberían resolverlo
```

---

## 📱 VERIFICACIÓN VISUAL ESPERADA

### ✅ CORRECTO (después del fix):
```
┌─────────────────────────────────┐
│ Compuesto                       │
│ AZ                              │
├─────────────────────────────────┤
│ Diferencia de electronegatividad│
│ δ (ΔEN)                         │
│ [valor]                         │
├─────────────────────────────────┤
│ Tipo de enlace químico          │
│ [valor]                         │
└─────────────────────────────────┘
```

### ❌ INCORRECTO (lo que estás viendo):
```
┌─────────────────────────────────┐
│ Compuesto              AZ       │
├─────────────────────────────────┤
│ Diferencia de electronegatividad│
│ δ (ΔEN)                         │
│ Tipo de enlace químico   ← Superpuesto
└─────────────────────────────────┘
```

---

## 🔧 SI EL DEBUG MUESTRA PROBLEMAS

### Caso A: No hay tablas encontradas
```
❌ Total tablas encontradas: 0

Causa: El selector '.prose table' no encuentra nada
Solución: Verificar estructura HTML
```

### Caso B: No tienen clase 'responsive-table'
```
❌ Clase 'responsive-table': NO

Causa: Plugin no se ejecutó
Solución: Ejecutar manualmente $nuxt.$enhanceTables()
```

### Caso C: No tienen data-labels
```
❌ Celdas con data-label: 0

Causa: Plugin no pudo extraer headers
Solución: Verificar estructura de la tabla (thead/th)
```

### Caso D: CSS no se aplica
```
display: table-cell (debería ser flex)

Causa: CSS no se cargó o hay conflicto
Solución: Hard refresh, verificar media query
```

---

## 🎯 PRÓXIMOS PASOS

1. **Ejecutar script de debug** en Console
2. **Reportar resultados:**
   - ¿Total tablas?
   - ¿Tienen clase?
   - ¿Tienen data-labels?
   - ¿CSS display?

3. **Según resultados**, aplicar fix específico

---

## 📞 NECESITO DE TI

Por favor, ejecuta el script de debug y comparte:

```
📊 Total tablas: ?
✅/❌ Clase responsive-table: ?
✅/❌ Data-labels: ?
🎨 CSS display: ?
📱 Viewport: ?px
```

Con esa info puedo diagnosticar exactamente qué está fallando.

---

**Archivos actualizados:**
- ✅ `app/assets/styles/global.css` (CSS consolidado)
- ✅ `app/plugins/responsive-tables.client.ts` (timeouts añadidos)
- ✅ `debug-tables.js` (script de debugging)

**Servidor:** http://localhost:3001 (corriendo)  
**Estado:** Esperando debugging manual para diagnóstico preciso

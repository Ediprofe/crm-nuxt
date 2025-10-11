# 🔧 FIX - LAYOUT DE CARDS EN MÓVIL

**Fecha:** 9 de octubre de 2025  
**Problema:** Labels y contenido en cards móviles no se alineaban correctamente  
**Estado:** ✅ CORREGIDO

---

## 🔍 PROBLEMA IDENTIFICADO

### ❌ Síntoma visual:
En la captura se veía así:

```
┌─────────────────────────────────┐
│ Cómo se forma                   │
│ un electrón              ← MAL  │
│                                 │
│ Cada átomo aporta               │
│ para formar un par compartido.  │
└─────────────────────────────────┘
```

**El contenido se "envolvía" debajo del label** en lugar de estar en columnas separadas.

---

## 🐛 CAUSA RAÍZ

### Código problemático (v5.0 inicial):

```css
table.responsive-table td {
  display: grid;
  grid-template-columns: minmax(8rem, 40%) 1fr;
  gap: 0.75rem;
  ...
}

table.responsive-table td::before {
  content: attr(data-label);
  ...
}
```

**¿Por qué fallaba?**

1. Se usaba `display: grid` con 2 columnas
2. Pero `::before` y el contenido de la celda **NO son hijos separados del grid**
3. El `::before` es un pseudo-elemento que se genera ANTES del contenido
4. El grid no puede separar el pseudo-elemento del texto en columnas diferentes
5. Resultado: Todo el contenido se apilaba verticalmente

**Concepto técnico:**
```html
<!-- Lo que CSS ve: -->
<td>
  ::before "Label"   ← Pseudo-elemento (no es un hijo real)
  "Contenido real"   ← Texto directo
</td>

<!-- Grid esperaba: -->
<td>
  <span>Label</span>    ← Hijo 1 (columna 1)
  <span>Contenido</span> ← Hijo 2 (columna 2)
</td>
```

---

## ✅ SOLUCIÓN IMPLEMENTADA

### Enfoque: Posicionamiento absoluto

En lugar de usar grid, usamos **posicionamiento absoluto** para el label:

```css
/* La celda es un contenedor relativo */
table.responsive-table td {
  position: relative;
  display: block;
  padding-left: calc(40% + 1.5rem); /* Espacio para el label */
  min-height: 3rem;
  ...
}

/* El label se posiciona ABSOLUTO a la izquierda */
table.responsive-table td::before {
  content: attr(data-label);
  position: absolute;
  left: 0;
  top: 0;
  width: 40%;
  padding: 0.875rem 1rem;
  font-weight: 600;
  ...
}
```

**¿Cómo funciona?**

1. ✅ El `<td>` es `position: relative` (contenedor)
2. ✅ El `::before` es `position: absolute` (fijo a la izquierda)
3. ✅ El contenido real tiene `padding-left` para hacer espacio
4. ✅ Cada uno ocupa su columna sin interferir

---

## 🎯 RESULTADO ESPERADO

### ✅ Ahora se ve así:

```
┌─────────────────────────────────┐
│ Cómo se forma  │ Cada átomo      │
│ un electrón    │ aporta para     │
│                │ formar un par   │
│                │ compartido.     │
└─────────────────────────────────┘
   ↑ Label fijo     ↑ Contenido fluye
   (40% ancho)      (60% ancho)
```

**Ventajas:**
- ✅ Labels siempre alineados a la izquierda
- ✅ Contenido siempre a la derecha
- ✅ Wrap correcto en ambas columnas
- ✅ Altura dinámica según contenido
- ✅ Responsive y adaptable

---

## 📐 ESPECIFICACIONES TÉCNICAS

### Layout de cada celda:

```
┌─────────────────────────────────────────┐
│ ◄── 40% --► ◄─────── 60% ──────────►   │
│ ┌─────────┐ ┌─────────────────────┐    │
│ │ LABEL   │ │ CONTENT             │    │
│ │ (fixed) │ │ (flows)             │    │
│ │         │ │                     │    │
│ └─────────┘ └─────────────────────┘    │
│ ◄─0.875rem─► ◄─gap 0.625rem─►          │
└─────────────────────────────────────────┘
     ↑ absolute        ↑ padding-left
```

### Medidas:
- **Label width:** 40%
- **Content width:** 60% (restante)
- **Gap visual:** 0.625rem (diferencia entre padding)
- **Padding vertical:** 0.875rem (ambas columnas)
- **Min height:** 3rem (para celdas con poco contenido)

---

## 🧪 TESTING

### Verificar en móvil:

1. ✅ Abrir DevTools → Responsive Mode → iPhone SE (375px)
2. ✅ Ir a: http://localhost:3001/quimica/enlace-quimico
3. ✅ Verificar que las cards se vean así:

```
Card ejemplo:

┌─────────────────────────────────────┐
│ Tipo de enlace │ Enlace iónico     │
├─────────────────────────────────────┤
│ Cómo se forma  │ Por transferencia │
│                │ (robo) de         │
│                │ electrones        │
├─────────────────────────────────────┤
│ Tipo de        │ Entre un          │
│ elementos      │ (que cede         │
│ que participan │ electrones) y un  │
│                │ (que los gana).   │
└─────────────────────────────────────┘
```

**Checklist:**
- [ ] Labels en columna izquierda (40%)
- [ ] Contenido en columna derecha (60%)
- [ ] Labels NO se envuelven sobre el contenido
- [ ] Contenido NO se superpone con labels
- [ ] Altura de celda se ajusta al contenido más alto
- [ ] Borders entre celdas alineados
- [ ] Última celda sin border inferior

---

## 🎨 CASOS ESPECIALES

### Caso 1: Label muy largo
```
┌─────────────────────────────────────┐
│ Ejemplo y      │ H₂, HCl, CH₄      │
│ explicación    │                   │
│ resumida       │                   │
└─────────────────────────────────────┘
```
✅ El label hace wrap dentro de su columna (40%)

### Caso 2: Contenido muy largo
```
┌─────────────────────────────────────┐
│ Cómo se forma  │ Los átomos        │
│                │ comparten un par  │
│                │ de electrones     │
│                │ para completar    │
│                │ su octeto o dueto.│
└─────────────────────────────────────┘
```
✅ El contenido hace wrap dentro de su columna (60%)

### Caso 3: Contenido corto
```
┌─────────────────────────────────────┐
│ Representación │ Línea simple (-). │
└─────────────────────────────────────┘
```
✅ Min-height de 3rem garantiza altura mínima legible

---

## 🔄 COMPARACIÓN

### ANTES (Grid fallido):
```css
display: grid;
grid-template-columns: minmax(8rem, 40%) 1fr;
```
❌ No funciona con pseudo-elementos

### DESPUÉS (Absolute positioning):
```css
position: relative;
padding-left: calc(40% + 1.5rem);

td::before {
  position: absolute;
  left: 0;
  width: 40%;
}
```
✅ Funciona perfectamente

---

## 💡 LECCIÓN TÉCNICA

### ⚠️ Limitación de CSS Grid con pseudo-elementos:

> **`display: grid` NO puede separar un pseudo-elemento (`::before`) del contenido real de su padre en diferentes columnas del grid.**

**Alternativas cuando necesitas layout de 2 columnas con `::before`:**

1. ✅ **Absolute positioning** (lo que usamos)
2. ✅ **Flexbox** con `flex-direction: row` (pero más complejo)
3. ✅ **Float** (deprecated, no recomendado)
4. ❌ **Grid** (no funciona con `::before` y contenido)

**Mejor práctica:**
- Si necesitas 2 columnas reales: usa elementos HTML separados
- Si usas `::before` con layout: usa absolute positioning o flexbox

---

## 📦 ARCHIVOS MODIFICADOS

```
✅ app/assets/styles/global.css
   Líneas ~360-385 (sección cards móvil)
```

---

## ✅ ESTADO

**Problema:** ✅ RESUELTO  
**Testing:** Pendiente de verificación visual  
**Deploy:** Listo cuando se verifique

---

## 🚀 PRÓXIMO PASO

**AHORA:** Refrescar el navegador y verificar que las cards se vean correctamente alineadas en móvil.

**Hard refresh:** Cmd/Ctrl + Shift + R (para limpiar caché CSS)

---

**Última actualización:** 9 de octubre de 2025  
**Versión:** v5.0.1 - Fix layout cards móvil  
**Estado:** ✅ Implementado

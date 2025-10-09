# ⚡ VALIDACIÓN RÁPIDA v3 - 5 MINUTOS

## 🎯 Objetivo
Verificar que headers estén alineados en desktop y breakout funcione en móvil.

---

## 📋 CHECKLIST VISUAL (3 minutos)

### 1️⃣ Desktop (1440px) - MÁS IMPORTANTE

**Abrir:** http://localhost:3000/quimica/enlace-quimico

**DevTools:** F12 → Responsive → 1440px width

**Buscar la tabla en la sección "Fundamentos"**

**Verificar visualmente:**

```
¿Los headers están alineados con el contenido?

     Tipo de enlace  │  Cómo se forma      │  Electrones
     ════════════════│═════════════════════│═══════════════
✅   Simple           │  Cada átomo aporta..│  1 par (2 e⁻)
     ↑                  ↑                     ↑
     └── Header       └── Debe alinear    └── Perfectamente
```

**Resultado esperado:**
- ✅ Headers alineados perfectamente con las columnas
- ✅ Bordes verticales continuos
- ✅ Sin gaps entre header y contenido

**Si falla:**
- ❌ Headers NO alineados → Problema con display
- ❌ Gaps visibles → Problema con border-collapse

---

### 2️⃣ Móvil (375px)

**DevTools:** Cambiar a "iPhone SE" (375px)

**Verificar:**
```
✅ Zoom al 100% (no zoom-out requerido)
✅ Tabla ocupa TODO el ancho del viewport
✅ Bordes de tabla tocan los bordes de la pantalla
✅ Headers siguen alineados con contenido
```

---

### 3️⃣ Tablet (768px)

**DevTools:** "iPad" → 768px

**Verificar:**
```
✅ Tabla tiene scroll horizontal (si tabla > 768px)
✅ Headers alineados
✅ Scroll suave al deslizar
```

---

## 🔍 SCRIPT DE VALIDACIÓN (2 minutos)

**Copiar en DevTools Console:**

```javascript
// VALIDACIÓN RÁPIDA v3
const table = document.querySelector('.prose table');
const vw = window.innerWidth;
const display = window.getComputedStyle(table).display;

console.log(`📐 Viewport: ${vw}px`);
console.log(`📊 Display: ${display}`);

if (vw >= 1024) {
  console.log(display === 'table' ? '✅ DESKTOP OK' : '❌ DESKTOP FAIL - Debería ser "table"');
} else if (vw >= 768) {
  console.log(display === 'block' ? '✅ TABLET OK' : '❌ TABLET FAIL - Debería ser "block"');
} else {
  console.log(display === 'block' ? '✅ MÓVIL OK' : '❌ MÓVIL FAIL - Debería ser "block"');
}

// Verificar breakout en móvil
if (vw < 768) {
  const ml = parseFloat(window.getComputedStyle(table).marginLeft);
  console.log(ml < 0 ? '✅ Breakout activo' : '⚠️ Breakout NO activo');
}
```

---

## ✅ RESULTADO ESPERADO

### ✅ TODO OK
```
Desktop: ✅ Headers alineados, display: table
Tablet:  ✅ Scroll horizontal, display: block
Móvil:   ✅ Breakout activo, display: block
```

### ❌ PROBLEMA
Si alguno falla:
1. Verificar que HMR actualizó (refrescar: Cmd+Shift+R)
2. Verificar Console por errores CSS
3. Ejecutar script de validación completo (SOLUCION-V3-DEFINITIVA.md)

---

## 🚀 SI TODO OK → DEPLOY

```bash
npm run build

git add app/assets/styles/global.css

git commit -m "fix(desktop): alineación headers + breakout móvil (v3)"

git push origin main
```

---

## ⏱️ TIEMPO TOTAL: 5 MINUTOS

- Desktop check: 2 min
- Móvil check: 1 min  
- Script validation: 2 min

**Empezar ahora** → Abrir http://localhost:3000/quimica/enlace-quimico en DevTools

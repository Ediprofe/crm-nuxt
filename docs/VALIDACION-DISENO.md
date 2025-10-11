# 🎨 Validación del Sistema de Diseño

**Fecha:** 10 de octubre de 2025  
**Archivo:** `content/quimica/05-enlace-quimico.md`  
**Estado:** En Revisión

## ✅ Checklist de Validación

### Jerarquía Visual

- [ ] H2 (Sección) claramente más grande que títulos de componentes
- [ ] Títulos de componentes (1.5rem) claramente diferenciados
- [ ] Títulos de items (1.125rem) destacados pero subordinados
- [ ] Description (1rem) como texto principal
- [ ] Details (0.9rem) como información secundaria

### Alineación

- [ ] H2 alineado con títulos de componentes (3rem padding)
- [ ] Todos los componentes respetan el mismo margen lateral
- [ ] No hay elementos "desalineados" visualmente
- [ ] Spacing vertical consistente (3rem entre componentes)

### Colores

- [ ] ComparisonCard: colores aplicados correctamente
- [ ] InfoBox: tipos visuales claros (info/warning/tip/etc)
- [ ] KeyPoints: gradiente verde en números
- [ ] ProcessSteps: conectores con gradiente
- [ ] Bordes top de cards con colores apropiados

### Responsive

- [ ] Desktop (>1024px): 3 columnas se ven bien
- [ ] Tablet (768-1024px): Adaptación correcta
- [ ] Mobile (<768px): 1 columna, todo legible
- [ ] Sin overflow horizontal en ningún breakpoint

### Dark Mode

- [ ] Todos los componentes legibles en dark mode
- [ ] Contraste adecuado en textos
- [ ] Bordes visibles pero sutiles
- [ ] Colores de acento se mantienen vibrantes

### Contenido

- [ ] Sin asteriscos `**` visibles en props
- [ ] Emojis en títulos de items correctos
- [ ] Spacing entre secciones consistente
- [ ] Videos renderizados (si aplica)

## 🔍 Elementos a Verificar por Componente

### ComparisonCard

**Ubicación:** Sección "Tipos de Enlace Químico"

Verificar:
```
┌─────────────────────────────────────┐
│ 🔍 Tipos de Enlace Químico          │ ← 1.5rem, weight 700
│                                     │ ← 2rem margin-bottom
│ ┌─────────────┐ ┌─────────────┐   │
│ │ 🔋 Enlace   │ │ 🤝 Enlace   │   │ ← 1.125rem, weight 700
│ │ Iónico      │ │ Covalente   │   │
│ │             │ │             │   │
│ │ Transfer... │ │ Comparti... │   │ ← 1rem, weight 500
│ │             │ │             │   │
│ │ ─────────── │ │ ─────────── │   │
│ │ Metal cede  │ │ No metal +  │   │ ← 0.9rem, secondary
│ └─────────────┘ └─────────────┘   │
└─────────────────────────────────────┘
```

- [ ] Título grande y claro
- [ ] Grid de 3 columnas alineado
- [ ] Cards de igual altura
- [ ] Barra de color top (4px) visible
- [ ] Hover effect suave
- [ ] Border de 2px del color apropiado

### InfoBox

**Ubicación:** Sección "Enlace Iónico"

Verificar:
```
┌─────────────────────────────────────┐
│ 💡 💡 Concepto Clave                │ ← Icon + título
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ ← Border left colorido
│                                     │
│ El enlace iónico se produce por...  │
│                                     │
└─────────────────────────────────────┘
```

- [ ] Icon adecuado al tipo (💡 para info)
- [ ] Border izquierdo del color apropiado
- [ ] Fondo sutil (bg-secondary)
- [ ] Texto legible
- [ ] Hover con translateX suave

### ProcessSteps

**Ubicación:** Sección "Formación del Enlace Iónico"

Verificar:
```
┌─────────────────────────────────────┐
│ Formación del Enlace Iónico         │ ← 1.5rem, weight 700
│                                     │
│ ┌────┐                              │
│ │ 1️⃣ │ Transferencia de electrones │
│ └────┘                              │
│   │                                 │ ← Conector visual
│   ↓                                 │
│ ┌────┐                              │
│ │ 2️⃣ │ El metal cede electrones    │
│ └────┘                              │
└─────────────────────────────────────┘
```

- [ ] Título claro
- [ ] Números circulares con gradiente
- [ ] Conectores entre pasos visibles
- [ ] Descripción legible
- [ ] Icons de emoji si se especificaron

### KeyPoints

**Ubicación:** Sección "Ejemplos de Enlaces Iónicos"

Verificar:
```
┌─────────────────────────────────────┐
│ Ejemplos de Enlaces Iónicos         │
│                                     │
│ ┌──┐                                │
│ │1 │ Cloruro de Sodio (NaCl)...    │ ← Highlight si aplica
│ └──┘                                │
│                                     │
│ ┌──┐                                │
│ │2 │ Óxido de Potasio (K₂O)...     │
│ └──┘                                │
└─────────────────────────────────────┘
```

- [ ] Título claro
- [ ] Círculos numerados con gradiente verde
- [ ] Items destacados (highlight) tienen fondo
- [ ] Hover effect translateX
- [ ] Texto bien alineado con número

## 📋 Problemas Encontrados

### Críticos (Bloquean uso)
_(Lista vacía significa que está todo bien)_

### Menores (Mejoras cosméticas)
_(Anotar aquí pequeños ajustes)_

### Sugerencias (Nice to have)
_(Ideas para futuras iteraciones)_

## 🎯 Resultado de Validación

**Estado General:** [ ] ✅ Aprobado | [ ] ⚠️ Requiere ajustes | [ ] ❌ Requiere refactorización

### Desktop
- Alineación: [ ] ✅ | [ ] ⚠️ | [ ] ❌
- Spacing: [ ] ✅ | [ ] ⚠️ | [ ] ❌
- Colores: [ ] ✅ | [ ] ⚠️ | [ ] ❌
- Jerarquía: [ ] ✅ | [ ] ⚠️ | [ ] ❌

### Mobile
- Responsivo: [ ] ✅ | [ ] ⚠️ | [ ] ❌
- Legibilidad: [ ] ✅ | [ ] ⚠️ | [ ] ❌
- Touch targets: [ ] ✅ | [ ] ⚠️ | [ ] ❌

### Dark Mode
- Contraste: [ ] ✅ | [ ] ⚠️ | [ ] ❌
- Colores: [ ] ✅ | [ ] ⚠️ | [ ] ❌
- Legibilidad: [ ] ✅ | [ ] ⚠️ | [ ] ❌

## 📝 Notas de Validación

_(Espacio para observaciones durante la revisión manual)_

---

## ✅ Aprobación

- [ ] **Diseño aprobado** - Listo para producción
- [ ] **Documentación actualizada** - Decisiones de diseño documentadas
- [ ] **Listo para escalar** - Puede agregarse ExerciseBlock

**Validado por:** _________________  
**Fecha:** _________________

# 🎨 Sistema de Diseño Educativo - Ediprofe

## Filosofía de Diseño

### Principios
1. **Visual pero No Infantil**: Colores y formas que transmitan profesionalismo educativo
2. **Claridad Jerárquica**: Cada nivel de información tiene su peso visual
3. **Engagement Visual**: Usar color y forma para guiar la atención
4. **Consistencia Obsesiva**: Cada componente sigue las mismas reglas

---

## Paleta de Colores Educativa

### Colores Principales
```css
/* Teoría - Azul Profundo */
--theory-primary: #2563eb;      /* blue-600 */
--theory-secondary: #3b82f6;    /* blue-500 */
--theory-light: #dbeafe;        /* blue-50 */

/* Práctica - Verde Acción */
--practice-primary: #059669;    /* emerald-600 */
--practice-secondary: #10b981;  /* emerald-500 */
--practice-light: #d1fae5;      /* emerald-50 */

/* Ejercicios - Púrpura Desafío */
--exercise-primary: #7c3aed;    /* violet-600 */
--exercise-secondary: #8b5cf6;  /* violet-500 */
--exercise-light: #ede9fe;      /* violet-50 */

/* Ejemplos - Naranja Demostración */
--example-primary: #ea580c;     /* orange-600 */
--example-secondary: #f97316;   /* orange-500 */
--example-light: #ffedd5;       /* orange-50 */

/* Alertas y Notas */
--warning-primary: #d97706;     /* amber-600 */
--success-primary: #16a34a;     /* green-600 */
--error-primary: #dc2626;       /* red-600 */
--info-primary: #0891b2;        /* cyan-600 */
```

### Jerarquía de Colores por Tipo de Contenido

| Tipo | Color Base | Uso |
|------|------------|-----|
| **Teoría** | Azul | Conceptos, definiciones, explicaciones |
| **Práctica** | Verde | Ejercicios para resolver, actividades |
| **Solución** | Púrpura | Respuestas, soluciones paso a paso |
| **Ejemplo** | Naranja | Ejemplos demostrativos |
| **Nota** | Cian | Información adicional, tips |
| **Advertencia** | Amarillo | Errores comunes, precauciones |

---

## Componentes Necesarios

### 1. ExerciseBlock
**Propósito:** Presentar ejercicios de práctica de forma clara y atractiva

**Variantes:**
- `simple`: Ejercicio directo
- `guided`: Ejercicio con pistas
- `challenge`: Ejercicio desafiante

**Props:**
```typescript
{
  title: string           // "Ejercicio 1: Factorización"
  difficulty: 'easy' | 'medium' | 'hard'
  question: string        // El enunciado
  hints?: string[]        // Pistas opcionales
  solution?: string       // Solución (colapsada)
}
```

**Visual:**
```
┌────────────────────────────────────┐
│ 🎯 Ejercicio 1: Factorización      │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │ ← Verde emerald
│                                    │
│ Factoriza: x² + 5x + 6            │
│                                    │
│ 💡 Pistas disponibles (expandir)  │
│ ✅ Ver solución                    │
└────────────────────────────────────┘
```

### 2. ExampleBox
**Propósito:** Mostrar ejemplos resueltos paso a paso

**Props:**
```typescript
{
  title: string           // "Ejemplo 1: Ecuación Cuadrática"
  steps: {
    title: string
    description: string
    calculation?: string
  }[]
}
```

**Visual:**
```
┌────────────────────────────────────┐
│ 📝 Ejemplo 1: Ecuación Cuadrática  │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │ ← Naranja
│                                    │
│ 1️⃣ Identificar coeficientes       │
│    a = 1, b = 5, c = 6            │
│                                    │
│ 2️⃣ Aplicar fórmula general        │
│    x = (-b ± √(b²-4ac)) / 2a      │
│                                    │
│ 3️⃣ Resolver                        │
│    x₁ = -2, x₂ = -3               │
└────────────────────────────────────┘
```

### 3. SolutionToggle
**Propósito:** Ocultar/mostrar soluciones para que el estudiante intente primero

**Props:**
```typescript
{
  buttonText?: string     // "Ver solución"
  solution: string | VNode  // Contenido de la solución
}
```

**Visual:**
```
┌────────────────────────────────────┐
│ 🔒 Solución oculta                 │
│                                    │
│ [▼ Mostrar solución]               │ ← Botón clickable
└────────────────────────────────────┘

↓ Al hacer click ↓

┌────────────────────────────────────┐
│ ✅ Solución                         │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │ ← Púrpura
│                                    │
│ Paso 1: ...                        │
│ Paso 2: ...                        │
│ Respuesta: x = -2, x = -3         │
│                                    │
│ [▲ Ocultar solución]               │
└────────────────────────────────────┘
```

### 4. VideoEmbed
**Propósito:** Embeber videos de forma elegante y consistente

**Props:**
```typescript
{
  url: string             // URL de YouTube/TikTok
  title?: string          // Título del video
  platform: 'youtube' | 'tiktok'
  autodetect?: boolean    // Auto-detectar plataforma
}
```

**Visual:**
```
┌────────────────────────────────────┐
│ 📺 Enlace químico - Introducción   │
│                                    │
│ ┌──────────────────────────────┐  │
│ │                              │  │
│ │     [▶️ Ver en YouTube]      │  │ ← Thumbnail
│ │                              │  │
│ └──────────────────────────────┘  │
│                                    │
│ Duración: 5:32 | YouTube          │
└────────────────────────────────────┘
```

### 5. PracticeSection
**Propósito:** Contenedor automático para secciones de práctica

**Detección automática:**
```markdown
## Práctica
<!-- Todo lo que viene aquí se envuelve en PracticeSection -->

## Ejercicios
<!-- También se detecta -->
```

**Visual:**
```
┌────────────────────────────────────┐
│ 🎯 Sección de Práctica             │ ← Banner verde
└────────────────────────────────────┘

(Ejercicios dentro tienen estilo verde)
```

---

## Estructura de Markdown

### Jerarquía de Títulos

```markdown
# Unidad: Enlace Químico           ← H1 (Nunca se usa en contenido)

## Teoría                           ← H2 (Secciones principales)
### Enlace iónico                  ← H3 (Subsecciones)
#### Características               ← H4 (Sub-subsecciones)

## Práctica                         ← H2 (Detecta sección de práctica)
### Ejercicio 1                    ← H3 (Ejercicios individuales)

## Ejemplos Resueltos               ← H2 (Detecta sección de ejemplos)
### Ejemplo 1                      ← H3 (Ejemplos individuales)
```

### Detección Automática de Secciones

```javascript
// En el procesador de markdown
const sectionDetectors = {
  practice: /^##\s+(Práctica|Ejercicios|Actividades)/i,
  examples: /^##\s+(Ejemplos|Ejemplos Resueltos)/i,
  theory: /^##\s+(?!Práctica|Ejercicios|Ejemplos)/i
}
```

---

## Sistema de Iconos

### Por Tipo de Componente

```
Teoría:       📘 💡 🔬 ⚗️ 🧪
Práctica:     🎯 ✏️ 📝 ⚡ 💪
Ejercicio:    🎯 📋 ✅ ❓ 🤔
Ejemplo:      📝 ✨ 💫 🌟 ⭐
Solución:     ✅ 🔓 💡 🎉 ✨
Tip:          💭 💡 🔔 ⚠️ 📌
Advertencia:  ⚠️ ❗ 🚨 ⛔ 🔴
Info:         ℹ️ 📢 💬 🔵 📘
Video:        📺 🎥 ▶️ 🎬 📹
```

---

## Flujo de Conversión

### Input (Tu dictado en Markdown)
```markdown
## Enlace iónico

El enlace iónico es transferencia de electrones.

https://youtu.be/GSLfI-fvUVo

Entre metal y no metal.

## Práctica

Ejercicio 1: Determina si NaCl es iónico.

Solución: Sí, porque Na es metal y Cl es no metal.
```

### Output (Procesado con componentes)
```markdown
## Enlace iónico

El enlace iónico es transferencia de electrones entre un metal y un no metal.

::video-embed
---
url: "https://youtu.be/GSLfI-fvUVo"
title: "Enlace iónico - Explicación"
---
::

::info-box{type="info" title="💡 Concepto Clave"}
El enlace iónico ocurre entre un **metal** (cede electrones) y un **no metal** (recibe electrones).
::

## Práctica

::exercise-block
---
title: "Ejercicio 1: Identificación de Enlace"
difficulty: "easy"
question: "Determina si NaCl presenta enlace iónico y justifica tu respuesta."
solution: "Sí, NaCl presenta enlace iónico porque el Sodio (Na) es un metal que cede su electrón de valencia, mientras que el Cloro (Cl) es un no metal que lo recibe."
---
::
```

---

## Propuesta de Implementación

### Fase 1: Crear Componentes (Día 1-2)
- [ ] ExerciseBlock.vue
- [ ] ExampleBox.vue  
- [ ] SolutionToggle.vue
- [ ] VideoEmbed.vue
- [ ] PracticeSection.vue (wrapper automático)

### Fase 2: Script de Detección (Día 2-3)
```javascript
// scripts/procesar-contenido-educativo.js
- Detectar secciones (## Práctica, ## Ejemplos)
- Detectar URLs de video y convertir a VideoEmbed
- Detectar ejercicios y envolver en ExerciseBlock
- Aplicar formato didáctico automático
```

### Fase 3: Documentación (Día 3-4)
- Guía de dictado de contenido
- Plantillas por tipo de contenido
- Ejemplos de uso de cada componente

---

## Ejemplo Completo de Flujo

### 1. Tú Dictas (Markdown Simple)
```markdown
## Factorización

Video: https://youtu.be/abc123

La factorización descompone un polinomio en productos.

Ejemplo: x² + 5x + 6 = (x + 2)(x + 3)

## Práctica

Ejercicio 1: Factoriza x² + 7x + 12

Solución: (x + 3)(x + 4)
```

### 2. Sistema Procesa Automáticamente
```markdown
## Factorización

::video-embed
---
url: "https://youtu.be/abc123"
title: "Factorización - Introducción"
---
::

::info-box{type="info" title="📘 Definición"}
La **factorización** es el proceso de descomponer un polinomio en un producto de factores más simples.
::

::example-box
---
title: "Ejemplo: Factorización Simple"
steps:
  - title: "Polinomio original"
    description: "x² + 5x + 6"
  - title: "Buscar dos números que sumen 5 y multipliquen 6"
    description: "Los números son 2 y 3"
  - title: "Factorización"
    calculation: "(x + 2)(x + 3)"
---
::

## Práctica

::exercise-block
---
title: "Ejercicio 1: Práctica de Factorización"
difficulty: "easy"
question: "Factoriza el siguiente polinomio: x² + 7x + 12"
hints:
  - "Busca dos números que sumen 7"
  - "Esos mismos números deben multiplicar 12"
---

::solution-toggle
---
buttonText: "Ver solución"
---
**Paso 1:** Identificar coeficientes (a=1, b=7, c=12)

**Paso 2:** Encontrar factores de 12 que sumen 7: 3 y 4

**Paso 3:** Factorización: **(x + 3)(x + 4)**
::

::
```

---

## ¿Te parece bien esta estructura?

Ahora necesito tu aprobación para:
1. ✅ ¿Te gusta esta paleta de colores (azul teoría, verde práctica)?
2. ✅ ¿Los componentes propuestos cubren tus necesidades?
3. ✅ ¿El flujo de trabajo (tú dictas → yo formateo) funciona para ti?

Si apruebas, empiezo a crear los componentes y el script de procesamiento.

# Ejemplos de Conversión de Componentes

Este documento muestra ejemplos completos de cómo el contenido en `content-source/` se transforma en componentes Vue en `content/`.

---

## 🎯 Ejemplo Completo: Enlace Químico

### Archivo Fuente (`content-source/quimica/05-enlace-quimico.md`)

```markdown
---
title: Enlace químico
description: El enlace químico y sus tipos.
---

## Resumen

En esta unidad se estudia el enlace químico...

## Enlace químico - introducción

https://youtu.be/Q4ObzTpgVBI?si=Utjbde6LtTmybxB7

El enlace químico es fundamental en la formación de sustancias.

A continuación se presentan los tipos de enlace:

| Tipo      | Mecanismo           | Participantes        |
|-----------|---------------------|----------------------|
| Iónico    | Robo de electrones  | Metal + No metal     |
| Covalente | Compartir           | No metal + No metal  |
| Metálico  | Colectivo           | Metal + Metal        |

## Enlace iónico

https://youtu.be/GSLfI-fvUVo?si=itoCwBOorU_hcNRq

El enlace iónico se forma por transferencia de electrones.

Mecanismo:
1. Metal cede electrones
2. No metal recibe electrones
3. Se forman iones
4. Atracción electrostática

Ejemplos:
- Cloruro de Sodio (NaCl)
- Óxido de Potasio (K₂O)
- Cloruro de Potasio (KCl)

## Enlace covalente

El enlace covalente se forma por compartimiento de electrones.

Características:
- Se forma por compartimiento
- Ocurre entre no metales
- Solo electrones de valencia
- Busca completar el octeto

Excepción importante: El hidrógeno no cumple la regla del octeto.
Solo necesita 2 electrones (regla del dueto).

### ✏️ Práctica: Electronegatividad

Complete la tabla calculando la diferencia de electronegatividad:

| Compuesto | ΔEN | Tipo de enlace |
|-----------|-----|----------------|
| AZ        |     |                |
| DX        |     |                |
| X2        |     |                |
```

---

### Archivo Final (`content/quimica/05-enlace-quimico.md`)

```markdown
---
title: Enlace químico
description: El enlace químico y sus tipos.
---

## Resumen

En esta unidad se estudia el enlace químico...

## Enlace químico - introducción

https://youtu.be/Q4ObzTpgVBI?si=Utjbde6LtTmybxB7

El enlace químico es fundamental en la formación de sustancias.

::comparison-card
---
title: "Tipos de Enlace Químico"
columns: 3
items:
  - title: "🔋 Enlace Iónico"
    description: "Robo de electrones"
    details: "Metal + No metal. Alta polaridad, sólidos cristalinos"
    color: "primary"
  - title: "🤝 Enlace Covalente"
    description: "Compartimiento de electrones"
    details: "No metal + No metal. Moléculas, baja polaridad"
    color: "secondary"
  - title: "⚡ Enlace Metálico"
    description: "Compartimiento colectivo"
    details: "Metal + Metal. Mar de electrones, conductividad"
    color: "accent"
---
::

## Enlace iónico

https://youtu.be/GSLfI-fvUVo?si=itoCwBOorU_hcNRq

El enlace iónico se forma por transferencia de electrones.

::process-steps
---
title: "Mecanismo de Formación del Enlace Iónico"
steps:
  - title: "Metal cede electrones"
    description: "El átomo metálico pierde electrones de valencia quedando con carga positiva"
    icon: "1️⃣"
  - title: "No metal recibe electrones"
    description: "El átomo no metálico gana electrones quedando con carga negativa"
    icon: "2️⃣"
  - title: "Se forman iones"
    description: "Catión (+) del metal y anión (−) del no metal"
    icon: "3️⃣"
  - title: "Atracción electrostática"
    description: "Los iones con cargas opuestas se atraen formando el enlace"
    icon: "4️⃣"
---
::

::key-points
---
title: "Ejemplos de Enlaces Iónicos"
points:
  - text: "Cloruro de Sodio (NaCl): El sodio cede 1 electrón al cloro"
    highlight: true
  - text: "Óxido de Potasio (K₂O): Dos átomos de potasio ceden electrones al oxígeno"
  - text: "Cloruro de Potasio (KCl): Similar al NaCl, metal alcalino + halógeno"
---
::

## Enlace covalente

El enlace covalente se forma por compartimiento de electrones.

::key-points
---
title: "Características del Enlace Covalente"
points:
  - text: "Se forma por compartimiento de electrones entre átomos"
  - text: "Ocurre entre no metales"
  - text: "Solo participan electrones de valencia"
  - text: "Busca completar el octeto (8 electrones en última capa)"
---
::

::info-box{type="warning" title="⚠️ Excepción: Regla del Dueto"}
El **hidrógeno** no cumple la regla del octeto. Solo necesita **2 electrones** en su última capa (regla del dueto).

El gas noble más cercano al hidrógeno es el **helio (He)**, que tiene dos electrones. Por eso, el hidrógeno busca tener solo **dos electrones de valencia** para estar estable.
::

### ✏️ Práctica: Electronegatividad

::practice-exercise
---
title: "Práctica: Cálculo de Electronegatividad"
instructions: "Complete la tabla calculando la diferencia de electronegatividad y determinando el tipo de enlace químico formado."
type: "table"
---

| Compuesto | ΔEN | Tipo de enlace |
|-----------|-----|----------------|
| AZ        |     |                |
| DX        |     |                |
| X2        |     |                |

**Recordatorio:** 0-0,4 (no polar), 0,4-1,7 (polar), >1,7 (iónico)

::
```

---

## 📊 Tabla de Decisiones

| Contenido en `content-source/` | Componente en `content/` | Cuándo Aplicar |
|--------------------------------|--------------------------|----------------|
| **Tabla markdown** | `::comparison-card` | Siempre que haya tabla comparativa |
| **Título con "Práctica"** | `::practice-exercise` | Automático cuando título incluye "Práctica", "Ejercicio", "✏️" |
| **Lista de características** | `::key-points` | Lista de conceptos importantes, ejemplos, características |
| **Pasos numerados** | `::process-steps` | Procedimientos, mecanismos, pasos secuenciales |
| **Excepción/Advertencia** | `::info-box{type="warning"}` | Excepciones a reglas, advertencias importantes |
| **Concepto clave** | `::info-box{type="info"}` | Definiciones importantes, conceptos fundamentales |
| **Consejo pedagógico** | `::info-box{type="tip"}` | Tips, consejos, recordatorios |

---

## 🎨 Colores de ComparisonCard

Cuando conviertes tablas a `::comparison-card`, usa estos colores para mantener consistencia:

```yaml
items:
  - color: "primary"    # Primer concepto / Principal
  - color: "secondary"  # Segundo concepto / Alternativo
  - color: "accent"     # Tercer concepto / Destacado
  - color: "success"    # Cuarto concepto / Positivo
  - color: "warning"    # Quinto concepto / Atención
```

**Ejemplo con 3 columnas:**
```markdown
::comparison-card
---
title: "..."
columns: 3
items:
  - title: "..."
    color: "primary"     # Verde
  - title: "..."
    color: "secondary"   # Azul
  - title: "..."
    color: "accent"      # Morado
---
::
```

---

## ✅ Checklist de Conversión

Antes de dar por terminada una conversión, verificar:

- [ ] **Títulos:** Mismo número en ambos archivos (`grep -c "^##"`)
- [ ] **Videos:** Todos los enlaces de YouTube/TikTok preservados
- [ ] **Tablas:** Todas convertidas a `::comparison-card`
- [ ] **Prácticas:** Todos los títulos con "Práctica" tienen `::practice-exercise`
- [ ] **Listas importantes:** Convertidas a `::key-points`
- [ ] **Procesos:** Convertidos a `::process-steps`
- [ ] **Excepciones:** Marcadas con `::info-box{type="warning"}`
- [ ] **Frontmatter:** Copiado correctamente con `---` válidos
- [ ] **Sintaxis MDC:** Sin errores de parsing

---

## 🚫 Errores Comunes a Evitar

### ❌ Error: Frontmatter Corrupto
```markdown
------                    ❌ Dobles guiones extra
title: Enlace químico
------
```

**Correcto:**
```markdown
---                       ✅ Tres guiones exactos
title: Enlace químico
---
```

### ❌ Error: Sintaxis MDC Incorrecta
```markdown
::comparison-card
title: "..."              ❌ Falta el separador ---
items:
```

**Correcto:**
```markdown
::comparison-card
---                       ✅ Separador YAML
title: "..."
items:
---
::                        ✅ Cierre del componente
```

### ❌ Error: Eliminar Títulos
```markdown
## Enlace iónico          ❌ Eliminar sección
## Enlace covalente       ❌ Fusionar contenido
```

**Correcto:**
```markdown
## Enlace iónico          ✅ Mantener ambos títulos
...contenido...

## Enlace covalente       ✅ Preservar jerarquía
...contenido...
```

---

## 📝 Plantillas Rápidas

### Plantilla: KeyPoints
```markdown
::key-points
---
title: "Título de la Lista"
points:
  - text: "Primer punto importante"
  - text: "Segundo punto importante"
    highlight: true           # Opcional: destacar
  - text: "Tercer punto"
---
::
```

### Plantilla: ProcessSteps
```markdown
::process-steps
---
title: "Nombre del Proceso"
steps:
  - title: "Paso 1"
    description: "Descripción detallada"
    icon: "1️⃣"
  - title: "Paso 2"
    description: "Descripción detallada"
    icon: "2️⃣"
---
::
```

### Plantilla: InfoBox
```markdown
::info-box{type="warning" title="⚠️ Título"}
Contenido del mensaje de advertencia o información importante.
::
```

### Plantilla: ComparisonCard
```markdown
::comparison-card
---
title: "Título de la Comparación"
columns: 3
items:
  - title: "Opción 1"
    description: "Descripción breve"
    details: "Detalles adicionales"
    color: "primary"
  - title: "Opción 2"
    description: "Descripción breve"
    details: "Detalles adicionales"
    color: "secondary"
---
::
```

### Plantilla: PracticeExercise
```markdown
::practice-exercise
---
title: "Título del Ejercicio"
instructions: "Instrucciones claras para el estudiante"
type: "table"              # o "questions" o "mixed"
---

Contenido del ejercicio (tabla, preguntas, etc.)

::
```

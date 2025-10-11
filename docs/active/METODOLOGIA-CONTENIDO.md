# Metodología de Conversión de Contenido Markdown

## 🎓 Rol Pedagógico de la IA

### Principio Fundamental
**La IA tiene un rol didáctico determinante.** No se trata solo de convertir formato, sino de tomar decisiones pedagógicas para mejorar la experiencia de aprendizaje del estudiante.

### Flujo de Trabajo del Usuario
1. El usuario coloca el **contenido en bruto** en la carpeta `content-source/`
2. Este contenido puede tener:
   - Tablas markdown
   - Texto plano sin estructura
   - Listas simples
   - Enlaces de YouTube/TikTok
   - Información desordenada

### Decisiones de la IA
La IA NO renderiza el contenido tal cual. En su lugar:

1. **Lee y analiza** el contenido pedagógicamente
2. **Decide cómo presentar** cada pieza de información
3. **Elige el componente Vue** más apropiado para cada caso
4. **Reorganiza y estructura** para facilitar el aprendizaje
5. **Resume y simplifica** sin perder contenido educativo esencial

**REGLA DE ORO:** Si ves una tabla markdown → Conviértela en el componente Vue apropiado (ComparisonCard, KeyPoints, ProcessSteps, etc.). **NUNCA dejar tablas markdown en el resultado final**
## 📋 Flujo de Trabajo

### Paso 1: Análisis del archivo original
1. Identificar **TODAS** las tablas markdown que deben convertirse a componentes Vue
2. Detectar el tipo de información (comparación, proceso, listado, ejercicio)
3. Clasificar según componente apropiado
4. Considerar la experiencia móvil (las tablas markdown son pésimas en móvil)

### Paso 2: Mapeo de componentes

#### 🔄 ComparisonCard
**Usar cuando:** Necesitas comparar 2 o más conceptos lado a lado

**Estructura típica:**
```markdown
::comparison-card
---
title: "Título de la comparación"
columns: 2  # o 3, según el número de items
items:
  - title: "Concepto 1"
    description: "Descripción breve"
    details: "Explicación detallada"
    color: "primary"  # primary | secondary | accent | success | warning
---
::
```

**Cuándo usar cada color:**
- `primary` (azul): Conceptos principales, primeros en una secuencia
- `secondary` (violeta): Conceptos secundarios, alternativas
- `accent` (rosa): Destacar algo especial o diferente
- `success` (verde): Resultados positivos, características favorables
- `warning` (amarillo): Advertencias, casos especiales

#### 📦 InfoBox
**Usar cuando:** Necesitas resaltar información importante, advertencias o tips

**Estructura:**
```markdown
::info-box{type="info" title="Título"}
Contenido del box. Puede incluir **markdown**.
::
```

**Tipos disponibles:**
- `info` (azul 💡): Información general, conceptos clave
- `success` (verde ✅): Logros, resultados positivos
- `warning` (amarillo ⚠️): Advertencias, casos especiales
- `error` (rojo ❌): Errores comunes, cosas a evitar
- `tip` (cian 💭): Tips, consejos prácticos

#### 📝 KeyPoints
**Usar cuando:** Tienes una lista de puntos importantes numerados

**Estructura:**
```markdown
::key-points
---
title: "Título de los puntos"
points:
  - text: "Punto 1"
    highlight: true  # opcional, para destacar
  - text: "Punto 2"
---
::
```

#### 🔢 ProcessSteps
**Usar cuando:** Describes un proceso secuencial con pasos

**Estructura:**
```markdown
::process-steps
---
title: "Nombre del proceso"
orientation: "vertical"  # o "horizontal"
steps:
  - title: "Paso 1"
    description: "Descripción del paso"
    icon: "1️⃣"  # opcional
---
::
```

### Paso 3: Reglas de estilo consistentes

#### Títulos de sección (##)
- Usar solo `##` para secciones principales
- NO agregar emojis en títulos.
- **Capitalización:** Solo mayúscula inicial, resto en minúsculas
  - ✅ `## Enlace iónico`
  - ❌ `## Enlace Iónico`
  - ❌ `## ENLACE IÓNICO`

#### Subtítulos de sección (###)
- Usar para subsecciones dentro de una sección principal
- Pueden llevar emoji al inicio si es descriptivo
- **Capitalización:** Solo mayúscula inicial
  - ✅ `### Mecanismo de formación`
  - ❌ `### Mecanismo de Formación`

#### Componentes
- SIEMPRE usar `title` dentro del componente en lugar de título markdown previo
- Los títulos de componentes SÍ pueden llevar emoji
- **Capitalización en títulos de componentes:** Solo mayúscula inicial
  - ✅ `title: "Clasificación de los enlaces químicos"`
  - ❌ `title: "Clasificación de los Enlaces Químicos"`
- **Capitalización en títulos de tarjetas (items):** Solo mayúscula inicial
  - ✅ `title: "🔋 Enlace iónico"`
  - ❌ `title: "🔋 Enlace Iónico"`
- **Capitalización en descripciones y detalles:** Minúsculas después de punto
  - ✅ `details: "Metal + no metal. Alta conductividad"`
  - ❌ `details: "Metal + No Metal. Alta Conductividad"`
- Mantener spacing consistente: línea vacía antes y después del componente

#### Ejercicios (PracticeExercise)
- **NUNCA usar tablas markdown dentro de ejercicios**
- Convertir ejercicios con tablas en:
  1. **ComparisonCard** con información de entrada
  2. **Preguntas numeradas** claras y específicas
  3. **InfoBox** con pistas o recordatorios
- Ejemplo: En lugar de tabla para completar → Tarjetas con datos + preguntas guiadas

#### Videos e imágenes
- Agrupar al inicio de cada sección
- Links de YouTube/TikTok antes del texto explicativo
- El sistema detecta automáticamente:
  - Enlaces de YouTube individuales
  - Playlists de YouTube
  - Enlaces de TikTok

## 🎨 Sistema de Diseño

### Jerarquía de Colores

**Para ComparisonCard:**
1. Si hay 2-3 items: usar `primary`, `secondary`, `accent`
2. Si hay 4+ items: alternar todos los colores disponibles
3. Mantener mismo color para items del mismo "nivel" conceptual

**Para InfoBox:**
1. Conceptos teóricos: `info`
2. Definiciones importantes: `tip`
3. Excepciones/casos especiales: `warning`
4. Errores comunes: `error`
5. Confirmaciones: `success`

### Espaciado
```markdown
## Sección principal

Texto introductorio de la sección.

::componente
---
...
---
::

Texto después del componente.

### Subsección
```

### Iconos Sistemáticos

**Emojis recomendados por categoría:**
- Ciencia: 🔬 🧪 ⚗️ 🧬 ⚛️
- Procesos: 1️⃣ 2️⃣ 3️⃣ 4️⃣ ➡️ 🔄
- Conceptos: 💡 🎯 📋 📝 📊
- Advertencias: ⚠️ ❗ ⛔ 🚫
- Positivo: ✅ ✔️ 👍 💚
- Tipos: 🔋 ⚡ 🤝 📏 🧲

## 📝 Ejemplos de Conversión

### Ejemplo 1: Tabla comparativa → ComparisonCard

#### ❌ ANTES (Markdown con tabla):

```markdown
## Tipos de enlace

| Tipo | Mecanismo | Participantes |
|------|-----------|---------------|
| Iónico | Robo de electrones | Metal + No metal |
| Covalente | Compartimiento | No metal + No metal |
```

#### ✅ DESPUÉS (ComparisonCard con capitalización correcta):

```markdown
## Tipos de enlace

::comparison-card
---
title: "Clasificación de enlaces químicos"
columns: 2
items:
  - title: "🔋 Enlace iónico"
    description: "Robo o transferencia de electrones"
    details: "Metal + no metal. Alta diferencia de electronegatividad"
    color: "primary"
  - title: "🤝 Enlace covalente"
    description: "Compartimiento de electrones"
    details: "No metal + no metal. Comparten pares de electrones"
    color: "secondary"
---
::
```

### Ejemplo 2: Ejercicio con tabla → ComparisonCard + Preguntas

#### ❌ ANTES (Tabla para completar):

```markdown
### ✏️ Práctica

Complete la tabla:

| Compuesto | ΔEN | Tipo de enlace |
|-----------|-----|----------------|
| NaCl | | |
| H2O | | |
```

#### ✅ DESPUÉS (Componentes interactivos):

```markdown
::practice-exercise
---
title: "Práctica: cálculo de electronegatividad"
instructions: "Determine la diferencia de electronegatividad y el tipo de enlace."
---

**Datos:**

::comparison-card
---
columns: 2
items:
  - title: "NaCl"
    description: "Sodio (Na): EN = 0.93"
    details: "Cloro (Cl): EN = 3.16"
    color: "primary"
  - title: "H₂O"
    description: "Hidrógeno (H): EN = 2.20"
    details: "Oxígeno (O): EN = 3.44"
    color: "secondary"
---
::

**Preguntas:**
1. **NaCl**: ¿Cuál es la ΔEN? ¿Qué tipo de enlace se forma?
2. **H₂O**: ¿Cuál es la ΔEN? ¿Qué tipo de enlace se forma?

::info-box{type="tip" title="💭 Recordatorio"}
**ΔEN = EN mayor − EN menor**

Clasificación: 0–0.4 (covalente no polar), 0.4–1.7 (covalente polar), >1.7 (iónico)
::

::
```

## 🔄 Checklist de Conversión

### Estructura y Componentes
- [ ] **TODAS las tablas markdown** convertidas a componentes Vue
- [ ] Tablas comparativas → ComparisonCard
- [ ] Tablas de ejercicios → ComparisonCard + preguntas + InfoBox
- [ ] Listas importantes → KeyPoints
- [ ] Procesos secuenciales → ProcessSteps
- [ ] Conceptos clave → InfoBox

### Capitalización
- [ ] Títulos de secciones (##): Solo mayúscula inicial
- [ ] Subtítulos (###): Solo mayúscula inicial
- [ ] Títulos de componentes: Solo mayúscula inicial
- [ ] Títulos de tarjetas: Solo mayúscula inicial
- [ ] Descripciones: Minúsculas después de punto
- [ ] Sin capitalización excesiva en sustantivos comunes

### Estilo y Formato
- [ ] Títulos ## sin emojis
- [ ] Títulos de componentes con emoji descriptivo si es relevante
- [ ] Colores asignados lógicamente según jerarquía
- [ ] Spacing consistente (líneas vacías antes/después de componentes)
- [ ] Videos/links agrupados al inicio de cada sección
- [ ] Emojis consistentes por categoría
- [ ] Sin títulos markdown redundantes antes de componentes

### Experiencia Móvil
- [ ] Cero tablas markdown (pésimas en móvil)
- [ ] ComparisonCard responsive con columns apropiadas
- [ ] Texto estructurado que se lee bien en pantallas pequeñas

## 🤖 Flujo de Trabajo con la IA

### Usuario
1. Coloca archivo **en bruto** en `content-source/[materia]/archivo.md`
2. El archivo puede tener:
   - Tablas markdown sin formato
   - Texto plano
   - Enlaces sin procesar
   - Estructura básica o nula

### IA (Rol Pedagógico)
1. **Lee** el contenido del archivo fuente
2. **Analiza** pedagógicamente cada sección
3. **Decide** qué componente Vue usar para cada pieza
4. **Convierte** todas las tablas a componentes responsive
5. **Estructura** el contenido de forma didáctica
6. **Aplica** reglas de capitalización y estilo
7. **Genera** archivo final en `content/[materia]/archivo.md, con el mismo nombre que el usuario subió el archivo en bruto en la carpeta
`content-source/[materia]/archivo.md`

### Resultado
- ✅ Archivo completamente estructurado con componentes Vue
- ✅ Cero tablas markdown
- ✅ Responsive y optimizado para móvil
- ✅ Capitalización consistente
- ✅ Experiencia de aprendizaje mejorada

## ⚠️ Reglas Críticas

### NUNCA hacer:
- ❌ Dejar tablas markdown en el resultado final
- ❌ Capitalizar en exceso (Enlace Iónico → enlace iónico)
- ❌ Poner títulos markdown redundantes antes de componentes
- ❌ Ignorar la experiencia móvil

### SIEMPRE hacer:
- ✅ Convertir TODAS las tablas a componentes Vue
- ✅ Usar capitalización consistente (solo mayúscula inicial)
- ✅ Pensar pedagógicamente (no solo convertir formato)
- ✅ Optimizar para experiencia móvil
- ✅ Usar el componente Vue más apropiado para cada caso

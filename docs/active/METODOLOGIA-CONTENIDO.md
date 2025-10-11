# Metodología de Conversión de Contenido Markdown

## 📋 Flujo de Trabajo

### Paso 1: Análisis del archivo original
1. Identificar tablas de Markdown que deben convertirse
2. Detectar el tipo de información (comparación, proceso, listado)
3. Clasificar según componente apropiado

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
- NO agregar emojis en títulos de nivel 2
- Mantener minúsculas después de mayúscula inicial

#### Subtítulos de sección (###)
- Usar para subsecciones dentro de una sección principal
- Pueden llevar emoji al inicio si es descriptivo
- Ejemplo: `### 💡 Concepto clave`

#### Componentes
- SIEMPRE usar `title` dentro del componente en lugar de título markdown previo
- Los títulos de componentes SÍ pueden llevar emoji
- Mantener spacing consistente: línea vacía antes y después del componente

#### Videos e imágenes
- Agrupar al inicio de cada sección
- Links de YouTube/TikTok antes del texto explicativo

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

## 📝 Ejemplo de Conversión

### ❌ ANTES (Markdown inconsistente):

```markdown
## Tipos de enlace

| Iónico | Covalente |
|--------|-----------|
| Robo   | Comparte  |

### Enlaces iónicos ejemplos

- NaCl
- K2O
```

### ✅ DESPUÉS (Con componentes):

```markdown
## Tipos de enlace

::comparison-card
---
title: "Clasificación de Enlaces Químicos"
columns: 2
items:
  - title: "🔋 Iónico"
    description: "Robo o transferencia de electrones"
    details: "Entre metal y no metal. Alta diferencia de electronegatividad."
    color: "primary"
  - title: "🤝 Covalente"
    description: "Compartimiento de electrones"
    details: "Entre no metales. Comparten pares de electrones."
    color: "secondary"
---
::

::key-points
---
title: "Ejemplos de Enlaces Iónicos"
points:
  - text: "Cloruro de Sodio (NaCl): El sodio cede su electrón al cloro"
    highlight: true
  - text: "Óxido de Potasio (K₂O): Formado entre metal y no metal"
---
::
```

## 🔄 Checklist de Conversión

- [ ] Todas las tablas convertidas a ComparisonCard
- [ ] Títulos consistentes (## para secciones, sin emoji)
- [ ] Títulos de componentes con emoji descriptivo
- [ ] Colores asignados lógicamente
- [ ] InfoBox usado para conceptos importantes
- [ ] ProcessSteps para procesos secuenciales
- [ ] KeyPoints para listas importantes
- [ ] Spacing consistente (líneas vacías)
- [ ] Videos/links agrupados al inicio de sección
- [ ] Emojis consistentes por categoría
- [ ] Sin títulos markdown redundantes con componentes

## 🤖 Flujo de Trabajo Automatizado

1. **Enviar archivo original**: Subes el `.md` existente
2. **Análisis automático**: Identifico tablas, listas, estructuras
3. **Conversión sistemática**: Aplico reglas de esta metodología
4. **Archivo mejorado**: Genero versión `-mejorado.md`
5. **Revisión**: Puedes revisar y aprobar cambios
6. **Aplicación**: Reemplazo archivo original si apruebas

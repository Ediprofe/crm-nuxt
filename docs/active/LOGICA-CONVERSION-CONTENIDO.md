# 🔄 Lógica de Conversión de Contenido

## Objetivo

Convertir archivos markdown originales (`*-old.md`) a versión mejorada con componentes Vue, **sin omitir NINGÚN contenido**.

---

## 📋 Regla Simple y Clara

### ✅ TODO TÍTULO = CONTENIDO OBLIGATORIO

**Si hay un título (## o ###), hay contenido que NO se puede omitir.**

```markdown
## Cualquier título         ← HAY TÍTULO = CONTENIDO OBLIGATORIO
### Cualquier subtítulo     ← HAY TÍTULO = CONTENIDO OBLIGATORIO
```

**No importa si:**
- ❌ Tiene video o no
- ❌ Es largo o corto
- ❌ Parece redundante

**Si existe el título, el contenido se MANTIENE.**

---

## 📋 Reglas de Conversión

### 1. TODO Título se Conserva (NO SE OMITE NADA)

**Regla Universal:**
```markdown
## Título de la sección
### Subtítulo

[TODO el contenido debajo se conserva]
```

**Acción:** Mantener TODA la estructura de títulos y TODO el contenido.

---

### 2. Secciones de Práctica/Taller → PracticeExercise

**Patrón a detectar:**
```markdown
### ✏️ Practica

[Contenido del ejercicio con tablas, preguntas, etc.]
```

o

```markdown
### 🧪 Taller

[Contenido del ejercicio...]
```

**Regla:** Si un título contiene las palabras **"Practica"** o **"Taller"** (con o sin emoji), debe convertirse en componente `PracticeExercise`.

**Conversión:**

**ANTES:**
```markdown
### ✏️ Practica

La siguiente tabla presenta información sobre los elementos A, D, X y Z:

| Elemento | Electrones de valencia |
| --- | --- |
| A | 1 |
| D | 2 |

Complete la tabla...
```

**DESPUÉS:**
```markdown
::practice-exercise
---
title: "Práctica: [Tema de la sección anterior]"
instructions: "Complete la tabla..."
---

La siguiente tabla presenta información sobre los elementos A, D, X y Z:

| Elemento | Electrones de valencia |
| --- | --- |
| A | 1 |
| D | 2 |

::
```

---

## 🎯 Proceso de Conversión

### Paso 1: Análisis del Archivo Original

1. **Leer el archivo** `*-old.md`
2. **Identificar TODOS los títulos** (## y ###)
3. **Principio:** TODO título = contenido obligatorio
4. **Identificar secciones** de Práctica/Taller para aplicar componente especial
5. **NUNCA omitir ningún título ni su contenido**

### Paso 2: Estructura de Secciones

Cada sección identificada debe seguir este formato:

```markdown
## Título de la sección

[Videos de YouTube/TikTok si existen]

[Texto introductorio]

[Componentes Vue según el tipo de contenido:]
- ComparisonCard para tablas comparativas
- InfoBox para advertencias/tips
- KeyPoints para listas importantes
- ProcessSteps para procesos secuenciales
- PracticeExercise para ejercicios

[Texto adicional si es necesario]
```

### Paso 3: Conversión de Contenido

#### A. Tablas Comparativas → ComparisonCard

**Criterio:** Tabla con 2-4 columnas comparando conceptos diferentes

**Ejemplo:**
```markdown
::comparison-card
---
title: "Tipos de Enlace"
columns: 3
items:
  - title: "🔋 Iónico"
    description: "Transferencia de electrones"
    details: "Metal + No metal"
    color: "primary"
  - title: "🤝 Covalente"
    description: "Compartimiento de electrones"
    details: "No metal + No metal"
    color: "secondary"
---
::
```

#### B. Advertencias/Excepciones → InfoBox

**Criterio:** Información que necesita destacarse (excepciones, reglas importantes, tips)

**Ejemplo:**
```markdown
::info-box{type="warning" title="⚠️ Excepción Importante"}
El **hidrógeno** no cumple la regla del octeto. Solo necesita **2 electrones**.
::
```

#### C. Listas Numeradas → KeyPoints o ProcessSteps

**KeyPoints:** Cuando son puntos independientes
```markdown
::key-points
---
title: "Ejemplos de Enlaces Iónicos"
points:
  - text: "NaCl: Sodio cede electrón al cloro"
  - text: "K₂O: Potasio y oxígeno forman enlace iónico"
---
::
```

**ProcessSteps:** Cuando son pasos secuenciales
```markdown
::process-steps
---
title: "Formación del Enlace Iónico"
steps:
  - title: "Paso 1: Transferencia"
    description: "El metal cede electrones"
  - title: "Paso 2: Formación de iones"
    description: "Se forman cationes y aniones"
---
::
```

#### D. Ejercicios → PracticeExercise

**Criterio:** Sección con título "Practica" o "Taller"

```markdown
::practice-exercise
---
title: "Práctica: Cálculo de Electronegatividad"
instructions: "Complete la tabla calculando ΔEN"
---

[Contenido del ejercicio con tablas, preguntas, etc.]

::
```

---

## 📝 Checklist de Conversión Completa

Para cada archivo `*-old.md`:

- [ ] ✅ **CRÍTICO:** Verificar que TODOS los títulos (## y ###) estén presentes
- [ ] ✅ **CRÍTICO:** Verificar que TODO el contenido bajo cada título esté conservado
- [ ] ✅ Identificar secciones de Práctica/Taller
- [ ] ✅ Convertir tablas comparativas a ComparisonCard
- [ ] ✅ Convertir advertencias/tips a InfoBox
- [ ] ✅ Convertir listas a KeyPoints o ProcessSteps según corresponda
- [ ] ✅ Convertir ejercicios a PracticeExercise
- [ ] ✅ Mantener todos los enlaces de videos
- [ ] ✅ Verificar spacing correcto (líneas vacías)
- [ ] ✅ Asignar colores lógicos a ComparisonCard según jerarquía
- [ ] ✅ Agregar emojis a títulos de items en componentes
- [ ] ✅ **VERIFICACIÓN FINAL:** Contar títulos en archivo original vs archivo convertido (deben ser iguales)

---

## 🔍 Ejemplo Completo de Análisis

### Archivo: `05-enlace-quimico-old.md`

#### Secciones Detectadas con Videos (NO OMITIR):

| Línea | Título | Video |
|-------|--------|-------|
| 16 | `## Enlace químico - introducción` | ✅ YouTube presente |
| 34 | `## Enlace iónico` | ✅ YouTube + TikTok |
| 71 | `## Enlace covalente` | ✅ YouTube + TikTok |
| 104 | `### Enlace covalente doble` | ✅ YouTube + TikTok |
| 116 | `### Enlace covalente triple` | ✅ YouTube + TikTok |
| 145 | `## Enlace metálico` | ✅ YouTube + TikTok |
| 178 | `## Escalas de electronegatividad` | ✅ YouTube + TikTok |
| 235 | `## Tipos de enlace químico - comparativo` | ✅ YouTube + TikTok |
| 274 | `## Propiedades periódicas` | ✅ YouTube + TikTok |

#### Secciones de Práctica Detectadas:

| Línea | Título | Acción |
|-------|--------|--------|
| 206 | `### ✏️ Practica` (Electronegatividad) | ✅ Convertir a PracticeExercise |
| 257 | `### ✏️ Practica` (Propiedades enlaces) | ✅ Convertir a PracticeExercise |

---

## ⚠️ Errores Comunes a Evitar

1. ❌ **CRÍTICO: Omitir CUALQUIER título** - Si hay un título, hay contenido obligatorio
2. ❌ **Eliminar contenido** bajo algún título porque "parece redundante"
3. ❌ **Ignorar ejercicios** sin el componente adecuado
4. ❌ **No verificar** conteo de títulos: original vs convertido
5. ❌ **Omitir subsecciones** (###) pensando que son menos importantes
6. ❌ **Olvidar enlaces** de videos o recursos
7. ❌ **Simplificar en exceso** eliminando información valiosa

---

## ✅ Resultado Esperado

El archivo mejorado debe tener:

1. ✅ **TODOS los títulos** del archivo original (mismo conteo)
2. ✅ **TODO el contenido** bajo cada título
3. ✅ **Todos los videos y enlaces** en su lugar correspondiente
4. ✅ **Componentes Vue** aplicados correctamente según el tipo de contenido
5. ✅ **Formato consistente** según la guía de componentes
6. ✅ **Ejercicios** con el componente PracticeExercise
7. ✅ **Mejor legibilidad** y estructura visual con componentes interactivos

**Fórmula simple:**
```
TODO el Contenido Original (100%) + Componentes Vue + Didáctica = Versión Mejorada
```

**Verificación:**
```bash
# Contar títulos en el original
grep -c "^##" archivo-old.md

# Contar títulos en el convertido  
grep -c "^##" archivo-mejorado.md

# DEBEN SER IGUALES ✅
```

**NO ES:**
```
Contenido Parcial (70%) + Componentes Vue = Versión Incompleta ❌
Omitir títulos porque "parecen redundantes" = ERROR ❌
```

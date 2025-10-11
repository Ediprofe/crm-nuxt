# Flujo de Conversión de Contenido

## 📂 Estructura de Carpetas

### `content-source/`
**Propósito:** Archivos markdown originales sin componentes Vue.
- Markdown puro y simple
- Solo sintaxis estándar (títulos, listas, tablas, enlaces)
- Videos como URLs planas
- **Es la fuente de verdad** para el contenido educativo

### `content/`
**Propósito:** Archivos markdown mejorados con componentes Vue.
- Mismo contenido que `content-source/` pero con componentes
- Se usan: ComparisonCard, InfoBox, KeyPoints, ProcessSteps, PracticeExercise
- **Es lo que ve el público** en la aplicación Nuxt

---

## 🎯 Metodología de Conversión

### **Filosofía de Trabajo**

El profesor escribe en `content-source/` usando **markdown simple y contenido crudo**. Copilot interpreta ese contenido crudo y lo transforma en una experiencia didáctica mejorada con componentes Vue en `content/`.

### **Roles Claros**

**👨‍🏫 El Profesor (escribe en `content-source/`):**
- Escribe contenido educativo en markdown plano
- Usa tablas markdown cuando quiere comparaciones
- Escribe listas, explicaciones y conceptos sin formato especial
- Marca secciones de práctica con títulos que incluyan "Práctica" o "Ejercicio"

**🤖 Copilot (genera `content/`):**
- Interpreta el contenido crudo pedagógicamente
- Decide qué componente Vue aplicar según el contexto
- Sintetiza y organiza didácticamente
- Mejora la presentación sin perder contenido

---

## 📋 Reglas de Conversión Automática

### **1️⃣ Títulos = SAGRADOS (Regla #1)**
```
✅ TODO título (## o ###) del archivo fuente DEBE aparecer en el archivo final
✅ Mantener la jerarquía exacta
✅ NUNCA eliminar títulos
✅ NUNCA fusionar secciones
```

**Verificación:**
```bash
# Contar títulos en ambos archivos (deben ser iguales)
grep -c "^##" content-source/quimica/05-enlace-quimico.md
grep -c "^##" content/quimica/05-enlace-quimico.md
```

### **2️⃣ Detección Automática: Títulos con "Práctica"**

Cuando Copilot detecta un título que contiene:
- "Práctica"
- "Ejercicio"
- "✏️" (emoji de lápiz)

**Acción:** Aplicar automáticamente el componente `::practice-exercise`

**Ejemplo:**
```markdown
# Archivo fuente (content-source/)
### ✏️ Práctica: Cálculo de electronegatividad

Complete la siguiente tabla...

| Compuesto | ΔEN | Tipo |
|-----------|-----|------|
| AZ        |     |      |
```

**Resultado (content/):**
```markdown
### ✏️ Práctica: Cálculo de electronegatividad

::practice-exercise
---
title: "Práctica: Cálculo de Electronegatividad"
instructions: "Complete la tabla calculando la diferencia de electronegatividad..."
type: "table"
---

| Compuesto | ΔEN | Tipo |
|-----------|-----|------|
| AZ        |     |      |

::
```

### **3️⃣ Detección Automática: Tablas Markdown**

Cuando Copilot detecta una **tabla markdown** en el archivo fuente:

**Acción:** Convertir automáticamente a `::comparison-card`

**Ejemplo:**
```markdown
# Archivo fuente (content-source/)
## Tipos de enlace

| Enlace   | Mecanismo | Participantes |
|----------|-----------|---------------|
| Iónico   | Robo      | Metal + No metal |
| Covalente| Compartir | No metal + No metal |
| Metálico | Colectivo | Metal + Metal |
```

**Resultado (content/):**
```markdown
## Tipos de enlace

::comparison-card
---
title: "Tipos de Enlace Químico"
columns: 3
items:
  - title: "🔋 Iónico"
    description: "Robo de electrones"
    details: "Metal + No metal"
    color: "primary"
  - title: "🤝 Covalente"
    description: "Compartir electrones"
    details: "No metal + No metal"
    color: "secondary"
  - title: "⚡ Metálico"
    description: "Compartir colectivo"
    details: "Metal + Metal"
    color: "accent"
---
::
```

### **4️⃣ Interpretación Inteligente: Contenido Crudo**

Copilot analiza el contenido y aplica el componente apropiado según el contexto pedagógico:

#### **📌 Listas Importantes → `::key-points`**

**Detecta:** Listas con conceptos clave, características, ejemplos

```markdown
# Archivo fuente
Características del enlace covalente:
- Se forma por compartimiento
- Ocurre entre no metales
- Solo electrones de valencia
- Busca completar el octeto
```

**Resultado:**
```markdown
::key-points
---
title: "Características del Enlace Covalente"
points:
  - text: "Se forma por compartimiento de electrones"
  - text: "Ocurre entre no metales"
  - text: "Solo participan electrones de valencia"
  - text: "Busca completar el octeto"
---
::
```

#### **🔄 Procesos Secuenciales → `::process-steps`**

**Detecta:** Pasos numerados, mecanismos, procedimientos

```markdown
# Archivo fuente
Formación del enlace iónico:
1. Metal cede electrones
2. No metal recibe electrones
3. Se forman iones (catión y anión)
4. Atracción electrostática
```

**Resultado:**
```markdown
::process-steps
---
title: "Formación del Enlace Iónico"
steps:
  - title: "Metal cede electrones"
    description: "El átomo metálico pierde electrones de valencia"
    icon: "1️⃣"
  - title: "No metal recibe electrones"
    description: "El átomo no metálico gana electrones"
    icon: "2️⃣"
  - title: "Se forman iones"
    description: "Catión (+) y anión (−)"
    icon: "3️⃣"
  - title: "Atracción electrostática"
    description: "Los iones se atraen formando el enlace"
    icon: "4️⃣"
---
::
```

#### **⚠️ Advertencias/Excepciones → `::info-box`**

**Detecta:** Excepciones, advertencias, conceptos importantes

```markdown
# Archivo fuente
Excepción: El hidrógeno no cumple la regla del octeto.
Solo necesita 2 electrones (regla del dueto).
```

**Resultado:**
```markdown
::info-box{type="warning" title="⚠️ Excepción: Regla del Dueto"}
El **hidrógeno** no cumple la regla del octeto. Solo necesita **2 electrones** en su última capa (regla del dueto).

El gas noble más cercano es el **helio (He)**, que tiene dos electrones.
::
```

---

## 🔄 Flujo de Trabajo Completo

### 1. **Crear/Editar Contenido**
```bash
# Trabajar SIEMPRE en content-source/
content-source/quimica/05-enlace-quimico.md  # ← Editar aquí
```

**Contenido:** Markdown simple, sin componentes Vue.

### 2. **Convertir a Versión Final**
```bash
# Decir a Copilot:
"Convierte content-source/quimica/05-enlace-quimico.md 
y genera content/quimica/05-enlace-quimico.md con componentes"
```

**Copilot aplicará:**
- Detectará automáticamente títulos con "Práctica" → `PracticeExercise`
- Convertirá tablas markdown → `ComparisonCard`
- Interpretará listas importantes → `KeyPoints`
- Identificará procesos → `ProcessSteps`
- Marcará advertencias → `InfoBox`

### 3. **Publicar**
```bash
# El archivo en content/ es el que Nuxt Content lee
content/quimica/05-enlace-quimico.md  # ← Se publica automáticamente
```

**Ruta pública:** `/quimica/enlace-quimico`

---

## 📚 Documentación Relacionada

- **Este documento:** Flujo de trabajo y reglas de conversión
- **`EJEMPLOS-CONVERSION-COMPONENTES.md`:** Ejemplos completos y plantillas
- **`REGLA-SIMPLE-CONVERSION.md`:** Regla universal (TODO título = obligatorio)
- **`RESUMEN-SISTEMA-EJERCICIOS.md`:** Sistema de detección de ejercicios

---

## ✅ Reglas Importantes

### **Regla #1: TODO título es obligatorio**
```
🎯 Si el archivo fuente tiene 12 títulos (## o ###)
   → El archivo final DEBE tener 12 títulos también
```

### **Regla #2: Nunca editar `content/` directamente**
```
❌ NO editar: content/quimica/05-enlace-quimico.md
✅ SÍ editar: content-source/quimica/05-enlace-quimico.md
   → Luego reconvertir
```

### **Regla #3: Verificación de títulos**
```bash
# Contar títulos en archivo fuente
grep -c "^##" content-source/quimica/05-enlace-quimico.md

# Contar títulos en archivo final
grep -c "^##" content/quimica/05-enlace-quimico.md

# DEBEN SER IGUALES
```

---

## 🛠️ Comandos Útiles

### Analizar archivo fuente
```bash
node scripts/analizar-contenido.js content-source/quimica/05-enlace-quimico.md
```

### Verificar estructura
```bash
# Ver títulos en ambos archivos
grep "^##" content-source/quimica/05-enlace-quimico.md
grep "^##" content/quimica/05-enlace-quimico.md
```

### Comparar archivos
```bash
# Ver diferencias (sin contar componentes Vue)
diff content-source/quimica/05-enlace-quimico.md content/quimica/05-enlace-quimico.md
```

---

## 📋 Checklist de Conversión

Cuando Copilot convierte un archivo de `content-source/` a `content/`:

- [ ] ✅ Mismo número de títulos (## y ###)
- [ ] ✅ Todo el contenido educativo preservado
- [ ] ✅ Todos los videos preservados
- [ ] ✅ Tablas comparativas → ComparisonCard
- [ ] ✅ Advertencias/conceptos → InfoBox
- [ ] ✅ Listas importantes → KeyPoints
- [ ] ✅ Procedimientos → ProcessSteps
- [ ] ✅ Ejercicios → PracticeExercise
- [ ] ✅ Metadata (frontmatter) copiada
- [ ] ✅ Verificación con `grep -c "^##"`

---

## 🎯 Ejemplo Completo

### Archivo Fuente
```markdown
## Enlace iónico

El enlace iónico es...

### Características
- Transferencia de electrones
- Metal + No metal
- Forman iones
```

### Archivo Final
```markdown
## Enlace iónico

El enlace iónico es...

::key-points
---
title: "Características"
points:
  - text: "Transferencia de electrones"
  - text: "Metal + No metal"
  - text: "Forman iones"
---
::
```

---

## 🚀 Ventajas de Este Flujo

1. **Separación clara:** Fuente vs. Publicado
2. **Fácil de iterar:** Editas markdown simple, reconviertes
3. **Sin pérdida:** El original siempre está en `content-source/`
4. **Verificable:** Puedes comparar ambas versiones
5. **Reproducible:** Siempre puedes regenerar desde la fuente

---

## 📝 Notas

- `content-source/` **NO** se lee por Nuxt Content (está fuera de `content/`)
- `content/` es la carpeta que Nuxt Content procesa
- Si algo sale mal en la conversión, siempre tienes `content-source/` intacto
- Puedes versionar ambas carpetas en Git para ver la evolución

# 📚 Guía de Componentes de Contenido

## Índice
- [Filosofía de Diseño](#filosofía-de-diseño)
- [ComparisonCard](#comparisoncard)
- [InfoBox](#infobox)
- [KeyPoints](#keypoints)
- [ProcessSteps](#processsteps)
- [Reglas de Estilo](#reglas-de-estilo)

---

## Filosofía de Diseño

### Principios Fundamentales

1. **Consistencia**: Todos los componentes siguen el mismo patrón visual
2. **Jerarquía Clara**: 
   - Títulos de componentes: 1.5rem, font-weight 700
   - Títulos de items: 1.125rem, font-weight 700
   - Descripciones: 1rem, font-weight 500
3. **Spacing Uniforme**: 
   - 3rem de margen vertical entre componentes
   - 2rem de margen inferior en títulos de componentes
   - 1.25rem de gap entre items en grid
4. **Colores Sistemáticos**: 5 variantes con propósitos específicos
5. **Mobile First**: Todos los componentes son responsive por defecto
6. **Sin Markdown en Props**: Nunca usar `**texto**` en title/description, solo texto plano

### Sistema de Colores

| Color | Hex/Variable | Uso |
|-------|-------------|-----|
| **Primary** | `--accent-primary` (Azul) | Conceptos principales, primeros en secuencia |
| **Secondary** | `--accent-secondary` (Violeta) | Conceptos secundarios, alternativas |
| **Accent** | `#8B5CF6` (Púrpura) | Destacar algo especial o diferente |
| **Success** | `--success-color` (Verde) | Resultados positivos, características favorables |
| **Warning** | `--warning-color` (Amarillo) | Advertencias, casos especiales |

---

## ComparisonCard

### Descripción
Tarjetas en grid para comparar 2 o más conceptos lado a lado. Reemplazan tablas de Markdown.

### Cuándo Usar
- ✅ Comparar tipos, categorías o clasificaciones
- ✅ Mostrar características de diferentes elementos
- ✅ Contrastar conceptos relacionados
- ❌ Datos tabulares numéricos (usar tabla HTML nativa)

### Sintaxis

```markdown
::comparison-card
---
title: "Título de la comparación"
columns: 2  # Número de columnas (default: 2)
items:
  - title: "🔋 Concepto 1"
    description: "Descripción breve y clara"
    details: "Explicación detallada opcional"
    color: "primary"
  - title: "⚡ Concepto 2"
    description: "Otra descripción"
    details: "Más detalles"
    color: "secondary"
---
::
```

### Propiedades

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `title` | string | No | - | Título visible sobre las tarjetas |
| `columns` | number | No | 2 | Número de columnas del grid |
| `items` | array | Sí | - | Array de objetos con las tarjetas |

**Objeto Item:**
- `title` (string, requerido): Título de la tarjeta. **Incluir emoji al inicio**
- `description` (string, requerido): Texto principal
- `details` (string, opcional): Texto adicional separado por borde
- `color` (string, opcional): `primary` | `secondary` | `accent` | `success` | `warning`

### Ejemplos Reales

#### Ejemplo 1: Comparación de 3 tipos

```markdown
::comparison-card
---
title: "Tipos de Enlace Químico"
columns: 3
items:
  - title: "🔋 Enlace Iónico"
    description: "Transferencia de electrones"
    details: "Metal + No metal. ΔEN > 1.7"
    color: "primary"
  - title: "🤝 Enlace Covalente"
    description: "Compartimiento de electrones"
    details: "No metal + No metal. ΔEN < 1.7"
    color: "secondary"
  - title: "⚡ Enlace Metálico"
    description: "Mar de electrones libres"
    details: "Metal + Metal. Alta conductividad"
    color: "accent"
---
::
```

#### Ejemplo 2: Comparación de 4 variantes

```markdown
::comparison-card
---
title: "Enlaces Covalentes"
columns: 2
items:
  - title: "➖ Simple"
    description: "Un par de electrones compartido"
    details: "Ejemplos: H₂, HCl"
    color: "primary"
  - title: "═ Doble"
    description: "Dos pares de electrones compartidos"
    details: "Ejemplos: O₂, CO₂"
    color: "secondary"
  - title: "≡ Triple"
    description: "Tres pares de electrones compartidos"
    details: "Ejemplos: N₂, C₂H₂"
    color: "success"
  - title: "→ Dativo"
    description: "Un átomo aporta ambos electrones"
    details: "Ejemplo: NH₄⁺"
    color: "warning"
---
::
```

### Recomendaciones de Diseño

- **Emojis**: Usar emojis relevantes al inicio del título de cada item
- **Colores**: Asignar colores según jerarquía o categoría conceptual
- **Columnas**: 2-3 columnas funcionan mejor en desktop
- **Mobile**: Automáticamente colapsa a 1 columna
- **Details**: Usar para información complementaria, no esencial

---

## InfoBox

### Descripción
Cajas destacadas para información importante, advertencias, tips y errores comunes.

### Cuándo Usar
- ✅ Conceptos clave que necesitan énfasis
- ✅ Advertencias y excepciones
- ✅ Tips prácticos
- ✅ Errores comunes a evitar
- ❌ Párrafos largos (mantener conciso)

### Sintaxis

```markdown
::info-box{type="info" title="Título Opcional"}
Contenido del box. Puede incluir **markdown** y _formato_.

Incluso múltiples párrafos.
::
```

### Tipos Disponibles

| Tipo | Color | Icono | Uso |
|------|-------|-------|-----|
| `info` | Azul | 💡 | Información general, conceptos clave |
| `success` | Verde | ✅ | Logros, resultados positivos, confirmaciones |
| `warning` | Amarillo | ⚠️ | Advertencias, casos especiales, excepciones |
| `error` | Rojo | ❌ | Errores comunes, cosas a evitar |
| `tip` | Cian | 💭 | Tips, consejos prácticos, trucos |

### Ejemplos

#### Info

```markdown
::info-box{type="info" title="💡 Concepto Clave"}
El enlace iónico se produce por **transferencia de electrones** entre un metal y un no metal, formando iones que se atraen electrostáticamente.
::
```

#### Warning

```markdown
::info-box{type="warning" title="⚠️ Excepción Importante"}
El **hidrógeno** no cumple la regla del octeto. Solo necesita **2 electrones** en su última capa (regla del dueto).
::
```

#### Tip

```markdown
::info-box{type="tip" title="💭 Tip Práctico"}
Para calcular ΔEN rápidamente, resta el valor menor del mayor: 
**ΔEN = EN_mayor − EN_menor**
::
```

---

## KeyPoints

### Descripción
Lista numerada con estilo visual para puntos clave o ejemplos importantes.

### Cuándo Usar
- ✅ Listar puntos importantes ordenados
- ✅ Ejemplos con explicación
- ✅ Pasos no secuenciales (si son secuenciales, usar ProcessSteps)
- ❌ Listas muy largas (> 6 items)

### Sintaxis

```markdown
::key-points
---
title: "Título de la Lista"
points:
  - text: "Primer punto importante"
    highlight: true  # Opcional: resalta este punto
  - text: "Segundo punto"
  - text: "Tercer punto"
---
::
```

### Ejemplo

```markdown
::key-points
---
title: "Ejemplos de Enlaces Iónicos"
points:
  - text: "Cloruro de Sodio (NaCl): El sodio cede su electrón al cloro. Ambos quedan con 8 electrones."
    highlight: true
  - text: "Óxido de Potasio (K₂O): Se forma entre potasio (metal) y oxígeno (no metal)."
  - text: "Cloruro de Potasio (KCl): El potasio cede su electrón de valencia al cloro."
---
::
```

### Propiedades

- `title` (string, opcional): Título sobre la lista
- `points` (array, requerido): Array de objetos o strings
  - Como objeto: `{ text: string, highlight?: boolean }`
  - Como string: `"Texto del punto"`
- `columns` (number, opcional): Número de columnas (default: 1)

---

## ProcessSteps

### Descripción
Visualización de pasos secuenciales con conectores visuales.

### Cuándo Usar
- ✅ Procesos paso a paso
- ✅ Secuencias temporales
- ✅ Flujos de trabajo
- ❌ Listas no secuenciales (usar KeyPoints)

### Sintaxis

```markdown
::process-steps
---
title: "Nombre del Proceso"
orientation: "vertical"  # o "horizontal"
steps:
  - title: "Paso 1"
    description: "Descripción del primer paso"
    icon: "1️⃣"  # Opcional
  - title: "Paso 2"
    description: "Descripción del segundo paso"
    icon: "2️⃣"
---
::
```

### Ejemplo

```markdown
::process-steps
---
title: "Formación del Enlace Iónico"
steps:
  - title: "Transferencia de electrones"
    description: "Solo participan los electrones de valencia. Los átomos buscan completar 8 electrones (regla del octeto)."
    icon: "1️⃣"
  - title: "El metal cede electrones"
    description: "El átomo de metal tiene pocos electrones de valencia y le resulta fácil entregarlos."
    icon: "2️⃣"
  - title: "El no metal recibe electrones"
    description: "El átomo no metálico ya tiene muchos electrones y recibe los transferidos."
    icon: "3️⃣"
  - title: "Formación de iones"
    description: "El metal queda (+) y el no metal (-). Se atraen electrostáticamente."
    icon: "4️⃣"
---
::
```

### Orientaciones

- **Vertical** (default): Pasos apilados verticalmente con líneas conectoras
- **Horizontal**: Pasos en fila (colapsa a vertical en mobile)

---

## Reglas de Estilo

### Títulos en Markdown

#### Títulos de Sección (##)
```markdown
## Enlace iónico
```

- ❌ NO usar emojis en títulos de nivel 2
- ❌ NO usar mayúsculas completas
- ✅ Usar minúsculas después de mayúscula inicial
- ✅ Mantener cortos y descriptivos

#### Títulos de Subsección (###)
```markdown
### Mecanismo de formación
```

- ✅ Pueden llevar emoji si es descriptivo
- ✅ Para subtemas dentro de una sección principal

### Títulos de Componentes

TODOS los componentes llevan título **dentro** del componente:

```markdown
❌ INCORRECTO:
### Tipos de enlace
::comparison-card
---
items: [...]
---
::

✅ CORRECTO:
::comparison-card
---
title: "Tipos de enlace"
items: [...]
---
::
```

### Spacing

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

- Línea vacía antes del componente
- Línea vacía después del componente
- Línea vacía después de títulos ##

### Iconos Sistemáticos

**Por categoría de contenido:**

- 🔬 🧪 ⚗️ 🧬 ⚛️ - Ciencia/química
- 1️⃣ 2️⃣ 3️⃣ 4️⃣ - Números de paso
- ➡️ 🔄 ↔️ - Procesos/flujos
- 💡 🎯 📋 📝 📊 - Conceptos/información
- ⚠️ ❗ ⛔ 🚫 - Advertencias
- ✅ ✔️ 👍 💚 - Confirmaciones/positivo
- 🔋 ⚡ 🤝 📏 🧲 - Tipos específicos

**Uso:**
- **Títulos de items en ComparisonCard**: SIEMPRE llevar emoji al inicio
- **Títulos de componentes**: Opcional (generalmente solo texto)
- **Títulos de sección ##**: NUNCA llevar emoji

---

## Checklist de Conversión

Cuando conviertas contenido Markdown a componentes:

- [ ] ✅ Todas las tablas convertidas a ComparisonCard
- [ ] ✅ Títulos ## sin emojis
- [ ] ✅ Títulos de componentes con emoji si es pertinente
- [ ] ✅ Colores asignados lógicamente según jerarquía
- [ ] ✅ InfoBox usado para advertencias/tips/notas
- [ ] ✅ ProcessSteps para secuencias temporales
- [ ] ✅ KeyPoints para listas importantes
- [ ] ✅ Spacing consistente (líneas vacías)
- [ ] ✅ Videos/links agrupados al inicio de sección
- [ ] ✅ Sin títulos markdown redundantes antes de componentes

---

## Flujo de Trabajo

### 1. Conversión Automática

```bash
node scripts/convertir-contenido.js content/quimica/05-enlace-quimico.md
```

Esto genera `05-enlace-quimico-mejorado.md` con:
- Tablas → ComparisonCard
- Advertencias → InfoBox
- Títulos normalizados
- Spacing correcto

### 2. Revisión Manual

- Ajustar colores de ComparisonCard según jerarquía
- Convertir listas numeradas a KeyPoints o ProcessSteps
- Agregar emojis a títulos de items
- Verificar que details solo tenga info complementaria

### 3. Aplicación

Si todo está bien:
```bash
mv content/quimica/05-enlace-quimico-mejorado.md content/quimica/05-enlace-quimico.md
```

---

## Ejemplos Completos

Ver `content/quimica/05-enlace-quimico-mejorado.md` para un ejemplo real completo de:
- ComparisonCard con 3 columnas
- ComparisonCard 2x2
- InfoBox de múltiples tipos
- ProcessSteps vertical
- KeyPoints con highlighting
- Spacing y estructura consistente

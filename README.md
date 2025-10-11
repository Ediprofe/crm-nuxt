# 📚 Sistema de Contenido Educativo - Ediprofe# Nuxt Minimal Starter



Proyecto Nuxt 3 para contenido educativo con componentes Vue profesionales.Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.



## 📁 Estructura del Proyecto## Setup



```Make sure to install dependencies:

nuxt-app/

├── app/```bash

│   ├── components/# npm

│   │   └── content/              # Componentes educativosnpm install

│   │       ├── ComparisonCard.vue    # Comparaciones visuales

│   │       ├── InfoBox.vue           # Cajas de información# pnpm

│   │       ├── KeyPoints.vue         # Listas numeradaspnpm install

│   │       └── ProcessSteps.vue      # Procesos paso a paso

│   ├── pages/# yarn

│   │   └── [materia]/yarn install

│   │       ├── [unidad].vue          # Vista de unidad

│   │       └── index.vue             # Índice de materia# bun

│   └── assets/styles/bun install

│       └── global.css                # Sistema de diseño```

├── content/                      # Contenido en Markdown

│   ├── matematicas/## Development Server

│   ├── fisica/

│   ├── quimica/Start the development server on `http://localhost:3000`:

│   └── ciencias/

├── docs/```bash

│   ├── active/                   # Documentación activa# npm

│   │   ├── GUIA-COMPONENTES.md       # Guía completa de componentesnpm run dev

│   │   ├── METODOLOGIA-CONTENIDO.md  # Metodología de conversión

│   │   ├── README-COMPONENTES.md     # Resumen ejecutivo# pnpm

│   │   ├── MEJORAS-DISENO.md         # Antes/Después del diseñopnpm dev

│   │   └── SISTEMA-DISENO-EDUCATIVO.md  # Plan futuro

│   └── archived/                 # Documentación histórica# yarn

└── scripts/yarn dev

    └── convertir-contenido.js    # Script de conversión automática

```# bun

bun run dev

## 🎨 Sistema de Diseño```



### Componentes Disponibles## Production



#### 1. ComparisonCardBuild the application for production:

Tarjetas en grid para comparar conceptos lado a lado.

```bash

```markdown# npm

::comparison-cardnpm run build

---

title: "Tipos de Enlace"# pnpm

columns: 3pnpm build

items:

  - title: "🔋 Enlace Iónico"# yarn

    description: "Transferencia de electrones"yarn build

    details: "Metal + No metal"

    color: "primary"# bun

---bun run build

::```

```

Locally preview production build:

**Colores disponibles:** `primary`, `secondary`, `accent`, `success`, `warning`

```bash

#### 2. InfoBox# npm

Cajas destacadas para información importante.npm run preview



```markdown# pnpm

::info-box{type="info" title="💡 Concepto Clave"}pnpm preview

El enlace iónico se produce por transferencia de electrones.

::# yarn

```yarn preview



**Tipos:** `info`, `success`, `warning`, `error`, `tip`# bun

bun run preview

#### 3. KeyPoints```

Listas numeradas con estilo visual.

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

```markdown
::key-points
---
title: "Puntos Importantes"
points:
  - text: "Primer punto"
    highlight: true
  - text: "Segundo punto"
---
::
```

#### 4. ProcessSteps
Visualización de procesos secuenciales.

```markdown
::process-steps
---
title: "Proceso de Formación"
steps:
  - title: "Paso 1"
    description: "Descripción del paso"
    icon: "1️⃣"
---
::
```

### Paleta de Colores

| Nombre | Color | Uso |
|--------|-------|-----|
| primary | Azul emerald | Conceptos principales |
| secondary | Violeta slate | Conceptos secundarios |
| accent | Púrpura violet | Destacados especiales |
| success | Verde green | Características positivas |
| warning | Amarillo amber | Advertencias |

### Jerarquía Visual

```
Título de Componente:  1.5rem, weight 700
Título de Item:        1.125rem, weight 700
Description:           1rem, weight 500
Details:               0.9rem, weight 400
```

## 🚀 Comandos

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Generar estático
npm run generate

# Convertir contenido
npm run convertir content/materia/archivo.md
```

## 📝 Flujo de Trabajo

### Para Contenido Nuevo

1. **Escribe en Markdown con tablas normales**
2. **Ejecuta conversión:** `npm run convertir content/materia/archivo.md`
3. **Revisa archivo generado:** `archivo-mejorado.md`
4. **Ajusta manualmente:**
   - Colores según jerarquía
   - Emojis en títulos de items
   - Convierte listas a KeyPoints/ProcessSteps
5. **Reemplaza original:** `mv archivo-mejorado.md archivo.md`

### Reglas de Estilo

- ✅ Títulos ## sin emojis
- ✅ Títulos de items con emoji al inicio
- ✅ Sin markdown `**bold**` en props de componentes
- ✅ Description clara (1-2 líneas)
- ✅ Details con ejemplos opcionales
- ✅ Máximo 3 columnas en grids
- ✅ Spacing de 3rem entre componentes

## 📖 Documentación

### Documentos Principales

- **[GUIA-COMPONENTES.md](docs/active/GUIA-COMPONENTES.md)** - Documentación completa de cada componente con ejemplos
- **[METODOLOGIA-CONTENIDO.md](docs/active/METODOLOGIA-CONTENIDO.md)** - Flujo de trabajo y reglas de conversión
- **[README-COMPONENTES.md](docs/active/README-COMPONENTES.md)** - Resumen ejecutivo del sistema
- **[MEJORAS-DISENO.md](docs/active/MEJORAS-DISENO.md)** - Comparación antes/después del diseño

### Archivo de Ejemplo

Ver `content/quimica/05-enlace-quimico.md` para un ejemplo completo de contenido profesional con todos los componentes.

## 🎯 Estado Actual

### ✅ Completado

- Sistema de componentes Vue (4 componentes)
- Sistema de diseño consistente
- Script de conversión automática
- Documentación completa
- Ejemplo funcional (enlace químico)
- Soporte dark mode nativo
- Responsive mobile-first

### 🔜 Próximos Pasos

- ExerciseBlock para ejercicios de práctica
- VideoEmbed para videos estilizados
- Migración de más contenidos

## 🛠️ Tecnologías

- **Nuxt 3.7+** - Framework
- **Vue 3** - Componentes
- **Nuxt Content** - Sistema de contenido
- **TypeScript** - Tipado
- **Tailwind CSS** - Utilidades (mínimo)
- **CSS Variables** - Theming

## 📊 Estadísticas

- **4 componentes** educativos
- **5 variantes** de color
- **100% responsive** en todos los dispositivos
- **Dark mode** nativo
- **0 problemas** de hidratación

---

**Desarrollado con ❤️ para hacer el contenido educativo más accesible y profesional**

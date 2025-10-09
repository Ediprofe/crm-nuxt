# Requisitos y Configuración - Nuxt 4

## Configuración del Proyecto

Este proyecto utiliza Nuxt 4 con las siguientes características:

### Módulos Principales
- `@nuxt/content` - Para gestión de contenido Markdown
- `@nuxtjs/tailwindcss` - Para estilos con Tailwind CSS
- `@nuxtjs/mdc` - Para procesamiento avanzado de Markdown

### Dependencias Clave
- `katex` - Renderizado de fórmulas matemáticas
- `remark-math` - Plugin de Remark para soporte matemático
- `rehype-katex` - Plugin de Rehype para LaTeX/KaTeX
- `better-sqlite3` - Base de datos SQLite para búsqueda de contenido

## Arquitectura de Componentes

### Sistema de Temas
- Modo claro/oscuro con transiciones suaves
- Variables CSS dinámicas definidas en `global.css`
- Persistencia de preferencias en localStorage

### Responsive Design
- Mobile-first approach
- Breakpoints definidos en `config/constants.ts`
- Componentes adaptables según dispositivo

### Tablas Responsivas (Mobile-first)

**Comportamiento:**
- Desktop/Tablet: Tablas con ancho completo y padding generoso
- Móvil (<768px): 
  - Scroll horizontal automático
  - Fuente reducida (0.85rem)
  - Padding reducido (0.5rem)
  - Sombras visuales indicando contenido desplazable
  - `min-width: 500px` para mantener legibilidad

**Constantes:** Ver `TABLE_CONFIG` en `config/constants.ts`

**Implementación:**
- Scroll horizontal elegante con sombras visuales
- Adaptación automática de tamaño de fuente y padding
- Soporte completo para modo claro y oscuro
- Headers con `white-space: nowrap` para evitar saltos de línea

## Estructura de Archivos

```
nuxt-app/
├── app/
│   ├── assets/
│   │   └── styles/
│   │       └── global.css          # Estilos globales con variables CSS
│   ├── components/                 # Componentes reutilizables
│   │   ├── ContentSearch.vue
│   │   ├── FloatingTocButton.vue
│   │   ├── MediaLinksProcessor.vue
│   │   ├── PageHeader.vue
│   │   ├── SEO.vue
│   │   ├── SidebarExpandButton.vue
│   │   ├── TableOfContents.vue
│   │   ├── ThemeToggle.vue
│   │   └── TocSheet.vue
│   ├── composables/                # Composables de Vue
│   │   ├── useContentIcons.ts
│   │   ├── useContentSearch.ts
│   │   ├── useSidebarCollapse.ts
│   │   ├── useTheme.ts
│   │   └── useTocSheet.ts
│   ├── config/                     # Configuración y constantes
│   │   ├── constants.ts            # Constantes globales
│   │   ├── icons.ts                # Configuración de íconos
│   │   └── materias.ts             # Configuración de materias
│   ├── layouts/
│   │   └── default.vue             # Layout principal
│   ├── pages/                      # Páginas de la aplicación
│   │   ├── index.vue
│   │   └── [materia]/
│   │       ├── index.vue
│   │       └── [unidad].vue
│   ├── plugins/
│   │   └── theme.client.ts         # Plugin de tema
│   ├── types/
│   │   └── content.ts              # Tipos TypeScript
│   └── utils/                      # Utilidades
│       ├── content-detection.ts
│       ├── media.ts
│       ├── practice-detection.ts
│       └── search.ts
├── content/                        # Contenido Markdown
│   ├── ciencias/
│   ├── fisica/
│   ├── matematicas/
│   └── quimica/
├── public/                         # Archivos estáticos
├── nuxt.config.ts                  # Configuración de Nuxt
├── tailwind.config.ts              # Configuración de Tailwind
└── tsconfig.json                   # Configuración de TypeScript
```

## Constantes Globales

Todas las constantes están centralizadas en `app/config/constants.ts`:

- `TIMEOUTS` - Tiempos de espera para diferentes operaciones
- `DEFAULTS` - Valores por defecto (altura de header, offsets, etc.)
- `BREAKPOINTS` - Puntos de quiebre responsive
- `MEDIA_PATTERNS` - Patrones regex para detectar enlaces multimedia
- `STORAGE_KEYS` - Claves para localStorage
- `SEARCH_CONFIG` - Configuración de búsqueda
- `Z_INDEX` - Índices Z para elementos flotantes
- `GESTURES` - Configuración de gestos táctiles
- `ANIMATIONS` - Duraciones de animaciones
- `TOC_SHEET` - Configuración del sheet de tabla de contenidos
- `SIDEBAR` - Configuración del sidebar
- `CSS_VARIABLES` - Nombres de variables CSS
- `TABLE_CONFIG` - Configuración de tablas responsivas

## SEO y Performance

- Meta tags dinámicos por página
- Structured Data (Schema.org) para contenido educativo
- Open Graph tags para redes sociales
- Preconnect a recursos externos (Google Fonts)
- Lazy loading de imágenes y componentes

## Despliegue

### Requisitos de Producción
- Node.js 18+ o superior
- npm, pnpm, yarn o bun

### Build
```bash
npm run build
```

### Preview local
```bash
npm run preview
```

### Despliegue en Vercel
El proyecto está optimizado para despliegue en Vercel:
1. Framework Preset: Nuxt.js
2. Root Directory: `nuxt-app`
3. Build Command: `npm run build`
4. Output Directory: `.output`

## Variables de Entorno

Actualmente no se requieren variables de entorno para el funcionamiento básico del proyecto.

## Mejoras Futuras

- [ ] Implementar sistema de comentarios
- [ ] Agregar analytics
- [ ] Mejorar accesibilidad (WCAG 2.1 AA)
- [ ] Agregar tests unitarios
- [ ] Implementar PWA
- [ ] Agregar internacionalización (i18n)

---

**Última actualización:** Octubre 8, 2025
**Versión de Nuxt:** 4.1.2

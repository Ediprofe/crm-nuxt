# 🔧 Refactorización Fase 1: Utilidades y Constantes

## ✅ Completado

### 📁 Archivos Creados

#### 1. `app/config/constants.ts`
Archivo central de constantes del proyecto:

**Constantes incluidas:**
- ✅ `TIMEOUTS` - Tiempos de espera para operaciones async
  - `DOM_READY: 200ms`
  - `MEDIA_PROCESSING: 100ms`
  - `HEADER_UPDATE: 150ms`

- ✅ `DEFAULTS` - Valores por defecto
  - `HEADER_HEIGHT: 93px`
  - `SCROLL_OFFSET: 10px`
  - `TOC_MAX_HEIGHT_MOBILE: '500px'`

- ✅ `BREAKPOINTS` - Puntos de ruptura responsive
  - `SM: 640`, `MD: 768`, `LG: 1024`, `XL: 1280`, `2XL: 1536`

- ✅ `MEDIA_PATTERNS` - Expresiones regulares para medios
  - YouTube (video y playlist)
  - TikTok (URLs completas y cortas)
  - Google Drive (carpetas y archivos)

- ✅ `STORAGE_KEYS` - Claves de localStorage
  - `THEME: 'ediprofe-theme'`

#### 2. `app/utils/media.ts`
Utilidades para procesamiento de enlaces multimedia:

**Funciones exportadas:**
- ✅ `extractYouTubeId(url)` - Extrae ID de videos/playlists de YouTube
- ✅ `extractTikTokId(url)` - Extrae ID de videos de TikTok
- ✅ `extractDriveId(url)` - Extrae ID de archivos/carpetas de Drive
- ✅ `createMediaIcon(type)` - Crea íconos SVG para cada tipo de media

**TypeScript:**
- ✅ Interface `MediaInfo` para tipado fuerte

### 🔄 Archivos Actualizados

#### 3. `app/composables/useTheme.ts`
- ✅ Importa `STORAGE_KEYS` desde constants
- ✅ Usa `STORAGE_KEYS.THEME` en lugar de string literal

#### 4. `app/plugins/theme.client.ts`
- ✅ Importa `STORAGE_KEYS` desde constants
- ✅ Usa `STORAGE_KEYS.THEME` en lugar de string literal

## 🎯 Beneficios

### 1. **Mantenibilidad**
```typescript
// ❌ Antes: Valores mágicos dispersos
const timeout = 200
const headerHeight = 93
const storageKey = 'ediprofe-theme'

// ✅ Ahora: Constantes centralizadas
import { TIMEOUTS, DEFAULTS, STORAGE_KEYS } from '~/config/constants'
const timeout = TIMEOUTS.DOM_READY
const headerHeight = DEFAULTS.HEADER_HEIGHT
const storageKey = STORAGE_KEYS.THEME
```

### 2. **Type Safety**
```typescript
// ✅ TypeScript conoce los tipos
export interface MediaInfo {
  id: string
  type: 'youtube' | 'tiktok' | 'drive'
  isPlaylist?: boolean
}

// Autocompletado en IDE
const info = extractYouTubeId(url)
if (info?.type === 'youtube') { ... }
```

### 3. **Reutilización**
```typescript
// ✅ Funciones reutilizables
import { extractYouTubeId, createMediaIcon } from '~/utils/media'

// Usar en cualquier componente
const mediaInfo = extractYouTubeId(url)
if (mediaInfo) {
  const icon = createMediaIcon(mediaInfo.type)
}
```

### 4. **Única Fuente de Verdad**
- ✅ Cambiar un valor en `constants.ts` afecta todo el proyecto
- ✅ No más valores duplicados en múltiples archivos
- ✅ Fácil encontrar y actualizar configuraciones

## 📊 Comparación

| Aspecto | Antes | Ahora |
|---------|-------|-------|
| Valores mágicos | ❌ Dispersos | ✅ Centralizados |
| Type safety | ⚠️ Parcial | ✅ Completo |
| Duplicación | ❌ Sí | ✅ No |
| Mantenimiento | 🔴 Difícil | 🟢 Fácil |
| Búsqueda | 🔴 Múltiples archivos | 🟢 Un solo lugar |

## 🚀 Cómo Usar

### Importar Constantes
```typescript
import { 
  TIMEOUTS, 
  DEFAULTS, 
  BREAKPOINTS, 
  MEDIA_PATTERNS, 
  STORAGE_KEYS 
} from '~/config/constants'

// Usar en tu código
setTimeout(() => {
  // ...
}, TIMEOUTS.DOM_READY)

if (window.innerWidth >= BREAKPOINTS.MD) {
  // ...
}
```

### Importar Utilidades de Media
```typescript
import { 
  extractYouTubeId, 
  extractTikTokId, 
  extractDriveId, 
  createMediaIcon,
  type MediaInfo 
} from '~/utils/media'

// Extraer IDs
const youtubeInfo = extractYouTubeId('https://youtube.com/watch?v=ABC123')
// { id: 'ABC123', type: 'youtube', isPlaylist: false }

const tiktokInfo = extractTikTokId('https://tiktok.com/@user/video/123456')
// { id: '123456', type: 'tiktok' }

// Crear íconos
const icon = createMediaIcon('youtube')
heading.appendChild(icon)
```

## 📝 Próximos Pasos (Fase 2)

### Refactorizar Componentes Existentes

**Componentes a actualizar:**
1. `MediaLinksProcessor.vue` - Usar utilidades de `media.ts`
2. `TableOfContents.vue` - Usar constantes de `constants.ts`
3. `[unidad].vue` - Usar timeouts centralizados

**Beneficios esperados:**
- ✅ Reducción de código duplicado
- ✅ Mejor consistencia
- ✅ Más fácil de testear
- ✅ Menos propenso a errores

## 🧪 Testing

### Verificar Importaciones
```bash
# Buscar usos de las constantes
grep -r "STORAGE_KEYS\|TIMEOUTS\|DEFAULTS" nuxt-app/app/

# Buscar valores mágicos que deberían ser constantes
grep -r "200\|150\|93" nuxt-app/app/
```

### Verificar TypeScript
```bash
cd nuxt-app
npm run typecheck  # Si tienes este script
```

## 📚 Referencias

### Patrones Aplicados
- **Single Source of Truth** - Una sola fuente para cada configuración
- **DRY** (Don't Repeat Yourself) - No repetir código
- **Type Safety** - Aprovechar TypeScript al máximo
- **Separation of Concerns** - Separar configuración de lógica

### Lecturas Recomendadas
- [TypeScript const assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)
- [Vue 3 Composables Best Practices](https://vuejs.org/guide/reusability/composables.html)
- [Nuxt 3 Utils Directory](https://nuxt.com/docs/guide/directory-structure/utils)

## ✨ Resultado

### Antes de la Refactorización
```
❌ Valores dispersos en múltiples archivos
❌ Duplicación de regex y constantes
❌ Difícil encontrar configuraciones
❌ Propensión a errores de tipeo
```

### Después de la Refactorización
```
✅ Constantes centralizadas en config/constants.ts
✅ Utilidades reutilizables en utils/media.ts
✅ Type-safe con interfaces TypeScript
✅ Un solo lugar para actualizar valores
✅ Código más limpio y mantenible
```

## 🎉 Conclusión

**La Fase 1 está completa.** El proyecto ahora tiene:
- ✅ Configuración centralizada
- ✅ Utilidades reutilizables
- ✅ Type safety mejorado
- ✅ Base sólida para futuras refactorizaciones

**Siguiente paso:** Aplicar estas utilidades en los componentes existentes (Fase 2)

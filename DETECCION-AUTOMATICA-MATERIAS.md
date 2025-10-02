# 🤖 Detección Automática de Materias

## 📋 Problema Actual

**Situación actual:** Las materias están hardcodeadas en `app/config/materias.ts`

```typescript
// ❌ Manual: Hay que agregar cada materia manualmente
export const materiasConfig = {
  quimica: { nombre: 'Química', emoji: '🧪', color: 'quimica' },
  fisica: { nombre: 'Física', emoji: '⚡', color: 'fisica' },
  // Si agregas content/biologia/, no aparece automáticamente
}
```

**Problema:** Si creas una carpeta nueva en `content/` (ej: `content/biologia/`), no aparece en la página principal hasta que la agregues manualmente a `materias.ts`.

## ✅ Solución: Detección Automática

### Opción 1: Server-side (Recomendado)

Usar la API de Nuxt Content para obtener las carpetas automáticamente.

**Archivo:** `app/pages/index.vue`

```vue
<script setup lang="ts">
// Obtener todas las colecciones de contenido
const { data: collections } = await useAsyncData('collections', async () => {
  const items = await queryCollection('content').all()
  
  // Extraer carpetas únicas (materias)
  const folders = new Set<string>()
  items.forEach((item: any) => {
    const pathParts = item.path?.split('/').filter(Boolean)
    if (pathParts && pathParts.length > 0) {
      folders.add(pathParts[0]) // Primera parte del path = carpeta
    }
  })
  
  return Array.from(folders)
})

// Configuración de emojis y colores (fallback)
const materiaDefaults: Record<string, { emoji: string, color: string, nombre: string }> = {
  quimica: { emoji: '🧪', color: 'blue', nombre: 'Química' },
  fisica: { emoji: '⚡', color: 'purple', nombre: 'Física' },
  matematicas: { emoji: '📊', color: 'green', nombre: 'Matemáticas' },
  ciencias: { emoji: '🔬', color: 'teal', nombre: 'Ciencias' },
  biologia: { emoji: '🧬', color: 'emerald', nombre: 'Biología' },
  historia: { emoji: '📜', color: 'amber', nombre: 'Historia' },
  geografia: { emoji: '🌍', color: 'cyan', nombre: 'Geografía' },
  // Agregar más según necesites
}

// Mapear materias detectadas con su configuración
const materias = computed(() => {
  return (collections.value || []).map(slug => {
    const defaults = materiaDefaults[slug] || {
      emoji: '📚',
      color: 'gray',
      nombre: slug.charAt(0).toUpperCase() + slug.slice(1)
    }
    return {
      slug,
      ...defaults
    }
  })
})

// Colores dinámicos
const colorClasses: Record<string, string> = {
  blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
  purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
  green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
  teal: 'from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700',
  emerald: 'from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
  amber: 'from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700',
  cyan: 'from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700',
  gray: 'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
}
</script>

<template>
  <div class="min-h-screen">
    <!-- ... header ... -->
    
    <main class="container mx-auto px-4 py-12">
      <div class="mb-8">
        <h2 class="text-3xl font-bold mb-2">Materias Disponibles</h2>
        <p class="text-gray-600">{{ materias.length }} materias disponibles</p>
      </div>

      <!-- Grid de Materias -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="materia in materias"
          :key="materia.slug"
          :to="`/${materia.slug}`"
          class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
        >
          <div 
            :class="[
              'p-8 bg-gradient-to-br',
              colorClasses[materia.color] || colorClasses.gray
            ]"
          >
            <div class="text-6xl mb-4">{{ materia.emoji }}</div>
            <h3 class="text-2xl font-bold text-white mb-2">
              {{ materia.nombre }}
            </h3>
            <div class="flex items-center text-white opacity-75">
              <span class="text-sm font-medium">Ver contenido</span>
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>
    </main>
  </div>
</template>
```

### Opción 2: Usando Server Routes (Más avanzado)

**Archivo:** `server/api/materias.get.ts`

```typescript
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  const contentPath = join(process.cwd(), 'content')
  
  try {
    const folders = await readdir(contentPath, { withFileTypes: true })
    const materias = folders
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
    
    return materias
  } catch (error) {
    return []
  }
})
```

**Usar en page:**

```vue
<script setup lang="ts">
const { data: materiaSlugs } = await useFetch('/api/materias')

const materiaDefaults = { /* ... */ }

const materias = computed(() => {
  return (materiaSlugs.value || []).map(slug => ({
    slug,
    ...materiaDefaults[slug]
  }))
})
</script>
```

## 🎨 Configuración Recomendada de Emojis

```typescript
const materiaDefaults = {
  // Ciencias exactas
  quimica: { emoji: '🧪', color: 'blue', nombre: 'Química' },
  fisica: { emoji: '⚡', color: 'purple', nombre: 'Física' },
  matematicas: { emoji: '📊', color: 'green', nombre: 'Matemáticas' },
  
  // Ciencias naturales
  ciencias: { emoji: '🔬', color: 'teal', nombre: 'Ciencias' },
  biologia: { emoji: '🧬', color: 'emerald', nombre: 'Biología' },
  
  // Ciencias sociales
  historia: { emoji: '📜', color: 'amber', nombre: 'Historia' },
  geografia: { emoji: '🌍', color: 'cyan', nombre: 'Geografía' },
  
  // Humanidades
  lengua: { emoji: '📖', color: 'rose', nombre: 'Lengua' },
  literatura: { emoji: '✍️', color: 'pink', nombre: 'Literatura' },
  filosofia: { emoji: '🤔', color: 'indigo', nombre: 'Filosofía' },
  
  // Artes
  arte: { emoji: '🎨', color: 'orange', nombre: 'Arte' },
  musica: { emoji: '🎵', color: 'violet', nombre: 'Música' },
  
  // Otros
  ingles: { emoji: '🇬🇧', color: 'sky', nombre: 'Inglés' },
  informatica: { emoji: '💻', color: 'slate', nombre: 'Informática' }
}
```

## 📦 Estructura Recomendada

```
content/
├── quimica/
│   ├── 01-estructura-atomica.md
│   └── 02-tabla-periodica.md
├── fisica/
│   ├── 01-cinematica.md
│   └── 02-dinamica.md
├── matematicas/
│   ├── 01-numeros-reales.md
│   └── 02-factorizacion.md
└── biologia/          ← Se detecta automáticamente
    ├── 01-celula.md
    └── 02-genetica.md
```

## ✅ Ventajas de la Detección Automática

| Aspecto | Manual | Automático |
|---------|--------|------------|
| **Agregar materia** | Editar 2 archivos | Solo crear carpeta |
| **Mantenimiento** | Alto | Bajo |
| **Errores** | Posibles | Mínimos |
| **Escalabilidad** | Limitada | Excelente |
| **Flexibilidad** | Baja | Alta |

## 🚀 Migración Gradual

### Paso 1: Mantener compatibilidad
```typescript
// Leer de config/materias.ts primero
import { materiasConfig } from '~/config/materias'

// Luego detectar automáticamente nuevas
const detected = await detectMaterias()

// Combinar ambas
const allMaterias = { ...materiasConfig, ...detected }
```

### Paso 2: Deprecar config manual
```typescript
// Mostrar warning si hay materias solo en config
if (onlyInConfig.length > 0) {
  console.warn('Estas materias solo existen en config:', onlyInConfig)
}
```

### Paso 3: Remover config completamente
```typescript
// Solo usar detección automática
const materias = await detectMaterias()
```

## 🎯 Implementación Recomendada

**Para tu proyecto actual:**

1. **Corto plazo** (Ya hecho ✅):
   - Agregar "ciencias" manualmente a `materias.ts`
   - Funciona inmediatamente

2. **Mediano plazo** (Opcional):
   - Implementar Opción 1 (Server-side)
   - Mantener `materiaDefaults` como fallback
   - Detección automática + configuración de emojis

3. **Largo plazo** (Si creces mucho):
   - Base de datos con configuración de materias
   - Panel de administración para gestionar materias
   - Metadatos en archivos markdown

## 📝 Ejemplo Práctico

**Agregar "Biología" ahora mismo:**

```bash
# 1. Crear carpeta
mkdir content/biologia

# 2. Agregar contenido
echo "# La Célula" > content/biologia/01-celula.md

# 3. Agregar a materias.ts
# Editar app/config/materias.ts y agregar:
# biologia: { nombre: 'Biología', emoji: '🧬', color: 'biologia' }

# 4. Agregar color en index.vue
# biologia: 'from-emerald-500 to-emerald-600...'
```

**Con detección automática:**

```bash
# 1. Crear carpeta
mkdir content/biologia

# 2. Agregar contenido
echo "# La Célula" > content/biologia/01-celula.md

# ¡Eso es todo! Se detecta automáticamente
# Solo necesita emoji/color en materiaDefaults si quieres personalizarlo
```

## 🎉 Conclusión

**Estado actual:** Ciencias ahora aparece correctamente ✅

**Próximo paso:** Implementar detección automática cuando agregues más materias

**Beneficio:** Crear `content/nueva-materia/` y ya aparece en la página principal




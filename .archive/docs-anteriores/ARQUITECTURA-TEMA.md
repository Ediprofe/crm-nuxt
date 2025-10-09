# 🌙 Arquitectura del Sistema de Temas

## 📋 Visión General

Sistema de tema oscuro/claro implementado siguiendo las **mejores prácticas de Nuxt 3** con una arquitectura centralizada y mantenible.

**Tema por defecto:** Claro (Light Mode)  
**Persistencia:** localStorage  
**Sin flash:** Inicialización antes del render

## 🏗️ Arquitectura (Capas)

```
┌─────────────────────────────────────────────┐
│  1. PLUGIN (theme.client.ts)               │ ← Inicialización temprana
│     - Se ejecuta ANTES del render          │
│     - Lee localStorage/sistema             │
│     - Aplica clase 'dark' al <html>        │
│     - Evita flash de tema incorrecto       │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  2. APP.VUE                                 │ ← Contenedor global
│     - Wrapper de toda la aplicación        │
│     - Aplica estilos base con variables    │
│     - Transiciones globales                │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  3. COMPOSABLE (useTheme.ts)                │ ← Estado reactivo
│     - Estado global compartido (singleton) │
│     - Funciones: toggle, setTheme          │
│     - Sincroniza con localStorage          │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  4. CSS VARIABLES (global.css)              │ ← Estilos
│     - Variables CSS para colores           │
│     - :root (light) y .dark (dark)         │
│     - Transiciones automáticas             │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  5. COMPONENTES & PÁGINAS                   │ ← UI
│     - Usan clases Tailwind (dark:)         │
│     - ThemeToggle para cambiar tema        │
│     - Sin lógica de tema (solo UI)         │
└─────────────────────────────────────────────┘
```

## 📁 Estructura de Archivos

```
nuxt-app/
├── app/
│   ├── plugins/
│   │   └── theme.client.ts        ← [1] Inicialización temprana
│   │
│   ├── app.vue                    ← [2] Contenedor global
│   │
│   ├── composables/
│   │   └── useTheme.ts            ← [3] Estado reactivo compartido
│   │
│   ├── assets/styles/
│   │   └── global.css             ← [4] Variables CSS + estilos base
│   │
│   ├── components/
│   │   └── ThemeToggle.vue        ← [5] Botón para cambiar tema
│   │
│   └── pages/
│       ├── index.vue              ← Página inicio (con dark:)
│       └── [materia]/
│           ├── index.vue          ← Listado unidades (con dark:)
│           └── [unidad].vue       ← Contenido unidad (con dark:)
│
└── tailwind.config.ts             ← darkMode: 'class'
```

## 🔄 Flujo de Ejecución

### Al cargar la página:

1. **Plugin ejecuta** (`theme.client.ts`)
   - Lee `localStorage.getItem('ediprofe-theme')`
   - Si no existe, usa **tema claro por defecto**
   - Aplica clase `dark` al `<html>` INMEDIATAMENTE (si es necesario)
   - ✅ No hay flash de tema incorrecto

2. **App.vue renderiza**
   - Aplica estilos base con variables CSS
   - Las transiciones ya están configuradas

3. **Composable inicializa**
   - Lee el estado del DOM (clase `dark`)
   - Mantiene estado reactivo sincronizado

4. **Componentes renderizan**
   - Ven automáticamente el tema correcto
   - Clases `dark:` se aplican si existe `.dark` en `<html>`

### Al hacer click en ThemeToggle:

1. Usuario hace click en `ThemeToggle.vue`
2. Llama a `toggleTheme()` del composable
3. Composable:
   - Cambia `isDark.value`
   - Guarda en `localStorage`
   - Agrega/quita clase `dark` del `<html>`
4. Tailwind re-evalúa automáticamente las clases `dark:`
5. CSS variables cambian (`:root` vs `.dark`)
6. Transiciones CSS animan el cambio (0.2s)

## 🎨 Sistema de Colores

### Variables CSS (global.css)

```css
:root {
  --bg-primary: rgb(249 250 251);      /* gray-50 */
  --bg-secondary: white;
  --text-primary: rgb(17 24 39);       /* gray-900 */
  --text-secondary: rgb(55 65 81);     /* gray-700 */
  --accent-color: rgb(37 99 235);      /* blue-600 */
  /* ... más variables ... */
}

.dark {
  --bg-primary: rgb(17 24 39);         /* gray-900 */
  --bg-secondary: rgb(31 41 55);       /* gray-800 */
  --text-primary: rgb(243 244 246);    /* gray-100 */
  --text-secondary: rgb(209 213 219);  /* gray-300 */
  --accent-color: rgb(96 165 250);     /* blue-400 */
  /* ... más variables ... */
}
```

### Uso en componentes

**Opción 1: Variables CSS** (recomendado para colores consistentes)
```vue
<div class="bg-[var(--bg-primary)] text-[var(--text-primary)]">
```

**Opción 2: Clases Tailwind** (más común, más fácil)
```vue
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
```

## ✅ Ventajas de esta Arquitectura

### 1. **Sin Flash (FOUC - Flash of Unstyled Content)**
- El plugin se ejecuta ANTES del render
- El tema correcto se aplica inmediatamente
- No hay parpadeo de tema incorrecto

### 2. **Código Centralizado**
- La lógica de tema está en UN solo lugar (plugin + composable)
- Las páginas solo usan clases `dark:`
- Fácil de mantener y extender

### 3. **Estado Global Compartido**
- El composable usa un `ref` singleton
- Todas las instancias comparten el mismo estado
- No hay sincronización compleja

### 4. **Rendimiento Óptimo**
- El plugin solo ejecuta una vez
- El composable es lightweight (no duplica lógica)
- CSS variables son súper rápidas

### 5. **Developer Experience**
- Agregar nueva página: solo usar clases `dark:`
- Agregar nuevo color: agregar variable CSS
- Cambiar tema: `useTheme().toggleTheme()`

### 6. **Type-Safe**
- TypeScript en plugin, composable y componentes
- `Theme = 'light' | 'dark'` tipado
- Autocompletado en IDE

## 🛠️ Cómo Agregar Tema a una Nueva Página

### Paso 1: Template
Agregar clases `dark:` a los elementos:

```vue
<template>
  <div class="bg-white dark:bg-gray-800">
    <h1 class="text-gray-900 dark:text-gray-100">Título</h1>
    <p class="text-gray-600 dark:text-gray-400">Texto</p>
    <button class="bg-blue-600 dark:bg-blue-500">Botón</button>
  </div>
</template>
```

### Paso 2: Transiciones (opcional)
Agregar `transition-colors` para suavizar cambios:

```vue
<div class="bg-white dark:bg-gray-800 transition-colors">
```

### Paso 3: ThemeToggle (si es página de nivel superior)
```vue
<ThemeToggle />
```

**¡Eso es todo!** No necesitas importar nada más ni manejar estado.

## 🎯 Checklist para Nueva Feature

Al agregar una nueva sección/página:

- [ ] Agregar clases `dark:` a elementos con color
- [ ] Usar `transition-colors` para elementos que cambien
- [ ] Probar en ambos temas (light/dark)
- [ ] Verificar contraste de texto (accesibilidad)
- [ ] Asegurar que imágenes/íconos se vean bien en ambos

## 🐛 Troubleshooting

### Problema: El tema no se aplica en mi nueva página

**Solución:** Verifica que estés usando clases Tailwind con `dark:`:
```vue
<!-- ❌ Incorrecto -->
<div class="bg-white">

<!-- ✅ Correcto -->
<div class="bg-white dark:bg-gray-800">
```

### Problema: Flash de tema incorrecto al cargar

**Solución:** El plugin debe estar en `plugins/theme.client.ts` con la extensión `.client.ts`

### Problema: El toggle no funciona

**Solución:** Verifica que `ThemeToggle.vue` esté usando el composable:
```ts
const { toggleTheme } = useTheme()
```

### Problema: localStorage no persiste

**Solución:** Verifica que estés en el cliente (no SSR):
```ts
if (typeof window !== 'undefined') {
  localStorage.setItem(...)
}
```

## 🎨 Configuración del Tema por Defecto

Si deseas cambiar el tema por defecto, modifica el plugin:

```ts
// plugins/theme.client.ts

// Para usar tema OSCURO por defecto:
applyTheme(true)  // true = dark

// Para usar tema CLARO por defecto (actual):
applyTheme(false) // false = light
```

**Nota:** Una vez que el usuario cambie el tema manualmente, su preferencia se guardará en localStorage y tendrá prioridad sobre el tema por defecto.

## 📚 Referencias

- [Nuxt 3 Plugins](https://nuxt.com/docs/guide/directory-structure/plugins)
- [Tailwind Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

## 🎉 Resumen

**Arquitectura en 3 palabras:** Plugin → Composable → UI

- **Plugin**: Inicializa (evita flash)
- **Composable**: Maneja estado (toggle)
- **UI**: Aplica estilos (dark: classes)

**Mantenible:** Toda la lógica en 2 archivos (plugin + composable)
**Escalable:** Agregar páginas = solo clases CSS
**Performante:** Sin overhead, CSS nativo + Tailwind

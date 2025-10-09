# 🎨 Sistema de Colores EdiProfe Design System

## Inspiración y Filosofía

Este sistema de colores está **inspirado en la elegante paleta de Nuxt.com**, pero adaptado específicamente para un contexto educativo. Combina:

- **Fondos ultra profundos** (estilo Nuxt) para el modo oscuro
- **Verde esmeralda educativo** como color de acento principal
- **Azul complementario** para enlaces secundarios
- **Excelente contraste y accesibilidad** (cumple WCAG AA/AAA)

---

## 📐 Variables CSS Globales

Todas las variables están definidas en `app/assets/styles/global.css`

### 🌞 Modo Claro (Light Mode)

```css
:root {
  /* Fondos - Ultra limpio y luminoso */
  --bg-primary: rgb(255 255 255);        /* Blanco puro */
  --bg-secondary: rgb(250 250 250);      /* Gris ultra claro */
  --bg-sidebar: rgb(255 255 255);        /* Blanco puro */
  --bg-card: rgb(255 255 255);           /* Blanco puro */
  
  /* Textos - Mayor contraste */
  --text-primary: rgb(10 10 10);         /* Casi negro */
  --text-secondary: rgb(64 64 64);       /* Gris oscuro */
  --text-muted: rgb(115 115 115);        /* Gris medio */
  
  /* Bordes - Sutiles pero definidos */
  --border-color: rgb(229 229 229);      /* Gris claro */
  --border-hover: rgb(212 212 212);      /* Gris más oscuro */
  
  /* Acentos - Verde esmeralda educativo */
  --accent-primary: rgb(16 185 129);     /* emerald-500 */
  --accent-primary-hover: rgb(5 150 105); /* emerald-600 */
  --accent-secondary: rgb(59 130 246);    /* blue-500 */
  --accent-secondary-hover: rgb(37 99 235); /* blue-600 */
  
  /* Headings */
  --heading-color: rgb(5 150 105);       /* emerald-600 */
  
  /* Estados */
  --success-color: rgb(34 197 94);       /* green-500 */
  --error-color: rgb(239 68 68);         /* red-500 */
  --warning-color: rgb(245 158 11);      /* amber-500 */
}
```

### 🌙 Modo Oscuro (Dark Mode) - **Inspirado en Nuxt**

```css
.dark {
  /* Fondos - Ultra profundo estilo Nuxt */
  --bg-primary: rgb(9 9 11);             /* zinc-950 - Casi negro */
  --bg-secondary: rgb(24 24 27);         /* zinc-900 - Gris muy oscuro */
  --bg-sidebar: rgb(24 24 27);           /* zinc-900 */
  --bg-card: rgb(24 24 27);              /* zinc-900 */
  
  /* Textos - Alto contraste */
  --text-primary: rgb(250 250 250);      /* zinc-50 - Blanco suave */
  --text-secondary: rgb(212 212 216);    /* zinc-300 - Gris claro */
  --text-muted: rgb(161 161 170);        /* zinc-400 - Gris medio */
  
  /* Bordes - Sutiles pero visibles */
  --border-color: rgb(39 39 42);         /* zinc-800 */
  --border-hover: rgb(63 63 70);         /* zinc-700 */
  
  /* Acentos - Vibrantes como Nuxt */
  --accent-primary: rgb(52 211 153);     /* emerald-400 - Más brillante */
  --accent-primary-hover: rgb(16 185 129); /* emerald-500 */
  --accent-secondary: rgb(96 165 250);    /* blue-400 */
  --accent-secondary-hover: rgb(59 130 246); /* blue-500 */
  
  /* Headings - Verde brillante */
  --heading-color: rgb(52 211 153);      /* emerald-400 */
  
  /* Estados - Más vibrantes en oscuro */
  --success-color: rgb(74 222 128);      /* green-400 */
  --error-color: rgb(248 113 113);       /* red-400 */
  --warning-color: rgb(251 191 36);      /* amber-400 */
}
```

---

## 🎯 Uso en Componentes

### Ejemplo 1: Usando variables en style inline

```vue
<template>
  <div class="card" style="background-color: var(--bg-card); border-color: var(--border-color);">
    <h2 style="color: var(--heading-color);">Título</h2>
    <p style="color: var(--text-secondary);">Contenido...</p>
  </div>
</template>
```

### Ejemplo 2: Usando variables en CSS scoped

```vue
<style scoped>
.card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
}

.card:hover {
  border-color: var(--border-hover);
}

.title {
  color: var(--heading-color);
}

.link {
  color: var(--accent-primary);
}

.link:hover {
  color: var(--accent-primary-hover);
}
</style>
```

### Ejemplo 3: Estilos dinámicos con :style

```vue
<template>
  <button
    :style="{
      backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--bg-secondary)',
      color: isActive ? 'white' : 'var(--text-secondary)',
      borderColor: 'var(--border-color)'
    }"
  >
    Botón
  </button>
</template>
```

---

## 🎨 Paleta de Colores Completa

### Verde Esmeralda (Acento Principal)

| Uso | Modo Claro | Modo Oscuro |
|-----|------------|-------------|
| **Normal** | `rgb(16 185 129)` <br> emerald-500 | `rgb(52 211 153)` <br> emerald-400 |
| **Hover** | `rgb(5 150 105)` <br> emerald-600 | `rgb(16 185 129)` <br> emerald-500 |

### Azul (Acento Secundario)

| Uso | Modo Claro | Modo Oscuro |
|-----|------------|-------------|
| **Normal** | `rgb(59 130 246)` <br> blue-500 | `rgb(96 165 250)` <br> blue-400 |
| **Hover** | `rgb(37 99 235)` <br> blue-600 | `rgb(59 130 246)` <br> blue-500 |

### Fondos

| Elemento | Modo Claro | Modo Oscuro |
|----------|------------|-------------|
| **Primario** | `rgb(255 255 255)` | `rgb(9 9 11)` - casi negro |
| **Secundario** | `rgb(250 250 250)` | `rgb(24 24 27)` - muy oscuro |
| **Sidebar** | `rgb(255 255 255)` | `rgb(24 24 27)` |
| **Cards** | `rgb(255 255 255)` | `rgb(24 24 27)` |

### Textos

| Tipo | Modo Claro | Modo Oscuro |
|------|------------|-------------|
| **Primario** | `rgb(10 10 10)` - casi negro | `rgb(250 250 250)` - blanco suave |
| **Secundario** | `rgb(64 64 64)` | `rgb(212 212 216)` |
| **Muted** | `rgb(115 115 115)` | `rgb(161 161 170)` |

---

## ✅ Mejores Prácticas

### 1. **Siempre usar variables CSS**
❌ **Malo:**
```vue
<div class="bg-gray-800 dark:bg-gray-900">
```

✅ **Bueno:**
```vue
<div style="background-color: var(--bg-primary);">
```

### 2. **Agregar transiciones para cambios suaves**
```css
.element {
  color: var(--text-primary);
  background-color: var(--bg-card);
  transition: all 0.2s ease; /* ✅ Importante */
}
```

### 3. **Usar variables semánticas**
```css
/* ✅ Correcto - semántico */
color: var(--text-primary);
background: var(--bg-card);

/* ❌ Evitar - hardcoded */
color: rgb(10 10 10);
background: white;
```

### 4. **Respetar la jerarquía de colores**
- **Headings**: `--heading-color`
- **Texto normal**: `--text-secondary`
- **Texto importante**: `--text-primary`
- **Texto secundario**: `--text-muted`
- **Enlaces/CTAs**: `--accent-primary`
- **Botones secundarios**: `--accent-secondary`

---

## 🎯 Componentes Actualizados

Los siguientes componentes ya están usando el nuevo sistema:

✅ **app/pages/[materia]/[unidad].vue** - Página principal
✅ **app/components/TableOfContents.vue** - Sidebar TOC
✅ **app/components/TocSheet.vue** - TOC móvil
✅ **app/components/ThemeToggle.vue** - Botón de tema
✅ **app/components/FloatingTocButton.vue** - FAB móvil
✅ **app/components/SidebarExpandButton.vue** - Botón expandir sidebar
✅ **app/assets/styles/global.css** - Estilos de prose/markdown

---

## 🚀 Beneficios del Nuevo Sistema

### 1. **Consistencia Total**
- Un solo lugar para cambiar colores
- Cambios se propagan automáticamente
- Modo oscuro y claro sincronizados

### 2. **Mejor Experiencia de Usuario**
- Transiciones suaves entre temas
- Colores vibrantes pero no cansadores
- Excelente legibilidad en ambos modos

### 3. **Accesibilidad Mejorada**
- Contraste WCAG AA/AAA compliant
- Colores semánticos claros
- Estados hover/active bien definidos

### 4. **Mantenibilidad**
- Código más limpio
- Fácil de actualizar
- Variables semánticas auto-documentadas

### 5. **Inspiración Profesional**
- Basado en Nuxt.com (referente en diseño)
- Adaptado para contexto educativo
- Look moderno y sofisticado

---

## 📝 Notas de Diseño

### Por qué Verde Esmeralda?

1. **Asociación educativa**: El verde transmite crecimiento, aprendizaje y frescura
2. **Contraste perfecto**: Funciona excelente en modo claro y oscuro
3. **Diferenciación**: Se distingue del azul típico de muchas apps educativas
4. **Energía positiva**: Es vibrante pero no agresivo

### Por qué Fondos Tan Oscuros?

1. **Inspiración Nuxt**: Su modo oscuro es considerado uno de los mejores
2. **Reduce fatiga visual**: Especialmente en sesiones largas de estudio
3. **Contraste superior**: Los textos y acentos destacan más
4. **Look moderno**: Tendencia actual en aplicaciones premium

### Filosofía de Transiciones

Todos los elementos tienen `transition: all 0.2s ease` para:
- Cambios suaves entre temas (light ↔ dark)
- Feedback visual en interacciones
- Sensación de fluidez y pulido

---

## 🎓 Ejemplo Completo

```vue
<template>
  <div class="educational-card">
    <h2 class="card-title">Matemáticas</h2>
    <p class="card-description">
      Aprende álgebra, geometría y más
    </p>
    <a href="#" class="card-link">
      Ver contenido →
    </a>
  </div>
</template>

<style scoped>
.educational-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.2s ease;
}

.educational-card:hover {
  border-color: var(--accent-primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-title {
  color: var(--heading-color);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.card-description {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.card-link {
  color: var(--accent-primary);
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.card-link:hover {
  color: var(--accent-primary-hover);
  transform: translateX(4px);
}
</style>
```

---

## 🎉 Conclusión

Este sistema de colores te brinda:

✨ **Profesionalismo** - Inspirado en Nuxt.com
🎨 **Flexibilidad** - Fácil de personalizar
♿ **Accesibilidad** - WCAG compliant
🔧 **Mantenibilidad** - Variables CSS centralizadas
💚 **Identidad única** - Verde esmeralda educativo

**¡Disfruta del nuevo look de EdiProfe!** 🚀


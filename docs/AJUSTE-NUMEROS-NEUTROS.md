# 🎨 Ajuste: Números de Pasos y Puntos Más Neutros

**Fecha:** 10 de octubre de 2025  
**Problema:** Números circulares verdes muy llamativos que rompen la armonía del diseño

## ❌ Antes

### ProcessSteps
```css
.step-number {
  background: linear-gradient(135deg, 
    var(--accent-primary), 
    var(--accent-primary-hover)
  );
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); /* Verde brillante */
}

.step-connector {
  background: linear-gradient(180deg, 
    var(--accent-primary), 
    var(--accent-primary-hover)
  );
}
```

**Problemas:**
- ❌ Verde esmeralda demasiado llamativo
- ❌ Gradientes innecesarios
- ❌ No armoniza con el resto del diseño
- ❌ Distrae del contenido principal

### KeyPoints
```css
.point-number {
  background-color: var(--accent-primary);
  color: white;
}

.point-highlight .point-number {
  background: linear-gradient(135deg, 
    var(--accent-primary), 
    var(--accent-primary-hover)
  );
}

.point-highlight {
  background: linear-gradient(135deg, 
    rgba(16, 185, 129, 0.05), 
    rgba(52, 211, 153, 0.05)
  );
}
```

**Problemas:**
- ❌ Demasiado énfasis en el número
- ❌ Verde brillante por defecto
- ❌ Gradientes complejos

## ✅ Después

### ProcessSteps
```css
.step-number {
  background-color: var(--bg-secondary);      /* Fondo gris suave */
  border: 2px solid var(--border-color);      /* Border sutil */
  color: var(--text-primary);                 /* Texto normal */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); /* Sombra sutil */
  transition: all 0.3s ease;
}

.step-number:hover {
  border-color: var(--accent-primary);        /* Color solo en hover */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.step-connector {
  background-color: var(--border-color);      /* Línea gris simple */
  opacity: 0.5;
}
```

**Mejoras:**
- ✅ Números neutros con fondo gris
- ✅ Border sutil que define el círculo
- ✅ Color de acento solo en hover (interactivo)
- ✅ Líneas conectoras grises discretas
- ✅ Armoniza con el resto del diseño

### KeyPoints
```css
.point-number {
  background-color: var(--bg-secondary);      /* Fondo gris por defecto */
  border: 2px solid var(--border-color);
  color: var(--text-primary);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.point-highlight .point-number {
  background-color: var(--accent-primary);    /* Verde solo si highlight */
  color: white;
  border-color: var(--accent-primary);
  transform: scale(1.05);                     /* Escala sutil */
}

.point-highlight {
  background-color: var(--bg-card);           /* Fondo sólido */
  border-color: var(--accent-primary);
  border-width: 2px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
```

**Mejoras:**
- ✅ Números neutros por defecto
- ✅ Color solo en items destacados (highlight)
- ✅ Sin gradientes innecesarios
- ✅ Énfasis claro en lo importante

## 🎨 Filosofía de Diseño

### Principio: Jerarquía de Color

**Regla:** El color debe usarse para **enfatizar**, no como decoración por defecto.

```
┌─────────────────────────────────────┐
│ Elementos Neutros (Mayoría)        │  ← Gris, blanco, texto normal
│ ┌─────────────────────────────┐   │
│ │ ①  Paso 1                   │   │  ← Números grises
│ │ ②  Paso 2                   │   │
│ │ ③  Paso 3                   │   │
│ └─────────────────────────────┘   │
│                                     │
│ Elementos con Color (Énfasis)      │  ← Color de acento selectivo
│ ┌─────────────────────────────┐   │
│ │ ①  Punto importante         │   │  ← Verde solo si highlight
│ └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Antes vs Después

#### ProcessSteps

**Antes:**
```
┌────┐
│ 1  │  ← Verde brillante siempre
└────┘
  │    ← Línea verde brillante
  ↓
┌────┐
│ 2  │  ← Verde brillante siempre
└────┘
```

**Después:**
```
┌────┐
│ 1  │  ← Gris neutro, hover verde
└────┘
  │    ← Línea gris sutil
  ↓
┌────┐
│ 2  │  ← Gris neutro, hover verde
└────┘
```

#### KeyPoints

**Antes:**
```
① Punto 1  ← Verde brillante
② Punto 2  ← Verde brillante
③ Punto 3  ← Verde brillante + gradiente
```

**Después:**
```
① Punto 1  ← Gris neutro
② Punto 2  ← Gris neutro
③ Punto 3  ← Verde solo si highlight=true
```

## 📊 Impacto Visual

### Reducción de Ruido Visual
- **Antes:** 3-4 elementos verdes por componente
- **Después:** 0-1 elementos verdes (solo si es importante)

### Mejor Jerarquía
- **Contenido principal** → Mayor prominencia
- **Números/indicadores** → Papel secundario de guía

### Armonía con ComparisonCard
- ComparisonCard: Color en barra top (sutil)
- ProcessSteps/KeyPoints: Color en border hover (sutil)
- InfoBox: Color en border lateral (sutil)
- **Consistencia:** Color usado para enfatizar, no decorar

## ✅ Resultado

### Visual
- ✅ Diseño más limpio y profesional
- ✅ Menos "ruido" visual
- ✅ Números cumplen función de guía sin distraer
- ✅ Color reservado para énfasis real

### Usabilidad
- ✅ Foco en el contenido, no en los números
- ✅ Highlight realmente destaca (contraste con default)
- ✅ Hover interactivo (feedback visual)

### Consistencia
- ✅ Todos los componentes usan color de forma similar
- ✅ Sistema de diseño coherente
- ✅ Filosofía "menos es más"

## 🎯 Reglas de Diseño Establecidas

1. **Color = Énfasis, no decoración**
   - Usar color solo cuando algo debe destacar
   - Default = neutro (gris, blanco)

2. **Gradientes = Excepcionales**
   - Solo en casos muy específicos
   - Preferir colores sólidos

3. **Interactividad = Feedback**
   - Hover muestra que es interactivo
   - Color de acento en hover

4. **Números = Guías, no protagonistas**
   - Círculos sutiles que organizan
   - No compiten con el contenido

---

**Archivos modificados:**
- `app/components/content/ProcessSteps.vue`
- `app/components/content/KeyPoints.vue`

**Estado:** ✅ Aplicado - Recarga la página para ver cambios

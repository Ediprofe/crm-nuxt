# 🎯 Regla Simple de Conversión - DEFINITIVA

## La Regla de Oro

```
╔════════════════════════════════════════════════════╗
║                                                    ║
║  TODO TÍTULO (## o ###) = CONTENIDO OBLIGATORIO   ║
║                                                    ║
║  Si hay un título, NO SE PUEDE OMITIR             ║
║                                                    ║
╚════════════════════════════════════════════════════╝
```

---

## 🔄 Proceso Simplificado

### 1. Análisis del Archivo Original

```bash
node scripts/analizar-contenido.js content/materia/archivo-old.md
```

**El script te dirá:**
- ✅ Cuántos títulos hay en total (TODOS obligatorios)
- ✅ Cuáles tienen videos
- ✅ Cuáles son prácticas/talleres
- ✅ La estructura jerárquica completa

### 2. Conversión con Componentes

**Respetando la jerarquía de títulos**, aplicar componentes según el tipo de contenido:

#### A. Títulos se Mantienen SIEMPRE
```markdown
## Título original          ← SE MANTIENE
### Subtítulo original      ← SE MANTIENE
```

#### B. Tablas → ComparisonCard
```markdown
## Título

::comparison-card
---
title: "Título descriptivo"
items: [...]
---
::
```

#### C. Advertencias/Tips → InfoBox
```markdown
::info-box{type="warning" title="Importante"}
Contenido de la advertencia
::
```

#### D. Listas Importantes → KeyPoints o ProcessSteps
```markdown
::key-points
---
title: "Puntos Clave"
points: [...]
---
::
```

#### E. Ejercicios → PracticeExercise
```markdown
::practice-exercise
---
title: "Práctica: Tema"
instructions: "Instrucciones..."
---
[Contenido del ejercicio]
::
```

### 3. Verificación Final

```bash
# Contar títulos en el original
grep -c "^##" archivo-old.md

# Contar títulos en el convertido
grep -c "^##" archivo-mejorado.md

# LOS NÚMEROS DEBEN SER IGUALES ✅
```

---

## ✅ Checklist Ultra-Simplificado

Para cada archivo:

- [ ] 🚨 **CRÍTICO:** Contar títulos en original
- [ ] 🚨 **CRÍTICO:** Verificar que archivo convertido tenga el mismo número
- [ ] Aplicar PracticeExercise a secciones de práctica/taller
- [ ] Aplicar ComparisonCard a tablas comparativas
- [ ] Aplicar InfoBox a advertencias/tips
- [ ] Aplicar KeyPoints/ProcessSteps a listas
- [ ] Verificar que TODO el texto explicativo esté presente
- [ ] Verificar spacing y formato
- [ ] ✅ Listo

---

## 📊 Ejemplo: 05-enlace-quimico-old.md

**Análisis del script:**
```
🎯 TOTAL DE TÍTULOS (TODOS OBLIGATORIOS): 27
   ├─ Secciones con video:                9
   ├─ Secciones de práctica:              0 (ya convertidas a componente)
   └─ Otras secciones:                    18

⚠️  VERIFICAR: El archivo convertido debe tener 27 títulos
```

**Estructura completa (TODOS obligatorios):**
1. ## Resumen de la unidad
2. ## Enlace químico - introducción 📹
3.   ### Clasificación de los enlaces químicos
4. ## Enlace iónico 📹
5.   ### Mecanismo y formación
6.   ### Ejemplos de enlaces iónicos
7. ## Enlace covalente 📹
8.   ### Características del enlace covalente
9.   ### Regla del dueto (excepción del hidrógeno)
10.   ### Enlace covalente coordinado o dativo
11.   ### Enlace covalente doble 📹
12.   ### Enlace covalente triple 📹
13. ## Repaso: tipos de enlace covalente
14. ## Enlace metálico 📹
15.   ### Mecanismo de unión
16.   ### Electrones deslocalizados
17.   ### Ejemplo con zinc
18. ## Escalas de electronegatividad 📹
19.   ### Exclusión del enlace metálico
20.   ### Clasificación de enlaces según la diferencia de electronegatividad
21. ## Tipos de enlace químico - comparativo 📹
22. ## Propiedades periódicas 📹
23.   ### 1. Radio o Tamaño Atómico
24.   ### 2. Electronegatividad
25.   ### 3. Afinidad Electrónica
26.   ### 4. Energía de Ionización
27.   ### Resumen general de tendencias

**Resultado:** TODOS estos 27 títulos deben estar en la versión convertida.

---

## 🎨 Tu Trabajo: Aplicar Didáctica con Componentes

Una vez que tienes claro que **TODO el contenido se conserva**, tu trabajo es:

1. **Mejorar la presentación** con componentes Vue
2. **Hacer el contenido más interactivo** y visual
3. **Organizar mejor** la información con ComparisonCard, InfoBox, etc.
4. **Facilitar el aprendizaje** con estructura clara

**PERO SIEMPRE:**
- ✅ Conservando TODOS los títulos
- ✅ Conservando TODO el contenido
- ✅ Respetando la jerarquía

---

## ❌ Lo que NO Hacer

```
❌ "Este título parece redundante, lo omito"
❌ "Esta sección es muy corta, la uno con otra"
❌ "Este subtítulo no es importante, lo elimino"
❌ "Ya hay mucho contenido, resumo esto"
❌ "Este video ya está en otra sección, lo quito"
```

---

## ✅ Lo que SÍ Hacer

```
✅ "Hay un título → Lo conservo"
✅ "Hay contenido bajo el título → Lo conservo completo"
✅ "Ahora aplico componentes para mejorarlo"
✅ "Verifico que el conteo de títulos sea igual"
```

---

## 🚀 Flujo de Trabajo Definitivo

```
1. Abrir archivo-old.md
   ↓
2. Ejecutar script de análisis
   ↓
3. Ver que hay X títulos (TODOS obligatorios)
   ↓
4. Crear archivo-mejorado.md
   ↓
5. Copiar TODOS los títulos y contenido
   ↓
6. Aplicar componentes Vue según tipo de contenido
   ↓
7. Verificar conteo: ¿mismo número de títulos? ✅
   ↓
8. Verificar contenido: ¿está todo? ✅
   ↓
9. ¡Listo! 🎉
```

---

## 📝 Fórmula Final

```
Archivo Original
    ↓
Identificar TODOS los títulos (N títulos)
    ↓
Conservar los N títulos + TODO su contenido
    ↓
Aplicar componentes Vue para mejorar presentación
    ↓
Verificar: ¿Archivo convertido tiene N títulos? ✅
    ↓
¡Conversión exitosa! 🎉
```

**Es así de simple.**

No hay excepciones, no hay omisiones, no hay "depende". 

**TODO título = TODO contenido = Obligatorio. Punto.**

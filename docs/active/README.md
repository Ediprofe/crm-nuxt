# 📚 Documentación del Sistema de Contenido

Este directorio contiene toda la documentación sobre cómo crear, convertir y mantener el contenido educativo del proyecto.

---

## 🗂️ Índice de Documentos

### 📖 **Documentos Principales**

1. **[FLUJO-CONVERSION-CONTENIDO.md](./FLUJO-CONVERSION-CONTENIDO.md)** ⭐ **EMPEZAR AQUÍ**
   - Estructura de carpetas (`content-source/` vs `content/`)
   - Metodología completa de conversión
   - Reglas de conversión automática
   - Flujo de trabajo paso a paso

2. **[EJEMPLOS-CONVERSION-COMPONENTES.md](./EJEMPLOS-CONVERSION-COMPONENTES.md)**
   - Ejemplos completos de conversión
   - Tabla de decisiones (qué componente usar)
   - Plantillas rápidas para cada componente
   - Errores comunes y cómo evitarlos

3. **[REGLA-SIMPLE-CONVERSION.md](./REGLA-SIMPLE-CONVERSION.md)**
   - Regla universal: **TODO título = contenido obligatorio**
   - Métodos de verificación
   - Ejemplos de aplicación

4. **[RESUMEN-SISTEMA-EJERCICIOS.md](./RESUMEN-SISTEMA-EJERCICIOS.md)**
   - Sistema de detección automática de ejercicios
   - Componente `PracticeExercise`
   - Casos de uso

### 🎨 **Documentos de Diseño**

5. **[SISTEMA-DISENO-EDUCATIVO.md](./SISTEMA-DISENO-EDUCATIVO.md)**
   - Sistema de diseño completo
   - Componentes disponibles
   - Guías de estilo

6. **[GUIA-COMPONENTES.md](./GUIA-COMPONENTES.md)**
   - Guía técnica de componentes Vue
   - Props y configuración
   - Ejemplos de uso

7. **[README-COMPONENTES.md](./README-COMPONENTES.md)**
   - Catálogo de componentes
   - Cuándo usar cada uno

### 🔧 **Documentos Técnicos**

8. **[METODOLOGIA-CONTENIDO.md](./METODOLOGIA-CONTENIDO.md)**
   - Metodología pedagógica
   - Estructura de contenido
   - Mejores prácticas

9. **[MEJORAS-DISENO.md](./MEJORAS-DISENO.md)**
   - Mejoras implementadas
   - Historial de cambios
   - Roadmap

---

## 🚀 Inicio Rápido

### Para Profesores (Crear Contenido)

1. **Lee:** `FLUJO-CONVERSION-CONTENIDO.md` (sección "Metodología de Conversión")
2. **Escribe** en `content-source/` usando markdown simple
3. **Usa tablas markdown** cuando quieras comparaciones visuales
4. **Títulos con "Práctica"** se convertirán automáticamente en ejercicios
5. **Pide a Copilot:** "Convierte este archivo con componentes"

### Para Desarrolladores (Entender el Sistema)

1. **Lee:** `FLUJO-CONVERSION-CONTENIDO.md` (completo)
2. **Revisa:** `EJEMPLOS-CONVERSION-COMPONENTES.md` (plantillas)
3. **Consulta:** `GUIA-COMPONENTES.md` (detalles técnicos)
4. **Verifica:** Script `analizar-contenido.js` para análisis

---

## 📋 Reglas de Oro

### 1️⃣ **TODO Título es Sagrado**
```bash
# Verificar que no se pierden títulos
grep -c "^##" content-source/archivo.md
grep -c "^##" content/archivo.md
# ⚠️ Los números DEBEN ser iguales
```

### 2️⃣ **Tabla Markdown = ComparisonCard**
```markdown
| Col1 | Col2 |     →     ::comparison-card
|------|------|           ---
| A    | B    |           title: "..."
                          items: [...]
                          ---
                          ::
```

### 3️⃣ **Título con "Práctica" = PracticeExercise**
```markdown
## ✏️ Práctica      →     ::practice-exercise
                          ---
Complete la tabla...      title: "..."
                          instructions: "..."
| ... | ... |             ---
                          | ... | ... |
                          ::
```

### 4️⃣ **Contenido Crudo = Interpretación Inteligente**
```markdown
Lista de conceptos  →  ::key-points
Pasos numerados     →  ::process-steps
Excepción/Aviso     →  ::info-box{type="warning"}
```

---

## 🔄 Flujo de Trabajo Visual

```
📝 PROFESOR ESCRIBE              🤖 COPILOT CONVIERTE              👨‍🎓 ESTUDIANTE VE
─────────────────────           ──────────────────────           ─────────────────

content-source/                 Análisis semántico               content/
├── markdown plano              ├── Detecta tablas               ├── Componentes Vue
├── Tablas simples              ├── Detecta prácticas           ├── ComparisonCard
├── Listas                      ├── Interpreta contexto         ├── PracticeExercise
└── Texto crudo                 └── Aplica componentes          ├── KeyPoints
                                                                 ├── ProcessSteps
                                                                 └── InfoBox

                                      ⬇️
                                Nuxt Content
                                      ⬇️
                                Página Web
                                (localhost:3000)
```

---

## 🛠️ Herramientas Disponibles

### Script de Análisis
```bash
# Analizar estructura de un archivo
node scripts/analizar-contenido.js content-source/quimica/05-enlace-quimico.md

# Muestra:
# - Total de títulos (TODOS obligatorios)
# - Secciones con videos
# - Secciones de práctica
# - Estructura completa
```

### Comandos de Verificación
```bash
# Contar títulos
grep -c "^##" content-source/quimica/archivo.md
grep -c "^##" content/quimica/archivo.md

# Ver estructura
grep "^##" content-source/quimica/archivo.md
grep "^##" content/quimica/archivo.md

# Comparar archivos
diff content-source/quimica/archivo.md content/quimica/archivo.md
```

---

## 📊 Componentes Disponibles

| Componente | Uso | Archivo |
|------------|-----|---------|
| `ComparisonCard` | Comparaciones, tablas | `components/content/ComparisonCard.vue` |
| `PracticeExercise` | Ejercicios, prácticas | `components/content/PracticeExercise.vue` |
| `KeyPoints` | Listas importantes | `components/content/KeyPoints.vue` |
| `ProcessSteps` | Procesos secuenciales | `components/content/ProcessSteps.vue` |
| `InfoBox` | Avisos, conceptos | `components/content/InfoBox.vue` |

**Documentación completa:** `GUIA-COMPONENTES.md`

---

## 🎯 Casos de Uso Comunes

### ✏️ Agregar Nueva Unidad

1. Crear archivo en `content-source/quimica/06-nueva-unidad.md`
2. Escribir contenido en markdown simple
3. Usar tablas para comparaciones
4. Títulos con "Práctica" para ejercicios
5. Pedir conversión: "Convierte este archivo"
6. Verificar títulos: `grep -c "^##"`

### 🔄 Actualizar Unidad Existente

1. Editar archivo en `content-source/`
2. Hacer cambios (agregar contenido, corregir, etc.)
3. Re-convertir: "Reconvierte este archivo actualizado"
4. Verificar que no se perdieron títulos

### 🐛 Corregir Error de Parsing

```bash
# Si ves: "parsing is failed"
# 1. Verificar frontmatter:
---             # ✅ Tres guiones
title: ...
---             # ✅ Tres guiones

# 2. Verificar componentes MDC:
::component
---             # ✅ Separador YAML
props: ...
---
::              # ✅ Cierre

# 3. Ver errores en terminal Nuxt
```

---

## 📞 Soporte

- **Documentación completa:** Lee los archivos en orden
- **Ejemplos:** `EJEMPLOS-CONVERSION-COMPONENTES.md`
- **Plantillas:** Sección de plantillas en ejemplos
- **Script de ayuda:** `node scripts/analizar-contenido.js`

---

## 🔖 Versión

**Última actualización:** Octubre 2025  
**Sistema:** Nuxt Content + MDC + Componentes Vue  
**Metodología:** Conversión inteligente con interpretación semántica

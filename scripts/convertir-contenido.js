#!/usr/bin/env node

/**
 * Script para convertir archivos Markdown con tablas a formato con componentes Vue
 * Uso: node scripts/convertir-contenido.js content/materia/archivo.md
 */

import fs from 'fs'
import path from 'path'

const args = process.argv.slice(2)
if (args.length === 0) {
  console.error('❌ Error: Debes proporcionar la ruta del archivo')
  console.log('Uso: node scripts/convertir-contenido.js content/materia/archivo.md')
  process.exit(1)
}

const filePath = args[0]
const fullPath = path.resolve(filePath)

if (!fs.existsSync(fullPath)) {
  console.error(`❌ Error: El archivo ${filePath} no existe`)
  process.exit(1)
}

console.log(`📄 Leyendo: ${filePath}`)
let content = fs.readFileSync(fullPath, 'utf-8')

// Contador de conversiones
let conversiones = {
  tablas: 0,
  listas: 0,
  warnings: 0
}

// 1. Convertir títulos inconsistentes
console.log('\n🔧 Normalizando títulos...')
// Remover emojis de títulos nivel 2
content = content.replace(/^## ([\u{1F000}-\u{1F9FF}\u{2600}-\u{26FF}]\s*)+(.+)$/gmu, '## $2')

// 2. Detectar y convertir tablas a ComparisonCard
console.log('\n🔄 Convirtiendo tablas a ComparisonCard...')
const tableRegex = /\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/g
let match

const tables = []
while ((match = tableRegex.exec(content)) !== null) {
  tables.push({
    fullMatch: match[0],
    headers: match[1].split('|').filter(h => h.trim()),
    rows: match[2].trim().split('\n').map(row => 
      row.split('|').filter(cell => cell.trim())
    )
  })
}

if (tables.length > 0) {
  console.log(`   Encontradas ${tables.length} tablas`)
  
  tables.forEach((table, idx) => {
    conversiones.tablas++
    
    // Buscar título previo (si existe)
    const beforeTable = content.substring(0, content.indexOf(table.fullMatch))
    const titleMatch = beforeTable.match(/###?\s+([^\n]+)$/)
    const title = titleMatch ? titleMatch[1].trim() : `Comparación ${idx + 1}`
    
    // Generar items para ComparisonCard
    const items = table.rows.map((row, rowIdx) => {
      const colors = ['primary', 'secondary', 'accent', 'success', 'warning']
      return `  - title: "${row[0]?.trim() || 'Item ' + (rowIdx + 1)}"
    description: "${row[1]?.trim() || ''}"
    ${row[2] ? `details: "${row[2].trim()}"` : ''}
    color: "${colors[rowIdx % colors.length]}"`
    }).join('\n')
    
    // Generar componente
    const component = `::comparison-card
---
title: "${title}"
columns: ${table.headers.length}
items:
${items}
---
::`
    
    // Reemplazar tabla y título previo si existe
    let toReplace = table.fullMatch
    if (titleMatch) {
      toReplace = titleMatch[0] + '\n\n' + table.fullMatch
    }
    
    content = content.replace(toReplace, component)
    console.log(`   ✅ Tabla ${idx + 1} convertida: "${title}"`)
  })
}

// 3. Detectar listas numeradas y sugerir conversión
console.log('\n🔍 Analizando listas numeradas...')
const numberedListRegex = /^(\d+\.\s+.+\n)+/gm
const lists = content.match(numberedListRegex)

if (lists && lists.length > 0) {
  console.log(`   ⚠️  Encontradas ${lists.length} listas numeradas`)
  console.log('   💡 Considera convertirlas manualmente a KeyPoints o ProcessSteps')
  conversiones.listas = lists.length
}

// 4. Asegurar spacing correcto
console.log('\n🎨 Aplicando spacing consistente...')
// Asegurar línea vacía antes y después de componentes
content = content.replace(/([^\n])\n(::)/g, '$1\n\n$2')
content = content.replace(/(::)\n([^\n])/g, '$1\n\n$2')

// Asegurar línea vacía después de títulos ##
content = content.replace(/^(##\s+.+)\n([^#\n])/gm, '$1\n\n$2')

// 5. Agregar notas de advertencia como InfoBox
console.log('\n💡 Buscando advertencias para InfoBox...')
const warningPatterns = [
  { regex: /\*\*Nota:\*\*\s+(.+)/gi, type: 'info' },
  { regex: /\*\*Importante:\*\*\s+(.+)/gi, type: 'warning' },
  { regex: /\*\*Advertencia:\*\*\s+(.+)/gi, type: 'warning' },
  { regex: /\*\*Tip:\*\*\s+(.+)/gi, type: 'tip' },
  { regex: /\*\*Error común:\*\*\s+(.+)/gi, type: 'error' }
]

warningPatterns.forEach(({ regex, type }) => {
  const matches = [...content.matchAll(regex)]
  matches.forEach(match => {
    conversiones.warnings++
    const infoBox = `\n::info-box{type="${type}" title="💡 ${type === 'warning' ? 'Importante' : type === 'error' ? 'Error Común' : 'Nota'}"}\n${match[1].trim()}\n::\n`
    content = content.replace(match[0], infoBox)
  })
})

if (conversiones.warnings > 0) {
  console.log(`   ✅ ${conversiones.warnings} advertencias convertidas a InfoBox`)
}

// Guardar archivo mejorado
const dir = path.dirname(fullPath)
const filename = path.basename(fullPath, '.md')
const outputPath = path.join(dir, `${filename}-mejorado.md`)

fs.writeFileSync(outputPath, content, 'utf-8')

// Resumen
console.log('\n' + '='.repeat(60))
console.log('✨ CONVERSIÓN COMPLETADA')
console.log('='.repeat(60))
console.log(`📊 Resumen:`)
console.log(`   • Tablas convertidas: ${conversiones.tablas}`)
console.log(`   • InfoBoxes creados: ${conversiones.warnings}`)
console.log(`   • Listas para revisar: ${conversiones.listas}`)
console.log(`\n📁 Archivo guardado en: ${outputPath}`)
console.log('\n📋 Próximos pasos:')
console.log('   1. Revisa el archivo generado')
console.log('   2. Ajusta manualmente listas a KeyPoints/ProcessSteps')
console.log('   3. Verifica colores y iconos en ComparisonCards')
console.log('   4. Si todo está bien, reemplaza el archivo original')
console.log('='.repeat(60) + '\n')

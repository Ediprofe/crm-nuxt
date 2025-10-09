/**
 * 🔬 SCRIPT DE VALIDACIÓN COMPLETA
 * Sistema de Wrapper Dinámico para Tablas v4.0
 * 
 * INSTRUCCIONES:
 * 1. Abrir DevTools (F12)
 * 2. Copiar y pegar este script completo en la consola
 * 3. Ejecutar: validarSistemaTablas()
 * 4. Revisar resultados con emojis visuales
 */

function validarSistemaTablas() {
  console.clear()
  console.log('%c🔬 VALIDACIÓN COMPLETA - Sistema de Wrapper Dinámico v4.0', 'font-size: 18px; font-weight: bold; color: #10b981; background: #064e3b; padding: 10px;')
  console.log('═'.repeat(80))

  // ============================================================================
  // DATOS BÁSICOS
  // ============================================================================
  
  const viewport = window.innerWidth
  const isMobile = viewport < 768
  const isTablet = viewport >= 768 && viewport < 1024
  const isDesktop = viewport >= 1024
  
  const tables = document.querySelectorAll('.prose table')
  const wrappedTables = document.querySelectorAll('table[data-table-wrapped]')
  const wrappers = document.querySelectorAll('.table-wrapper-mobile')

  console.log('\n%c📐 VIEWPORT', 'font-weight: bold; font-size: 14px;')
  console.log(`   Ancho: ${viewport}px`)
  console.log(`   Categoría: ${isMobile ? '📱 Móvil' : isTablet ? '📲 Tablet' : '🖥️ Desktop'}`)
  console.log(`   Breakpoint: ${isMobile ? '<768px' : isTablet ? '768-1023px' : '≥1024px'}`)

  console.log('\n%c📊 ESTADÍSTICAS DE TABLAS', 'font-weight: bold; font-size: 14px;')
  console.log(`   Total tablas: ${tables.length}`)
  console.log(`   Tablas envueltas: ${wrappedTables.length}`)
  console.log(`   Wrappers en DOM: ${wrappers.length}`)

  // ============================================================================
  // VALIDACIONES CRÍTICAS
  // ============================================================================
  
  console.log('\n%c✅ VALIDACIONES CRÍTICAS', 'font-weight: bold; font-size: 14px; color: #10b981;')
  
  let erroresCount = 0
  let warningsCount = 0
  let successCount = 0

  // Validación 1: Consistencia wrapper vs wrapped
  if (wrappedTables.length === wrappers.length) {
    console.log(`   ✅ Consistencia: ${wrappedTables.length} wrapped === ${wrappers.length} wrappers`)
    successCount++
  } else {
    console.warn(`   ⚠️ INCONSISTENCIA: ${wrappedTables.length} wrapped !== ${wrappers.length} wrappers`)
    warningsCount++
  }

  // Validación 2: Estado correcto según viewport
  if (isMobile) {
    if (wrappedTables.length === tables.length && tables.length > 0) {
      console.log(`   ✅ Móvil: Todas las tablas envueltas (${tables.length}/${tables.length})`)
      successCount++
    } else if (tables.length === 0) {
      console.log(`   ℹ️ Móvil: Sin tablas en la página`)
    } else {
      console.warn(`   ⚠️ Móvil: ${wrappedTables.length}/${tables.length} tablas envueltas`)
      warningsCount++
    }
  } else {
    if (wrappedTables.length === 0 && tables.length > 0) {
      console.log(`   ✅ Desktop/Tablet: Ninguna tabla envuelta (0/${tables.length})`)
      successCount++
    } else if (tables.length === 0) {
      console.log(`   ℹ️ Desktop/Tablet: Sin tablas en la página`)
    } else {
      console.error(`   ❌ Desktop/Tablet: ${wrappedTables.length} tablas aún envueltas (deberían ser 0)`)
      erroresCount++
    }
  }

  // Validación 3: Alineación de headers (solo desktop/tablet)
  if (!isMobile && tables.length > 0) {
    console.log('\n%c🎯 ALINEACIÓN DE HEADERS (Desktop/Tablet)', 'font-weight: bold; font-size: 14px;')
    
    tables.forEach((table, index) => {
      const thead = table.querySelector('thead')
      const tbody = table.querySelector('tbody')
      
      if (thead && tbody) {
        const display = window.getComputedStyle(table).display
        const displayOk = display === 'table'
        
        console.log(`   Tabla ${index + 1}:`)
        console.log(`      - Display: ${display} ${displayOk ? '✅' : '❌ (debería ser "table")'}`)
        
        if (!displayOk) erroresCount++
        else successCount++
        
        const th = thead.querySelector('th')
        const td = tbody.querySelector('td')
        
        if (th && td) {
          const thWidth = th.offsetWidth
          const tdWidth = td.offsetWidth
          const diff = Math.abs(thWidth - tdWidth)
          
          if (diff < 2) {
            console.log(`      - Alineación: ✅ Perfecta (diff: ${diff}px)`)
            successCount++
          } else if (diff < 10) {
            console.log(`      - Alineación: ⚠️ Aceptable (diff: ${diff}px)`)
            warningsCount++
          } else {
            console.error(`      - Alineación: ❌ Desalineada (diff: ${diff}px)`)
            erroresCount++
          }
        }
      }
    })
  }

  // Validación 4: Estructura DOM correcta en móvil
  if (isMobile && wrappers.length > 0) {
    console.log('\n%c📱 ESTRUCTURA DOM MÓVIL', 'font-weight: bold; font-size: 14px;')
    
    wrappers.forEach((wrapper, index) => {
      const table = wrapper.querySelector('table')
      const hasClasses = wrapper.classList.contains('table-wrapper-mobile')
      
      console.log(`   Wrapper ${index + 1}:`)
      console.log(`      - Clases correctas: ${hasClasses ? '✅' : '❌'}`)
      console.log(`      - Contiene <table>: ${table ? '✅' : '❌'}`)
      console.log(`      - Atributo data-table-wrapped: ${table?.hasAttribute('data-table-wrapped') ? '✅' : '❌'}`)
      
      if (!hasClasses || !table || !table.hasAttribute('data-table-wrapped')) {
        erroresCount++
      } else {
        successCount++
      }
    })
  }

  // Validación 5: Debug tools disponibles
  console.log('\n%c🔧 DEBUG TOOLS', 'font-weight: bold; font-size: 14px;')
  if (typeof window.__tableWrapper !== 'undefined') {
    console.log('   ✅ window.__tableWrapper disponible')
    console.log('   Comandos:')
    console.log('      - window.__tableWrapper.isMobile()')
    console.log('      - window.__tableWrapper.getWrappedCount()')
    console.log('      - window.__tableWrapper.processNow()')
    console.log('      - window.__tableWrapper.findTables()')
    successCount++
  } else {
    console.warn('   ⚠️ Debug tools NO disponibles (solo en modo desarrollo)')
    warningsCount++
  }

  // ============================================================================
  // INSPECCIÓN DETALLADA
  // ============================================================================
  
  if (tables.length > 0) {
    console.log('\n%c🔍 INSPECCIÓN DETALLADA DE TABLAS', 'font-weight: bold; font-size: 14px;')
    
    tables.forEach((table, index) => {
      const wrapped = table.hasAttribute('data-table-wrapped')
      const parent = table.parentElement
      const parentClass = parent?.className || 'N/A'
      const display = window.getComputedStyle(table).display
      
      console.group(`   📊 Tabla ${index + 1}`)
      console.log(`Envuelta: ${wrapped ? '✅ Sí' : '❌ No'}`)
      console.log(`Parent: ${parentClass}`)
      console.log(`Display: ${display}`)
      console.log(`Ancho: ${table.offsetWidth}px`)
      console.log(`Columnas: ${table.querySelectorAll('th').length}`)
      console.groupEnd()
    })
  }

  // ============================================================================
  // RESUMEN FINAL
  // ============================================================================
  
  console.log('\n' + '═'.repeat(80))
  console.log('\n%c📈 RESUMEN DE VALIDACIÓN', 'font-weight: bold; font-size: 16px;')
  console.log(`   ✅ Validaciones exitosas: ${successCount}`)
  console.log(`   ⚠️ Warnings: ${warningsCount}`)
  console.log(`   ❌ Errores críticos: ${erroresCount}`)

  // Resultado final
  const allGood = erroresCount === 0 && warningsCount === 0
  const hasWarnings = erroresCount === 0 && warningsCount > 0
  const hasCriticalErrors = erroresCount > 0

  console.log('\n' + '═'.repeat(80))
  
  if (allGood) {
    console.log('%c✅ VALIDACIÓN EXITOSA', 'color: white; background: #10b981; font-weight: bold; font-size: 16px; padding: 8px 16px;')
    console.log('%cSistema funcionando perfectamente ✨', 'color: #10b981; font-size: 14px;')
  } else if (hasWarnings) {
    console.log('%c⚠️ VALIDACIÓN CON WARNINGS', 'color: white; background: #f59e0b; font-weight: bold; font-size: 16px; padding: 8px 16px;')
    console.log('%cSistema funcional pero revisar warnings arriba', 'color: #f59e0b; font-size: 14px;')
  } else {
    console.log('%c❌ VALIDACIÓN FALLIDA', 'color: white; background: #ef4444; font-weight: bold; font-size: 16px; padding: 8px 16px;')
    console.log('%cSistema con errores críticos - Revisar arriba', 'color: #ef4444; font-size: 14px;')
  }

  console.log('\n' + '═'.repeat(80))
  
  // Sugerencias según contexto
  console.log('\n%c💡 SUGERENCIAS', 'font-weight: bold; font-size: 14px;')
  
  if (isMobile && wrappedTables.length === 0 && tables.length > 0) {
    console.log('   🔧 Forzar procesamiento: window.__tableWrapper?.processNow()')
    console.log('   🔄 O recargar página: Ctrl+Shift+R (Win) / Cmd+Shift+R (Mac)')
  }
  
  if (!isMobile && wrappedTables.length > 0) {
    console.log('   🔧 Forzar desenvolver: window.__tableWrapper?.processNow()')
    console.log('   🔄 O recargar página completamente')
  }
  
  if (tables.length === 0) {
    console.log('   ℹ️ Esta página no tiene tablas para validar')
    console.log('   📍 Navega a: /quimica/enlace-quimico para ver tablas')
  }
  
  console.log('\n   📚 Documentación: WRAPPER-DINAMICO-IMPLEMENTADO.md')
  console.log('   🧪 Testing: TESTING-QUICK-START.md')
  
  return {
    viewport,
    isMobile,
    tables: tables.length,
    wrapped: wrappedTables.length,
    success: successCount,
    warnings: warningsCount,
    errors: erroresCount,
    status: allGood ? 'SUCCESS' : hasWarnings ? 'WARNING' : 'ERROR'
  }
}

// Ejecutar automáticamente
console.log('%c💡 Script cargado. Ejecuta: validarSistemaTablas()', 'color: #3b82f6; font-size: 12px;')

// Export para uso posterior
if (typeof window !== 'undefined') {
  window.validarSistemaTablas = validarSistemaTablas
}

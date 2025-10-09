// ============================================================================
// SCRIPT DE DEBUG - VERIFICAR ESTADO DE TABLAS v2.0
// Ejecutar en Console de DevTools
// Versión compatible con ProseTable.vue y nuevo plugin
// ============================================================================

console.clear();
console.log('%c🔬 DEBUG - ESTADO DE TABLAS RESPONSIVE v2.0', 'font-size: 16px; font-weight: bold; color: #10b981;');

// 1. Verificar si hay tablas
const allTables = document.querySelectorAll('.prose table');
console.log(`\n📊 Total tablas encontradas: ${allTables.length}`);

if (allTables.length === 0) {
  console.log('%c❌ NO HAY TABLAS EN LA PÁGINA', 'color: red; font-weight: bold;');
} else {
  allTables.forEach((table, index) => {
    console.log(`\n--- TABLA ${index + 1} ---`);
    
    // Verificar clase responsive-table
    const hasClass = table.classList.contains('responsive-table');
    console.log(`${hasClass ? '✅' : '❌'} Clase 'responsive-table': ${hasClass ? 'SÍ' : 'NO'}`);
    
    // Verificar wrapper .table-wrap
    const hasWrapper = table.parentElement?.classList.contains('table-wrap');
    console.log(`${hasWrapper ? '✅' : '❌'} Wrapper 'table-wrap': ${hasWrapper ? 'SÍ' : 'NO'}`);
    
    // Verificar que el wrapper es hijo directo de .prose
    const isDirectChild = table.parentElement?.parentElement?.classList.contains('prose');
    console.log(`${isDirectChild ? '✅' : '⚠️'} Estructura correcta: ${isDirectChild ? 'SÍ' : 'NO'}`);
    
    // Verificar data-labels
    const cells = table.querySelectorAll('tbody td');
    const cellsWithLabel = table.querySelectorAll('tbody td[data-label]');
    console.log(`📝 Celdas totales: ${cells.length}`);
    console.log(`${cellsWithLabel.length > 0 ? '✅' : '❌'} Celdas con data-label: ${cellsWithLabel.length}`);
    
    if (cellsWithLabel.length > 0) {
      const firstLabel = cellsWithLabel[0].getAttribute('data-label');
      console.log(`   Ejemplo: data-label="${firstLabel}"`);
    } else if (cells.length > 0) {
      console.log('   ⚠️ Las celdas aún no tienen data-labels (plugin pendiente)');
    }
    
    // Verificar headers
    const headers = table.querySelectorAll('thead th');
    console.log(`📋 Headers encontrados: ${headers.length}`);
    if (headers.length > 0) {
      const headerTexts = Array.from(headers, th => th.textContent?.trim());
      console.log(`   Headers: [${headerTexts.join(', ')}]`);
    }
    
    // Verificar atributo de procesamiento
    const isEnhanced = table.hasAttribute('data-responsive-enhanced');
    console.log(`${isEnhanced ? '✅' : '⏳'} Procesada por plugin: ${isEnhanced ? 'SÍ' : 'PENDIENTE'}`);
  });
  
  // Verificar viewport
  console.log(`\n📱 Viewport: ${window.innerWidth}px`);
  const isMobile = window.innerWidth < 768;
  console.log(`   Modo: ${isMobile ? 'MÓVIL (<768px)' : 'DESKTOP (≥768px)'}`);
  
  // Verificar CSS aplicado en móvil
  if (isMobile) {
    const firstTd = document.querySelector('table.responsive-table tbody td');
    if (firstTd) {
      const styles = window.getComputedStyle(firstTd);
      console.log(`\n🎨 CSS aplicado en TD (modo card):`);
      console.log(`   display: ${styles.display}`);
      console.log(`   flex-direction: ${styles.flexDirection}`);
      console.log(`   gap: ${styles.gap}`);
      console.log(`   padding: ${styles.padding}`);
      console.log(`   border-bottom: ${styles.borderBottom}`);
      
      // Verificar ::before
      const beforeStyles = window.getComputedStyle(firstTd, '::before');
      console.log(`\n🎨 CSS aplicado en TD::before (label):`);
      console.log(`   content: ${beforeStyles.content}`);
      console.log(`   display: ${beforeStyles.display}`);
      console.log(`   font-weight: ${beforeStyles.fontWeight}`);
      console.log(`   font-size: ${beforeStyles.fontSize}`);
      console.log(`   color: ${beforeStyles.color}`);
    }
  } else {
    const thead = document.querySelector('table.responsive-table thead');
    if (thead) {
      const theadStyles = window.getComputedStyle(thead);
      console.log(`\n🎨 CSS aplicado en THEAD (desktop):`);
      console.log(`   display: ${theadStyles.display}`);
      console.log(`   position: ${theadStyles.position}`);
    }
  }
  
  // Verificar si el plugin está disponible
  const pluginAvailable = typeof window.$nuxt?.$enhanceTables === 'function';
  console.log(`\n🔌 Plugin disponible: ${pluginAvailable ? 'SÍ ✅' : 'NO ❌'}`);
  
  // Verificar errores de hidratación
  console.log(`\n🔍 Verificar errores de hidratación:`);
  const hydrationErrors = window.performance?.getEntriesByType?.('mark')?.filter(mark => 
    mark.name.includes('hydration')
  );
  if (hydrationErrors && hydrationErrors.length > 0) {
    console.log(`   ⚠️ Se detectaron ${hydrationErrors.length} marcas de hidratación`);
  } else {
    console.log(`   ✅ No se detectaron problemas de hidratación`);
  }
  
  // Resumen final
  const allHaveClass = Array.from(allTables).every(t => t.classList.contains('responsive-table'));
  const allHaveWrapper = Array.from(allTables).every(t => t.parentElement?.classList.contains('table-wrap'));
  const allHaveLabels = document.querySelectorAll('tbody td[data-label]').length > 0;
  
  const allGood = allHaveClass && allHaveWrapper && allHaveLabels;
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`${allGood ? '✅✅✅' : '⚠️⚠️⚠️'} ESTADO GENERAL: ${allGood ? 'TODO OK' : 'HAY PROBLEMAS'}`);
  console.log(`${'='.repeat(60)}`);
  
  if (!allGood) {
    console.log('\n💡 Diagnóstico:');
    if (!allHaveClass) console.log('   ❌ Faltan clases .responsive-table');
    if (!allHaveWrapper) console.log('   ❌ Faltan wrappers .table-wrap');
    if (!allHaveLabels) console.log('   ⚠️ Faltan data-labels (plugin no ejecutado)');
    
    console.log('\n🔧 Soluciones:');
    if (pluginAvailable) {
      console.log('   1. Ejecutar manualmente: $nuxt.$enhanceTables()');
    }
    console.log('   2. Esperar 100ms (plugin auto-ejecuta)');
    console.log('   3. Recargar con Cmd/Ctrl + Shift + R');
    console.log('   4. Verificar que ProseTable.vue está en /app/components/content/');
  } else {
    console.log('\n🎉 Todo funcionando correctamente!');
    console.log('   - Tablas renderizadas con ProseTable.vue');
    console.log('   - Wrappers presentes desde SSR');
    console.log('   - Data-labels aplicados por plugin');
    console.log(`   - Modo ${isMobile ? 'cards (móvil)' : 'tabla (desktop)'} activo`);
  }
}

// Información adicional
console.log(`\n📚 Más info: FIX-HYDRATION-TABLAS-V2.md`);

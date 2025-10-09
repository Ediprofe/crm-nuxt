// ============================================================================
// SCRIPT DE VALIDACIÓN - TABLES CARDS RESPONSIVE v5.0
// Ejecutar en DevTools Console con diferentes viewports
// ============================================================================

console.clear();
console.log('%c🔬 VALIDACIÓN - TABLES CARDS v5.0', 'font-size: 16px; font-weight: bold; color: #10b981;');

const isMobile = window.innerWidth < 768;
console.log(`\n📱 Viewport: ${window.innerWidth}px (${isMobile ? 'MÓVIL' : 'DESKTOP'})`);

const tables = document.querySelectorAll('table.responsive-table');
console.log(`📊 Tablas responsive: ${tables.length}`);

if (tables.length > 0) {
  const table = tables[0];
  
  // Verificar wrapper
  const hasWrapper = table.parentElement?.classList.contains('table-wrap');
  console.log(`\n${hasWrapper ? '✅' : '❌'} Wrapper: ${hasWrapper ? 'SÍ' : 'NO'}`);
  
  // Verificar data-labels (móvil)
  if (isMobile) {
    const cells = table.querySelectorAll('tbody td[data-label]');
    console.log(`${cells.length > 0 ? '✅' : '❌'} Data-labels: ${cells.length} celdas`);
    
    if (cells.length > 0) {
      const firstLabel = cells[0].getAttribute('data-label');
      console.log(`   Ejemplo: "${firstLabel}"`);
    }
    
    // Verificar que thead está oculto visualmente
    const thead = table.querySelector('thead');
    if (thead) {
      const theadStyles = window.getComputedStyle(thead);
      const isHidden = theadStyles.position === 'absolute' && theadStyles.height === '1px';
      console.log(`${isHidden ? '✅' : '❌'} Thead oculto en móvil: ${isHidden ? 'SÍ' : 'NO'}`);
    }
    
    // Verificar display de TR
    const firstRow = table.querySelector('tbody tr');
    if (firstRow) {
      const rowDisplay = window.getComputedStyle(firstRow).display;
      console.log(`${rowDisplay === 'block' ? '✅' : '❌'} TR como card: ${rowDisplay}`);
    }
  }
  
  // Verificar overflow del body
  const bodyWidth = document.body.scrollWidth;
  const windowWidth = window.innerWidth;
  const hasOverflow = bodyWidth > windowWidth + 5; // 5px de tolerancia
  
  console.log(`\n${hasOverflow ? '❌' : '✅'} Overflow horizontal: ${hasOverflow ? 'SÍ (MAL)' : 'NO (BIEN)'}`);
  
  if (hasOverflow) {
    console.log(`   Body: ${bodyWidth}px, Window: ${windowWidth}px, Diff: ${bodyWidth - windowWidth}px`);
  }
  
  // Verificar zoom inicial (solo móvil)
  if (isMobile) {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      const content = viewport.getAttribute('content');
      console.log(`\n📱 Viewport meta: ${content}`);
      const hasCorrectZoom = content.includes('initial-scale=1');
      console.log(`${hasCorrectZoom ? '✅' : '❌'} Zoom inicial correcto: ${hasCorrectZoom ? 'SÍ' : 'NO'}`);
    }
  }
  
  // Resultado final
  const allGood = !hasOverflow && (isMobile ? cells.length > 0 : true);
  
  if (allGood) {
    console.log('\n%c✅ ¡TODO PERFECTO! Cards responsive funcionando.', 'color: #10b981; font-weight: bold; font-size: 14px;');
    console.log('\n📋 Prueba siguiente:');
    console.log('   1. Verificar hover en cards (móvil)');
    console.log('   2. Verificar sticky headers (desktop)');
    console.log('   3. Probar Cmd/Ctrl + P (impresión)');
  } else {
    console.log('\n%c⚠️ Revisar issues arriba.', 'color: #f59e0b; font-weight: bold;');
  }
} else {
  console.log('\n⚠️ No se encontraron tablas en esta página');
  console.log('Verificando si el plugin se ejecutó...');
  
  const allTables = document.querySelectorAll('.prose table');
  console.log(`\n📊 Tablas sin procesar: ${allTables.length}`);
  
  if (allTables.length > 0) {
    console.log('\n💡 Solución: Ejecutar manualmente el plugin');
    console.log('   En Console: $nuxt.$enhanceTables()');
  }
}

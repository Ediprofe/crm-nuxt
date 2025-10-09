/**
 * Script de validación para la solución v5 de tablas móviles
 * Valida padding selectivo y breakout de tablas
 * Ejecutar en la consola del navegador con modo responsive activo
 */

console.clear();
console.log('%c🔬 VALIDACIÓN SOLUCIÓN v5 - PADDING SELECTIVO', 'font-size: 16px; font-weight: bold; color: #10b981;');
console.log('─'.repeat(50));

const isMobile = window.innerWidth < 768;
console.log(`\n📱 Viewport: ${window.innerWidth}px (${isMobile ? 'MÓVIL' : 'DESKTOP'})`);

// Verificar padding en párrafos
const paragraph = document.querySelector('.prose > p');
if (paragraph) {
  const pStyles = window.getComputedStyle(paragraph);
  console.log(`\n✅ Texto (párrafo):`);
  console.log(`   - padding-left: ${pStyles.paddingLeft}`);
  console.log(`   - padding-right: ${pStyles.paddingRight}`);
  console.log(`   - width: ${paragraph.offsetWidth}px`);
}

const tables = document.querySelectorAll('.prose > table');
console.log(`\n📊 Tablas encontradas: ${tables.length}`);

if (tables.length > 0 && isMobile) {
  const table = tables[0];
  const tStyles = window.getComputedStyle(table);
  
  console.log(`\n✅ Tabla en móvil:`);
  console.log(`   - width: ${tStyles.width}`);
  console.log(`   - padding-left: ${tStyles.paddingLeft}`); // Esperado: "0px"
  console.log(`   - padding-right: ${tStyles.paddingRight}`); // Esperado: "0px"
  console.log(`   - overflow-x: ${tStyles.overflowX}`); // Esperado: "auto"
  console.log(`   - position: ${tStyles.position}`); // Esperado: "relative"
  console.log(`   - left: ${tStyles.left}`); // Esperado: "50%"
  
  const tableInner = table.querySelector('tbody');
  if (tableInner) {
    const innerStyles = window.getComputedStyle(tableInner);
    console.log(`   - tbody padding-left: ${innerStyles.paddingLeft}`); // Esperado: "16px" (1rem)
    console.log(`   - tbody min-width: ${innerStyles.minWidth}`); // Esperado: "280px"
  }
  
  // Verificar viewport expansion
  const bodyWidth = document.body.scrollWidth;
  const windowWidth = window.innerWidth;
  const hasOverflow = bodyWidth > windowWidth;
  
  console.log(`\n${hasOverflow ? '❌' : '✅'} Overflow horizontal del body: ${hasOverflow ? 'SÍ (MAL)' : 'NO (BIEN)'}`);
  console.log(`   - Body width: ${bodyWidth}px`);
  console.log(`   - Window width: ${windowWidth}px`);
  
  if (!hasOverflow) {
    console.log('\n%c✅ ¡TODO CORRECTO! Solución v4 funcionando.', 'color: #10b981; font-weight: bold;');
  } else {
    console.log('\n%c⚠️ Aún hay overflow. Revisar estilos.', 'color: #f59e0b; font-weight: bold;');
  }
} else if (!isMobile) {
  console.log('\n⏭️ Desktop mode - sin verificación necesaria');
} else {
  console.log('\n⚠️ No se encontraron tablas en esta página');
}

/**
 * Script de validación para la solución v4 de tablas móviles
 * Ejecutar en la consola del navegador con modo responsive activo
 */

console.clear();
console.log('%c🔬 VALIDACIÓN SOLUCIÓN v4', 'font-size: 16px; font-weight: bold; color: #10b981;');
console.log('─'.repeat(50));

const isMobile = window.innerWidth < 768;
console.log(`\n📱 Viewport: ${window.innerWidth}px (${isMobile ? 'MÓVIL' : 'DESKTOP'})`);

const tables = document.querySelectorAll('.prose table');
console.log(`📊 Tablas encontradas: ${tables.length}`);

if (tables.length > 0 && isMobile) {
  const table = tables[0];
  const styles = window.getComputedStyle(table);
  
  console.log('\n✅ Estilos aplicados:');
  console.log(`   - display: ${styles.display}`); // Esperado: "block"
  console.log(`   - width: ${styles.width}`); // Esperado: viewport width
  console.log(`   - font-size: ${styles.fontSize}`); // Esperado: ~12px (0.75rem)
  console.log(`   - overflow-x: ${styles.overflowX}`); // Esperado: "auto"
  
  const tableInner = table.querySelector('tbody');
  if (tableInner) {
    const innerStyles = window.getComputedStyle(tableInner);
    console.log(`   - tabla interna min-width: ${innerStyles.minWidth}`); // Esperado: "280px"
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

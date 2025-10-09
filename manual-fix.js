// ============================================================================
// MANUAL FIX - EJECUTAR EN CONSOLE
// ============================================================================

console.clear();
console.log('%c🔧 APLICANDO FIX MANUAL...', 'font-size: 16px; font-weight: bold; color: #10b981;');

// Función para mejorar tablas
const enhanceTables = () => {
  const tables = document.querySelectorAll('.prose table');
  console.log(`📊 Procesando ${tables.length} tablas...`);
  
  tables.forEach((table, index) => {
    // Marcar como procesada
    table.setAttribute('data-responsive-enhanced', 'true');
    table.classList.add('responsive-table');
    
    // Extraer headers
    const thead = table.querySelector('thead');
    const headerCells = thead ? Array.from(thead.querySelectorAll('th')) : [];
    const headersText = headerCells.map(th => th.textContent?.trim() || '');
    
    console.log(`\nTabla ${index + 1}:`);
    console.log(`  Headers: ${headersText.length}`);
    
    // Añadir data-label a cada celda
    if (headersText.length) {
      table.querySelectorAll('tbody tr').forEach((row) => {
        const cells = row.querySelectorAll('td');
        cells.forEach((td, i) => {
          if (headersText[i]) {
            td.setAttribute('data-label', headersText[i]);
          }
        });
      });
      console.log(`  ✅ Data-labels añadidos`);
    }
    
    // Envolver en .table-wrap
    if (!table.parentElement?.classList.contains('table-wrap')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'table-wrap';
      table.parentElement?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
      console.log(`  ✅ Wrapper añadido`);
    }
  });
  
  console.log('\n%c✅ ¡FIX APLICADO! Verifica la página.', 'color: #10b981; font-weight: bold; font-size: 14px;');
};

// Ejecutar
enhanceTables();

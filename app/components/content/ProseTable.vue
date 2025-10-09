<script setup lang="ts">
import { ref, onMounted, useSlots } from 'vue'

// MDC pasa el contenido como slot default
const slots = useSlots()
const tableRef = ref<HTMLTableElement | null>(null)

onMounted(() => {
  // Después de montar, procesar la tabla
  if (tableRef.value) {
    // Extraer headers
    const thead = tableRef.value.querySelector('thead')
    const headerCells = thead ? Array.from(thead.querySelectorAll('th')) : []
    const headersText = headerCells.map(th => th.textContent?.trim() || '')
    
    // Añadir data-label a cada celda
    if (headersText.length > 0) {
      tableRef.value.querySelectorAll('tbody tr').forEach((row) => {
        const cells = row.querySelectorAll('td')
        cells.forEach((td, index) => {
          if (headersText[index]) {
            td.setAttribute('data-label', headersText[index])
          }
        })
      })
    }
  }
})
</script>

<template>
  <!-- Wrapper con clase table-wrap desde el inicio (servidor y cliente) -->
  <div class="table-wrap">
    <!-- Tabla con clase responsive desde el inicio -->
    <table ref="tableRef" class="responsive-table">
      <!-- MDC renderiza el contenido de la tabla como slot default -->
      <slot />
    </table>
  </div>
</template>

<style scoped>
/* Estilos básicos - los principales están en global.css */
.table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  margin: 2rem 0;
  
  /* Fade effect en los bordes para indicar scroll */
  mask-image: linear-gradient(
    to right, 
    transparent 0, 
    black 24px, 
    black calc(100% - 24px), 
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right, 
    transparent 0, 
    black 24px, 
    black calc(100% - 24px), 
    transparent 100%
  );
}

.responsive-table {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--bg-card);
  border-radius: 0.5rem;
  overflow: hidden;
}

/* En móvil, quitar fade effect */
@media (max-width: 767px) {
  .table-wrap {
    mask-image: none;
    -webkit-mask-image: none;
    overflow-x: visible;
  }
}
</style>

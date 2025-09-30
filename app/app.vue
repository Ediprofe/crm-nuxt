<script setup lang="ts">
// Importar estilos globales
import '~/assets/styles/global.css'

// El plugin ya inicializó el tema, solo necesitamos el composable para el estado reactivo
import { useTheme } from '~/composables/useTheme'

// Inicializar el composable (sin duplicar la lógica de inicialización)
const { isDark } = useTheme()
</script>

<template>
  <!-- Contenedor global con transiciones de tema -->
  <div class="app-container">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
/* Estilos globales del contenedor */
.app-container {
  min-height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-secondary);
  transition: background-color 0.2s ease, color 0.2s ease;
}
</style>
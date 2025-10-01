<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button
    @click="toggleTheme"
    class="theme-toggle"
    :aria-label="isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
  >
    <!-- Icono de Sol (tema claro) -->
    <svg
      v-if="isDark"
      class="theme-icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>

    <!-- Icono de Luna (tema oscuro) -->
    <svg
      v-else
      class="theme-icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid rgb(229 231 235);
  background: white;
  color: rgb(75 85 99);
  transition: all 0.2s ease;
  cursor: pointer;
}

.dark .theme-toggle {
  background: rgb(31 41 55);
  border-color: rgb(55 65 81);
  color: rgb(229 231 235);
}

.theme-toggle:hover {
  background: rgb(243 244 246);
  border-color: rgb(209 213 219);
}

.dark .theme-toggle:hover {
  background: rgb(55 65 81);
  border-color: rgb(75 85 99);
}

.theme-icon {
  width: 1.25rem;
  height: 1.25rem;
}
</style>


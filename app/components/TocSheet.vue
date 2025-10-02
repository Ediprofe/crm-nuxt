<script setup lang="ts">
import { TOC_SHEET, Z_INDEX } from '~/config/constants'
import type { TocItem } from '~/types/content'

const props = defineProps<{
  isOpen: boolean
  tocItems: TocItem[]
  activeId: string
}>()

const emit = defineEmits<{
  close: []
  navigate: [id: string]
}>()

const handleBackdropClick = () => {
  emit('close')
}

const handleItemClick = (id: string) => {
  emit('navigate', id)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div
        v-if="isOpen"
        class="fixed inset-0 md:hidden"
        :style="{ zIndex: Z_INDEX.TOC_SHEET }"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50 transition-opacity"
          @click="handleBackdropClick"
        />
        
        <!-- Sheet -->
        <div
          class="absolute bottom-0 left-0 right-0
                 rounded-t-2xl shadow-2xl
                 flex flex-col
                 transition-all"
          :style="{ 
            height: TOC_SHEET.HEIGHT, 
            maxHeight: TOC_SHEET.MAX_HEIGHT,
            backgroundColor: 'var(--bg-card)'
          }"
        >
          <!-- Handle para drag (visual) -->
          <div class="flex justify-center py-3">
            <div class="w-12 h-1.5 rounded-full transition-colors" style="background-color: var(--border-color);" />
          </div>
          
          <!-- Header -->
          <div class="flex items-center justify-between px-6 pb-4 border-b transition-colors" style="border-color: var(--border-color);">
            <h3 class="text-lg font-semibold transition-colors" style="color: var(--text-primary);">
              Tabla de contenidos
            </h3>
            <button
              @click="emit('close')"
              class="p-2 rounded-full transition-all hover-close-btn"
              style="color: var(--text-muted);"
              aria-label="Cerrar"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Lista de contenidos (scrollable) -->
          <nav class="flex-1 overflow-y-auto px-6 py-4">
            <ul class="space-y-1">
              <li
                v-for="item in tocItems"
                :key="item.id"
              >
                <button
                  @click="handleItemClick(item.id)"
                  class="w-full text-left px-4 py-3 rounded-lg transition-all"
                  :class="[item.level === 3 ? 'pl-8' : 'pl-4']"
                  :style="activeId === item.id ? {
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--accent-primary)',
                    fontWeight: '600'
                  } : {
                    color: 'var(--text-secondary)'
                  }"
                >
                  {{ item.text }}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.hover-close-btn:hover {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

button:not([aria-label="Cerrar"]):hover:not([style*="backgroundColor: var(--bg-secondary)"]) {
  background-color: var(--bg-secondary);
}

.sheet-enter-active,
.sheet-leave-active {
  transition: all 0.3s ease;
}

.sheet-enter-active .absolute.bottom-0,
.sheet-leave-active .absolute.bottom-0 {
  transition: transform 0.3s ease;
}

.sheet-enter-from .absolute.inset-0,
.sheet-leave-to .absolute.inset-0 {
  opacity: 0;
}

.sheet-enter-from .absolute.bottom-0,
.sheet-leave-to .absolute.bottom-0 {
  transform: translateY(100%);
}
</style>


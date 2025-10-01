<script setup lang="ts">
import { TOC_SHEET, Z_INDEX } from '~/config/constants'

const props = defineProps<{
  isOpen: boolean
  tocItems: Array<{
    id: string
    text: string
    level: number
  }>
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
                 bg-white dark:bg-gray-800
                 rounded-t-2xl shadow-2xl
                 flex flex-col
                 transition-colors"
          :style="{ height: TOC_SHEET.HEIGHT, maxHeight: TOC_SHEET.MAX_HEIGHT }"
        >
          <!-- Handle para drag (visual) -->
          <div class="flex justify-center py-3">
            <div class="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
          </div>
          
          <!-- Header -->
          <div class="flex items-center justify-between px-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Tabla de contenidos
            </h3>
            <button
              @click="emit('close')"
              class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Cerrar"
            >
              <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  class="w-full text-left px-4 py-3 rounded-lg transition-colors"
                  :class="[
                    item.level === 3 ? 'pl-8' : 'pl-4',
                    activeId === item.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  ]"
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


<script setup lang="ts">
import { TOC_SHEET, Z_INDEX } from '~/config/constants'
import { CONTENT_ICONS, getIconClass, type ContentIconType } from '~/config/icons'
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

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * CONFIGURACIÓN DE ÍCONOS CENTRALIZADA
 * ══════════════════════════════════════════════════════════════════════════════
 * 
 * Los íconos ahora se importan desde ~/config/icons.ts
 * Esto garantiza consistencia total entre desktop, móvil y TocSheet.
 * 
 * Beneficios:
 * - ✅ DRY: Un solo lugar para definir íconos
 * - ✅ Mantenibilidad: Cambios centralizados
 * - ✅ Consistencia: Mismos íconos en todas las vistas
 */
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
                  class="w-full text-left px-4 py-3 rounded-lg transition-all flex items-center"
                  :class="[item.level === 3 ? 'pl-8' : 'pl-4']"
                  :style="activeId === item.id ? {
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--accent-primary)',
                    fontWeight: '600'
                  } : {
                    color: 'var(--text-secondary)'
                  }"
                >
                  <!-- ═══════════════════════════════════════════════════════ -->
                  <!-- ÍCONOS DE CONTENIDO - DRY: Sistema centralizado        -->
                  <!-- ═══════════════════════════════════════════════════════ -->
                  <span v-if="item.contentTypes?.length" class="content-icons">
                    <template v-for="type in item.contentTypes" :key="type">
                      <svg 
                        v-if="CONTENT_ICONS[type as ContentIconType]"
                        :class="getIconClass(type as ContentIconType)"
                        :viewBox="CONTENT_ICONS[type as ContentIconType].viewBox"
                        :fill="CONTENT_ICONS[type as ContentIconType].fill"
                        :stroke="CONTENT_ICONS[type as ContentIconType].stroke"
                        :stroke-width="CONTENT_ICONS[type as ContentIconType].strokeWidth || undefined"
                        :stroke-linecap="CONTENT_ICONS[type as ContentIconType].strokeLinecap || undefined"
                        :stroke-linejoin="CONTENT_ICONS[type as ContentIconType].strokeLinejoin || undefined"
                      >
                        <path :d="CONTENT_ICONS[type as ContentIconType].path" />
                      </svg>
                    </template>
                  </span>
                  
                  <span>{{ item.text }}</span>
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

/* ═══════════════════════════════════════════════════════════════════════════
   ESTILOS PARA ÍCONOS DE CONTENIDO - Consistente con Desktop
   ═══════════════════════════════════════════════════════════════════════════ */
.content-icons {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-right: 0.5rem;
  vertical-align: middle;
}

.content-icon {
  width: 0.875rem;
  height: 0.875rem;
  opacity: 0.65;
  transition: opacity 0.2s ease, transform 0.2s ease;
  flex-shrink: 0;
  color: var(--accent-primary);
}

button:hover .content-icon {
  opacity: 0.9;
}

/* Ícono de playlist */
.playlist-icon {
  color: var(--accent-primary);
}

/* Ícono de video */
.video-icon {
  color: var(--accent-primary);
}

/* Ícono de drive */
.drive-icon {
  color: var(--accent-primary);
}

/* Ícono de tiktok */
.tiktok-icon {
  color: var(--accent-primary);
  width: 0.8rem;
  height: 0.8rem;
}

/* Ícono de práctica - AHORA VERDE */
.practice-icon {
  color: var(--accent-primary);
  width: 0.875rem;
  height: 0.875rem;
}
</style>

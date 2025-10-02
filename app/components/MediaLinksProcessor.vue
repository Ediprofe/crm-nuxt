<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { extractYouTubeId, extractTikTokId, extractDriveId, createMediaIcon, type MediaInfo } from '~/utils/media'
import { TIMEOUTS } from '~/config/constants'

interface MediaLink {
  url: string
  info: MediaInfo
  element: HTMLAnchorElement
  parentHeading: HTMLElement | null
  headingLevel: number
}

const props = defineProps<{
  contentElement: HTMLElement | null
}>()

const mediaLinks = ref<MediaLink[]>([])
let hasProcessed = false

function findParentHeading(element: HTMLElement): { heading: HTMLElement | null, level: number } {
  let startElement: Element = element
  const parentParagraph = element.closest('p')
  if (parentParagraph) startElement = parentParagraph

  let current = startElement.previousElementSibling

  while (current) {
    if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(current.tagName)) {
      const tagName = current.tagName
      const level = parseInt(tagName.substring(1), 10)
      return {
        heading: current as HTMLElement,
        level: isNaN(level) ? 0 : level
      }
    }
    current = current.previousElementSibling
  }

  return { heading: null, level: 0 }
}

function processLinks() {
  if (!props.contentElement) return

  const links = props.contentElement.querySelectorAll('a[href]')
  mediaLinks.value = []

  links.forEach((link) => {
    const anchor = link as HTMLAnchorElement
    const href = anchor.href

    let info: MediaInfo | null = null

    if (href.includes('youtube.com') || href.includes('youtu.be')) {
      info = extractYouTubeId(href)
    } else if (href.includes('tiktok.com') || href.includes('vt.tiktok.com')) {
      info = extractTikTokId(href)
    } else if (href.includes('drive.google.com')) {
      info = extractDriveId(href)
    }

    if (info) {
      const { heading, level } = findParentHeading(anchor)
      mediaLinks.value.push({
        url: href,
        info,
        element: anchor,
        parentHeading: heading,
        headingLevel: level
      })
    }
  })

  if (mediaLinks.value.length > 0) processMediaLinks()
}

function processMediaLinks() {
  mediaLinks.value.forEach(link => {
    // Regla 1: Playlists de YouTube
    if (link.info.isPlaylist) {
      replaceWithPlaylistCard(link)
      return
    }

    // Regla 2: Google Drive - solo ícono mejorado
    if (link.info.type === 'drive') {
      addIconToHeading(link)
      hideOriginalLink(link.element)
      return
    }

    // Regla 3: TikTok - solo ícono
    if (link.info.type === 'tiktok') {
      addIconToHeading(link)
      hideOriginalLink(link.element)
      return
    }

    // Regla 4: Videos de YouTube
    if (link.headingLevel === 1) {
      addIconToHeading(link)
      hideOriginalLink(link.element)
    } else if (link.headingLevel > 1) {
      addIconToHeading(link)
      replaceWithAccordion(link)
    }
  })
}

function addIconToHeading(link: MediaLink) {
  if (!link.parentHeading) return

  const icon = createMediaIcon(link.info.type)
  icon.setAttribute('href', link.url)
  icon.setAttribute('target', '_blank')
  icon.setAttribute('rel', 'noopener noreferrer')

  link.parentHeading.appendChild(icon)
}

function hideOriginalLink(element: HTMLAnchorElement) {
  const paragraph = element.closest('p')
  if (paragraph && paragraph.textContent?.trim() === element.textContent?.trim()) {
    paragraph.classList.add('hidden')
  }
}

function replaceWithPlaylistCard(link: MediaLink) {
  const paragraph = link.element.closest('p')
  if (!paragraph) return

  const container = document.createElement('div')
  container.className = 'my-4 w-full'

  container.innerHTML = `
    <a
      href="${link.url}"
      target="_blank"
      rel="noopener noreferrer"
      class="block group"
    >
      <div class="playlist-card">
        <!-- Contenido de la tarjeta -->
        <div class="playlist-card-content">
          <div class="flex items-center gap-3 sm:gap-4">
            <!-- Ícono YouTube minimalista -->
            <div class="relative flex-shrink-0">
              <div class="playlist-icon-wrapper">
                <svg class="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              </div>
              <!-- Badge de playlist -->
              <div class="playlist-badge">
                <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
            </div>
            
            <!-- Texto -->
            <div class="flex-1 min-w-0">
              <h3 class="playlist-title">
                Lista de reproducción
              </h3>
              <p class="playlist-subtitle">
                Colección de videos · YouTube
              </p>
            </div>
            
            <!-- Flecha con animación -->
            <svg class="playlist-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
        
        <!-- Footer informativo -->
        <div class="playlist-footer">
          <div class="flex items-center justify-between text-xs sm:text-sm">
            <div class="playlist-footer-info">
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Ver todos los videos</span>
            </div>
            <div class="playlist-footer-action">
              <span class="hidden sm:inline">Abrir</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
    
    <style>
      .playlist-card {
        border-radius: 0.75rem;
        overflow: hidden;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
        border: 1px solid;
        border-color: var(--border-color);
        background-color: var(--bg-card);
        transition: all 0.3s ease;
      }
      
      .playlist-card:hover {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
        border-color: var(--accent-primary);
        transform: translateY(-2px);
      }
      
      .playlist-card-content {
        padding: 1rem 1.25rem;
        background-color: var(--bg-card);
        transition: background-color 0.2s ease;
      }
      
      @media (min-width: 640px) {
        .playlist-card-content {
          padding: 1.25rem 1.5rem;
        }
      }
      
      .playlist-icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3rem;
        height: 3rem;
        border-radius: 0.5rem;
        background-color: var(--bg-secondary);
        color: var(--text-muted);
        transition: all 0.3s ease;
      }
      
      @media (min-width: 640px) {
        .playlist-icon-wrapper {
          width: 3.5rem;
          height: 3.5rem;
        }
      }
      
      .playlist-card:hover .playlist-icon-wrapper {
        background-color: var(--accent-primary);
        color: white;
      }
      
      .playlist-badge {
        position: absolute;
        bottom: -0.25rem;
        right: -0.25rem;
        background-color: var(--bg-card);
        border-radius: 9999px;
        padding: 0.125rem;
        color: var(--accent-primary);
        border: 2px solid var(--bg-card);
      }
      
      .playlist-title {
        font-weight: 600;
        font-size: 1rem;
        line-height: 1.25;
        color: var(--text-primary);
        transition: color 0.2s ease;
      }
      
      @media (min-width: 640px) {
        .playlist-title {
          font-size: 1.125rem;
        }
      }
      
      .playlist-subtitle {
        font-size: 0.75rem;
        margin-top: 0.125rem;
        color: var(--text-muted);
        transition: color 0.2s ease;
      }
      
      @media (min-width: 640px) {
        .playlist-subtitle {
          font-size: 0.875rem;
        }
      }
      
      .playlist-arrow {
        width: 1.25rem;
        height: 1.25rem;
        flex-shrink: 0;
        color: var(--text-muted);
        transform: translateX(0);
        transition: all 0.3s ease;
      }
      
      @media (min-width: 640px) {
        .playlist-arrow {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
      
      .playlist-card:hover .playlist-arrow {
        color: var(--accent-primary);
        transform: translateX(0.25rem);
      }
      
      .playlist-footer {
        background-color: var(--bg-secondary);
        padding: 0.625rem 1.25rem;
        border-top: 1px solid;
        border-color: var(--border-color);
        transition: all 0.2s ease;
      }
      
      @media (min-width: 640px) {
        .playlist-footer {
          padding: 0.625rem 1.5rem;
        }
      }
      
      .playlist-footer-info {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-secondary);
      }
      
      .playlist-footer-action {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: var(--text-muted);
        font-weight: 500;
        transition: all 0.3s ease;
      }
      
      .playlist-card:hover .playlist-footer-action {
        color: var(--accent-primary);
        gap: 0.5rem;
      }
    </style>
  `

  paragraph.replaceWith(container)
}

function replaceWithAccordion(link: MediaLink) {
  const paragraph = link.element.closest('p')
  if (!paragraph) return

  const accordionId = `video-${link.info.id}-${Math.random().toString(36).substr(2, 9)}`

  const container = document.createElement('div')
  container.className = 'my-6 w-full'

  container.innerHTML = `
    <div class="video-accordion">
      <button
        id="${accordionId}-btn"
        class="video-accordion-button"
        aria-label="Ver video de YouTube"
        aria-expanded="false"
      >
        <div class="video-icon-wrapper">
          <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
        </div>
        <span class="video-accordion-text">Ver video</span>
        <svg id="${accordionId}-arrow" class="video-accordion-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div id="${accordionId}" class="video-accordion-content" aria-hidden="true">
        <div class="aspect-video">
          <iframe
            src="https://www.youtube.com/embed/${link.info.id}"
            class="w-full h-full"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
    
    <style>
      .video-accordion {
        border-radius: 0.75rem;
        overflow: hidden;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
        border: 1px solid;
        border-color: var(--border-color);
        background-color: var(--bg-card);
        transition: all 0.3s ease;
      }
      
      .video-accordion:hover {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
      }
      
      .video-accordion-button {
        width: 100%;
        padding: 0.875rem 1rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        transition: all 0.3s ease;
        background-color: var(--bg-card);
        color: var(--text-primary);
        border: none;
        cursor: pointer;
      }
      
      .video-accordion-button:hover {
        background-color: var(--bg-secondary);
      }
      
      .video-icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 0.5rem;
        background-color: var(--bg-secondary);
        color: var(--text-muted);
        flex-shrink: 0;
        transition: all 0.3s ease;
      }
      
      @media (min-width: 640px) {
        .video-icon-wrapper {
          width: 3rem;
          height: 3rem;
        }
      }
      
      .video-accordion:hover .video-icon-wrapper {
        background-color: var(--accent-primary);
        color: white;
      }
      
      .video-accordion-text {
        flex: 1;
        text-align: left;
        font-weight: 600;
        font-size: 0.9375rem;
        color: var(--text-primary);
      }
      
      .video-accordion-arrow {
        width: 1.25rem;
        height: 1.25rem;
        flex-shrink: 0;
        transition: transform 0.3s ease;
        color: var(--text-muted);
      }
      
      .video-accordion-content {
        max-height: 0;
        overflow: hidden;
        transition: all 0.3s ease;
        background-color: rgb(0 0 0);
      }
    </style>
  `

  paragraph.replaceWith(container)

  // Agregar funcionalidad de acordeón con ResizeObserver
  setTimeout(() => {
    const button = document.getElementById(`${accordionId}-btn`)
    const content = document.getElementById(accordionId)
    const arrow = document.getElementById(`${accordionId}-arrow`)

    if (button && content && arrow) {
      let resizeObserver: ResizeObserver | null = null
      
      /**
       * Calcula y actualiza la altura del contenido basándose en el aspect ratio 16:9
       */
      const updateContentHeight = () => {
        if (content.style.maxHeight && content.style.maxHeight !== '0px') {
          const width = content.offsetWidth
          const height = Math.round(width * 9 / 16) // Aspect ratio 16:9
          content.style.maxHeight = `${height}px`
        }
      }
      
      /**
       * Abre el acordeón
       */
      const openAccordion = () => {
        const width = content.offsetWidth
        const height = Math.round(width * 9 / 16)
        content.style.maxHeight = `${height}px`
        arrow.style.transform = 'rotate(180deg)'
        button.setAttribute('aria-expanded', 'true')
        content.setAttribute('aria-hidden', 'false')
        
        // ✅ Iniciar observación de cambios de tamaño
        if (!resizeObserver) {
          resizeObserver = new ResizeObserver(() => {
            updateContentHeight()
          })
          resizeObserver.observe(content)
        }
      }
      
      /**
       * Cierra el acordeón
       */
      const closeAccordion = () => {
        content.style.maxHeight = '0'
        arrow.style.transform = 'rotate(0deg)'
        button.setAttribute('aria-expanded', 'false')
        content.setAttribute('aria-hidden', 'true')
        
        // ✅ Detener observación cuando está cerrado (optimización)
        if (resizeObserver) {
          resizeObserver.disconnect()
          resizeObserver = null
        }
      }
      
      // Event listener para toggle
      button.addEventListener('click', () => {
        const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px'
        
        if (isOpen) {
          closeAccordion()
        } else {
          openAccordion()
        }
      })
      
      // ✅ Cleanup cuando el elemento se elimina del DOM
      const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.removedNodes.forEach((node) => {
            if (node === container || node.contains(container)) {
              if (resizeObserver) {
                resizeObserver.disconnect()
                resizeObserver = null
              }
              mutationObserver.disconnect()
            }
          })
        })
      })
      
      if (container.parentElement) {
        mutationObserver.observe(container.parentElement, { childList: true })
      }
    }
  }, 50)
}

watch(() => props.contentElement, async (newVal) => {
  if (newVal && !hasProcessed) {
    hasProcessed = true
    await nextTick()
    setTimeout(processLinks, TIMEOUTS.MEDIA_PROCESSING)
  }
}, { immediate: true })
</script>

<template>
  <div class="media-processor" />
</template>
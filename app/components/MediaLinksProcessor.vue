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

    // Regla 2: Google Drive - solo ícono
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

  const card = document.createElement('div')
  card.className = 'inline-block bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 max-w-sm'

  const linkElement = document.createElement('a')
  linkElement.href = link.url
  linkElement.target = '_blank'
  linkElement.rel = 'noopener noreferrer'
  linkElement.className = 'flex items-center gap-4 text-white no-underline'

  linkElement.innerHTML = `
    <svg class="w-12 h-12 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
    <div class="flex-1 min-w-0">
      <div class="font-bold text-lg">Lista de reproducción</div>
      <div class="text-sm opacity-90 truncate">YouTube</div>
    </div>
    <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  `

  card.appendChild(linkElement)
  paragraph.replaceWith(card)
}

function replaceWithAccordion(link: MediaLink) {
  const paragraph = link.element.closest('p')
  if (!paragraph) return

  const accordionId = `video-${link.info.id}-${Math.random().toString(36).substr(2, 9)}`

  const container = document.createElement('div')
  // ✅ Cambio: w-full para adaptarse al contenedor, max-w-5xl para un límite razonable
  container.className = 'my-6 w-full max-w-5xl'

  container.innerHTML = `
    <div class="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <button
        id="${accordionId}-btn"
        class="w-full bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 hover:from-red-600 hover:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 text-white px-4 py-3 flex items-center gap-3 transition-all duration-300"
        aria-label="Ver video de YouTube"
        aria-expanded="false"
      >
        <svg class="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
        <span class="flex-1 text-left font-semibold">Ver video</span>
        <svg id="${accordionId}-arrow" class="w-5 h-5 flex-shrink-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div id="${accordionId}" class="max-h-0 overflow-hidden transition-all duration-300 bg-black" aria-hidden="true">
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
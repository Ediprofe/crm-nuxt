<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'

interface MediaLink {
  url: string
  type: 'youtube' | 'tiktok' | 'drive'
  videoId: string
  element: HTMLAnchorElement
  parentHeading: HTMLElement | null
  headingLevel: number
  isPlaylist?: boolean
}

const props = defineProps<{
  contentElement: HTMLElement | null
}>()

const mediaLinks = ref<MediaLink[]>([])

// Función para extraer ID de YouTube (video o playlist)
function extractYouTubeId(url: string): string | null {
  // Primero verificar si es una playlist
  const playlistMatch = url.match(/[?&]list=([^&\s]+)/)
  if (playlistMatch && playlistMatch[1]) return playlistMatch[1]
  
  // Si no es playlist, buscar ID de video
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
    /youtube\.com\/embed\/([^?&\s]+)/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) return match[1]
  }
  return null
}

// Función para extraer ID de TikTok (o la URL corta completa)
function extractTikTokId(url: string): string | null {
  // Patrón para URLs completas: tiktok.com/@user/video/123456789
  const fullMatch = url.match(/tiktok\.com\/.*\/video\/(\d+)/)
  if (fullMatch && fullMatch[1]) return fullMatch[1]
  
  // Patrón para URLs cortas: vt.tiktok.com/ZSBsYRwjE/
  const shortMatch = url.match(/vt\.tiktok\.com\/([A-Za-z0-9]+)/)
  if (shortMatch && shortMatch[1]) return shortMatch[1]
  
  return null
}

// Función para extraer ID de Google Drive
function extractDriveId(url: string): string | null {
  // Patrón para carpetas: drive.google.com/drive/folders/ID
  const folderMatch = url.match(/\/folders\/([^?&\s]+)/)
  if (folderMatch && folderMatch[1]) return folderMatch[1]
  
  // Patrón para archivos: drive.google.com/file/d/ID
  const fileMatch = url.match(/\/file\/d\/([^?&\s]+)/)
  if (fileMatch && fileMatch[1]) return fileMatch[1]
  
  return null
}

// Función para encontrar el heading padre más cercano
function findParentHeading(element: HTMLElement): { heading: HTMLElement | null, level: number } {
  // Primero, subir al párrafo padre si el elemento está dentro de uno
  let startElement: Element = element
  const parentParagraph = element.closest('p')
  if (parentParagraph) {
    startElement = parentParagraph
  }
  
  // Ahora buscar el heading anterior al párrafo (o al elemento)
  let current = startElement.previousElementSibling
  
  while (current) {
    if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(current.tagName)) {
      const levelChar = current.tagName.charAt(1)
      const level = parseInt(levelChar, 10)
      return {
        heading: current as HTMLElement,
        level
      }
    }
    current = current.previousElementSibling
  }
  
  return { heading: null, level: 0 }
}

// Función para procesar enlaces
function processLinks() {
  if (!props.contentElement) return
  
  // Buscar todos los enlaces dentro del contenido
  const links = props.contentElement.querySelectorAll('a[href]')
  
  // Limpiar array anterior
  mediaLinks.value = []
  
  links.forEach((link) => {
    const anchor = link as HTMLAnchorElement
    const href = anchor.href
    
    let type: 'youtube' | 'tiktok' | 'drive' | null = null
    let videoId: string | null = null
    
    // Detectar tipo de enlace
    let isPlaylist = false
    if (href.includes('youtube.com') || href.includes('youtu.be')) {
      type = 'youtube'
      videoId = extractYouTubeId(href)
      // Detectar si es una playlist
      isPlaylist = href.includes('playlist?list=') || href.includes('&list=')
    } else if (href.includes('tiktok.com') || href.includes('vt.tiktok.com')) {
      type = 'tiktok'
      videoId = extractTikTokId(href)
    } else if (href.includes('drive.google.com')) {
      type = 'drive'
      videoId = extractDriveId(href)
    }
    
    if (type && videoId) {
      const { heading, level } = findParentHeading(anchor)
      
      mediaLinks.value.push({
        url: href,
        type,
        videoId,
        element: anchor,
        parentHeading: heading,
        headingLevel: level,
        isPlaylist
      })
    }
  })
  
  // Aplicar transformaciones
  if (mediaLinks.value.length > 0) {
    processMediaLinks()
  }
}

// Variable para rastrear si ya procesamos
let hasProcessed = false

// Observar cambios en contentElement
watch(() => props.contentElement, async (newVal) => {
  if (newVal && !hasProcessed) {
    hasProcessed = true
    await nextTick()
    // Esperar un poco más para asegurar que el DOM esté completamente renderizado
    setTimeout(() => {
      processLinks()
    }, 100)
  }
}, { immediate: true })

function processMediaLinks() {
  mediaLinks.value.forEach(link => {
    // REGLA 1: Playlist de YouTube = Tarjeta roja SIEMPRE
    if (link.isPlaylist && link.type === 'youtube') {
      replaceWithPlaylistCard(link)
      return
    }
    
    // REGLA 2: Google Drive = Solo ícono SIEMPRE (cualquier nivel)
    if (link.type === 'drive') {
      addIconToHeading(link)
      hideOriginalLink(link.element)
      return
    }
    
    // REGLA 3: Videos normales y TikTok
    if (link.headingLevel === 1) {
      // Después de H1: solo ícono pequeño
      addIconToHeading(link)
      hideOriginalLink(link.element)
    } else if (link.headingLevel > 1) {
      // Después de H2-H6: ícono + iframe/tarjeta
      addIconToHeading(link)
      replaceWithEmbed(link)
    }
  })
}

function addIconToHeading(link: MediaLink) {
  if (!link.parentHeading) return
  
  // Crear contenedor de ícono
  const iconContainer = document.createElement('a')
  iconContainer.href = link.url
  iconContainer.target = '_blank'
  iconContainer.rel = 'noopener noreferrer'
  iconContainer.style.cssText = 'display: inline-flex; align-items: center; margin-left: 0.5rem; text-decoration: none; vertical-align: middle;'
  
  // SVG del ícono según el tipo
  if (link.type === 'youtube') {
    iconContainer.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display: block; color: #FF0000;">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    `
  } else if (link.type === 'drive') {
    iconContainer.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="display: block;">
        <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" fill="#FFA726" stroke="#EF6C00" stroke-width="1.5"/>
        <path d="M2 8h20" stroke="#EF6C00" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `
  } else {
    iconContainer.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display: block; color: #000000;">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    `
  }
  
  // Insertar ícono al final del heading
  link.parentHeading.appendChild(iconContainer)
}

function hideOriginalLink(element: HTMLAnchorElement) {
  const paragraph = element.closest('p')
  if (paragraph && paragraph.textContent?.trim() === element.textContent?.trim()) {
    paragraph.style.display = 'none'
  }
}

function replaceWithPlaylistCard(link: MediaLink) {
  const paragraph = link.element.closest('p')
  if (!paragraph || !link.parentHeading) return
  
  // Crear contenedor responsive que se inserta después del heading
  const container = document.createElement('div')
  container.className = 'playlist-container-responsive'
  
  container.innerHTML = `
    <div style="border-radius: 0.75rem; overflow: hidden; box-shadow: 0 4px 12px rgba(255, 0, 0, 0.25);">
      <a href="${link.url}" target="_blank" rel="noopener noreferrer" style="display: block; background: linear-gradient(135deg, #FF0000 0%, #CC0000 100%); padding: 1rem 1.25rem; text-decoration: none; transition: all 0.2s ease;" class="playlist-hover-link">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <!-- Ícono de Playlist compacto -->
          <div style="position: relative; width: 44px; height: 44px; flex-shrink: 0;">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" style="filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));">
              <!-- Capa 2 (fondo) -->
              <rect x="4" y="6" width="36" height="26" rx="3" fill="rgba(255, 255, 255, 0.4)"/>
              <!-- Capa 1 (frente) con play -->
              <rect x="2" y="2" width="36" height="26" rx="3" fill="white"/>
              <path d="M16 10 L16 20 L24 15 Z" fill="#FF0000"/>
            </svg>
          </div>
          
          <!-- Texto -->
          <div style="flex: 1; color: white;">
            <div style="font-size: 1.125rem; font-weight: 600;">
              Playlist
            </div>
          </div>
          
          <!-- Flecha -->
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" style="flex-shrink: 0; opacity: 0.9;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </a>
    </div>
  `
  
  // Insertar después del heading
  link.parentHeading.insertAdjacentElement('afterend', container)
  
  // Ocultar el párrafo original
  paragraph.style.display = 'none'
  
  // Agregar efecto hover
  const linkElement = container.querySelector('.playlist-hover-link') as HTMLElement
  if (linkElement) {
    linkElement.addEventListener('mouseenter', () => {
      linkElement.style.transform = 'translateY(-2px)'
      linkElement.style.boxShadow = '0 6px 16px rgba(255, 0, 0, 0.3)'
    })
    linkElement.addEventListener('mouseleave', () => {
      linkElement.style.transform = 'translateY(0)'
      linkElement.style.boxShadow = 'none'
    })
  }
}

function replaceWithEmbed(link: MediaLink) {
  const paragraph = link.element.closest('p')
  if (!paragraph) return
  
  const embedContainer = document.createElement('div')
  embedContainer.style.cssText = 'margin: 2rem 0; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);'
  
  if (link.type === 'youtube') {
    // Crear iframe con clase para estilos responsive
    const iframe = document.createElement('iframe')
    iframe.src = `https://www.youtube.com/embed/${link.videoId}`
    iframe.title = 'YouTube video player'
    iframe.setAttribute('frameborder', '0')
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture')
    iframe.setAttribute('allowfullscreen', '')
    iframe.className = 'youtube-iframe-custom'
    iframe.style.cssText = 'width: 100%; height: 500px; border: none; display: block;'
    
    embedContainer.appendChild(iframe)
  } else {
    // Para TikTok, mostrar un enlace estilizado
    embedContainer.innerHTML = `
      <div style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); border-radius: 0.75rem; padding: 1.25rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 1rem; text-decoration: none; color: white;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink: 0; color: #00f2ea;">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </svg>
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 1rem; font-weight: 600; color: white;">Ver en TikTok</div>
            <div style="font-size: 0.875rem; color: rgba(255, 255, 255, 0.6); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${link.url}</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="flex-shrink: 0; color: rgba(255, 255, 255, 0.6);">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    `
  }
  
  paragraph.replaceWith(embedContainer)
}
</script>

<template>
  <div class="media-processor">
    <!-- Este componente no renderiza nada visible, solo procesa el DOM -->
  </div>
</template>

<style scoped>
/* Iframe de YouTube con estilos responsive */
:deep(.youtube-iframe-custom) {
  width: 100% !important;
  height: 500px !important;
  border: none !important;
  display: block !important;
}

/* Responsive para pantallas pequeñas */
@media (max-width: 768px) {
  :deep(.youtube-iframe-custom) {
    height: 300px !important;
  }
}

@media (max-width: 480px) {
  :deep(.youtube-iframe-custom) {
    height: 250px !important;
  }
}

/* Estilos para tarjeta de playlist responsive - Solo posicionamiento */

/* Desktop y tablets grandes: tarjeta al lado del título */
@media (min-width: 769px) {
  :deep(.playlist-container-responsive) {
    display: inline-block;
    margin: 0 0 0 1.5rem;
    vertical-align: middle;
    max-width: 350px;
  }
}

/* Móvil y tablets: tarjeta debajo del título, centrada */
@media (max-width: 768px) {
  :deep(.playlist-container-responsive) {
    display: block;
    margin: 1rem auto;
    max-width: 400px;
  }
}

@media (max-width: 480px) {
  :deep(.playlist-container-responsive) {
    max-width: 100%;
    margin: 1rem 0;
  }
}
</style>

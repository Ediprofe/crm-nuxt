import { MEDIA_PATTERNS } from '~/config/constants'

export interface MediaInfo {
  id: string
  type: 'youtube' | 'tiktok' | 'drive'
  isPlaylist?: boolean
}

export function extractYouTubeId(url: string): MediaInfo | null {
  // Verificar si es playlist primero
  const playlistMatch = url.match(MEDIA_PATTERNS.YOUTUBE_PLAYLIST)
  if (playlistMatch?.[1]) {
    return {
      id: playlistMatch[1],
      type: 'youtube',
      isPlaylist: true
    }
  }

  // Buscar ID de video
  for (const pattern of MEDIA_PATTERNS.YOUTUBE_VIDEO) {
    const match = url.match(pattern)
    if (match?.[1]) {
      return {
        id: match[1],
        type: 'youtube',
        isPlaylist: false
      }
    }
  }

  return null
}

export function extractTikTokId(url: string): MediaInfo | null {
  // URLs completas
  const fullMatch = url.match(MEDIA_PATTERNS.TIKTOK_FULL)
  if (fullMatch?.[1]) {
    return { id: fullMatch[1], type: 'tiktok' }
  }

  // URLs cortas
  const shortMatch = url.match(MEDIA_PATTERNS.TIKTOK_SHORT)
  if (shortMatch?.[1]) {
    return { id: shortMatch[1], type: 'tiktok' }
  }

  return null
}

export function extractDriveId(url: string): MediaInfo | null {
  // Carpetas
  const folderMatch = url.match(MEDIA_PATTERNS.DRIVE_FOLDER)
  if (folderMatch?.[1]) {
    return { id: folderMatch[1], type: 'drive' }
  }

  // Archivos
  const fileMatch = url.match(MEDIA_PATTERNS.DRIVE_FILE)
  if (fileMatch?.[1]) {
    return { id: fileMatch[1], type: 'drive' }
  }

  return null
}

export function createMediaIcon(type: 'youtube' | 'tiktok' | 'drive'): HTMLElement {
  const link = document.createElement('a')
  link.className = 'inline-flex items-center ml-2 no-underline align-middle'
  
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', '20')
  svg.setAttribute('height', '20')
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('fill', 'currentColor')
  
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  
  switch (type) {
    case 'youtube':
      svg.classList.add('text-red-600', 'dark:text-red-500')
      path.setAttribute('d', 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z')
      break
    case 'tiktok':
      svg.classList.add('text-black', 'dark:text-white')
      path.setAttribute('d', 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z')
      break
    case 'drive':
      svg.setAttribute('fill', 'none')
      svg.classList.add('text-orange-500', 'dark:text-orange-400')
      path.setAttribute('d', 'M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z')
      path.setAttribute('stroke', 'currentColor')
      path.setAttribute('stroke-width', '1.5')
      break
  }
  
  svg.appendChild(path)
  link.appendChild(svg)
  
  return link
}



<script setup lang="ts">
interface Props {
  title: string
  description: string
  keywords?: string[]
  type?: 'website' | 'article' | 'educational'
  structuredData?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  type: 'website',
  keywords: () => []
})

const route = useRoute()
const fullUrl = `https://ediprofe.com${route.path}`

useHead({
  title: props.title,
  meta: [
    { name: 'description', content: props.description },
    { name: 'keywords', content: props.keywords.join(', ') },
    
    // Open Graph
    { property: 'og:title', content: props.title },
    { property: 'og:description', content: props.description },
    { property: 'og:type', content: props.type },
    { property: 'og:url', content: fullUrl },
    { property: 'og:site_name', content: 'EdiProfe' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: props.title },
    { name: 'twitter:description', content: props.description },
    
    // Adicionales
    { name: 'author', content: 'EdiProfe' },
    { name: 'robots', content: 'index, follow' }
  ],
  link: [
    { rel: 'canonical', href: fullUrl }
  ]
})

// Structured Data (JSON-LD)
if (props.structuredData) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(props.structuredData)
      }
    ]
  })
}
</script>

<template>
  <div />
</template>


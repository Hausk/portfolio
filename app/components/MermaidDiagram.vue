<template>
  <ClientOnly>
    <div ref="diagramRef" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import mermaid from 'mermaid'

const diagramRef = ref<HTMLElement>()

const diagram = `
graph TB
    U[User] --> CDN[Cloudflare CDN]
    CDN --> VH[Vercel Hosting]
    subgraph CI/CD
        GH[GitHub] --> |Push| GA[GitHub Actions]
        GA --> |Build| VH
    end
    subgraph Monitoring
        VH --> |Logs| DD[DataDog]
        VH --> |Analytics| GA4[Google Analytics 4]
    end
`

onMounted(async () => {
  if (diagramRef.value) {
    mermaid.initialize({ theme: 'neutral' })
    const { svg } = await mermaid.render('architecture', diagram)
    diagramRef.value.innerHTML = svg
  }
})
</script>

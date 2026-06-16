<script setup lang="ts">
import { ref, computed } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

interface SeoAssets {
  metaTitle: string
  metaDescription: string
  metaKeywords: string[]
  urlSlugs: string[]
}

interface Props {
  aiResult: SeoAssets
}

let isCopied = ref(false)
const props = defineProps<Props>()

const rawHtmlSnippet = computed(() => {
  if (!props.aiResult) return ''
  return `
    <title>${props.aiResult.metaTitle}</title>
    <meta name="description" content="${props.aiResult.metaDescription}">
    <link rel="canonical" href="https://example.com/${props.aiResult.urlSlugs[0]}">
    <meta name="keywords" content="${props.aiResult.metaKeywords.join(', ')}">
    
  `
})

const highlightedCode = computed(() => {
  if (!rawHtmlSnippet.value) return ''
  return hljs.highlight(rawHtmlSnippet.value, { language: 'xml' }).value
})

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(rawHtmlSnippet.value)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

defineEmits<{
  (e: 'reset'): void
}>()
</script>

<template>
  <div v-if="aiResult" class="ai-result">
    <div class="snippet-header d-flex justify-content-between align-items-center">
      <h2 class="mt-0 mb-0">AI Generated SEO Content</h2>
      <AppButton
        :text="isCopied ? 'Copied! ✓' : 'Copy Snippet'"
        variant="primary"
        @click="copyToClipboard"
      ></AppButton>
    </div>

    <pre class="code-snippet"><code class="hljs" v-html="highlightedCode"></code></pre>

    <div class="slugs-section">
      <strong>Suggested URL Slugs:</strong>
      <ul>
        <li v-for="slug in aiResult.urlSlugs" :key="slug">/{{ slug }}</li>
      </ul>
    </div>

    <AppButton
      class="back-link"
      @click="$emit('reset')"
      variant="primary"
      text="Try Again"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        style="margin-right: 8px; display: inline-block; vertical-align: text-top"
      >
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
        <polyline points="3 3 3 8 8 8"></polyline>
      </svg>
    </AppButton>
  </div>
</template>

<style lang="scss" scoped>
.ai-result {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

h2 {
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.code-container {
  background: #0d1117 !important;
  border: 1px solid #30363d;
  border-radius: 8px;
  overflow: hidden;
  font-family:
    ui-monospace,
    SFMono-Regular,
    SF Mono,
    Menlo,
    Consolas,
    monospace;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.code-header {
  background: #161b22;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #30363d;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.code-header span {
  font-size: 0.75rem;
  color: #8b949e;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

pre {
  margin: 0;
  padding: 1.25rem;
  overflow-x: auto;
  background: #0d1117 !important;
}

code.hljs {
  font-size: 0.9rem;
  line-height: 1.6;
  background: transparent !important;
  padding: 0;
  color: #c9d1d9;
}

.slugs-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;

  strong {
    font-size: 0.95rem;
    color: #0f172a;
  }
}

.slug-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.slug-badge {
  background: rgba(18, 52, 102, 0.08);
  color: #123466;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  font-family: monospace;
}

.back-link {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  color: #123466;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  margin-top: 1rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
}
</style>

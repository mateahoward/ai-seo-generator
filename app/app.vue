<script setup lang="ts">
import { ref } from 'vue'
import AppForm from './components/forms/AppForm.vue'

interface SeoAssets {
  metaTitle: string
  metaDescription: string
  metaKeywords: string[]
  urlSlugs: string[]
}

interface ApiResponse {
  success: boolean
  result: SeoAssets
}

let isLoading = ref(false)
let aiResult = ref<SeoAssets | null>(null)

let form = ref({
  site: '',
  pageTitle: '',
  targetKeywords: '',
  pageDescription: '',
  pageTone: 'formal' as 'formal' | 'informal',
})

async function generateSEO(formData: typeof form.value) {
  isLoading.value = true
  aiResult.value = null

  try {
    const { data, error } = await useFetch<ApiResponse>('/api/generate-seo', {
      method: 'POST',
      body: formData,
    })

    if (error.value) {
      alert(`Something went wrong: ${error.value.statusMessage}`)
    } else if (data.value?.success) {
      aiResult.value = data.value.result
    }
  } catch (err) {
    console.error('Failed to connect to server:', err)
  } finally {
    isLoading.value = false
  }
}

async function resetForm() {
  form.value = {
    site: '',
    pageTitle: '',
    targetKeywords: '',
    pageDescription: '',
    pageTone: 'formal',
  }
  aiResult.value = null
}
</script>
<template>
  <main>
    <header class="header">
      <h1 class="mt-0">AI SEO Meta Generator</h1>
      <p class="mt-0">Generate SEO meta tags for your website using AI.</p>
    </header>
    <div class="d-flex align-items-start justify-content-around w-100 flex-row flex-wrap">
      <AppForm
        v-if="!aiResult && !isLoading"
        :initial-form="form"
        :isLoading="isLoading"
        @submit="generateSEO($event)"
      />

      <div v-if="isLoading" class="loading-indicator">
        <p>Loading...</p>
      </div>

      <AiResults v-if="aiResult" :ai-result="aiResult" @reset="resetForm" />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  padding: 2rem;
}

.header {
  text-align: center;
  max-width: 800px;
  margin-bottom: 4rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #123466;
  }
}
</style>

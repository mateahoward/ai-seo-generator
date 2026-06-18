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
    <header class="header" v-if="!isLoading">
      <span class="header-label text-left"> AI Powered</span>
      <h1 class="mt-0 text-left">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 8V4H8"></path>
          <rect width="16" height="12" x="4" y="8" rx="2"></rect>
          <path d="M2 14h2"></path>
          <path d="M20 14h2"></path>
          <path d="M15 13v2"></path>
          <path d="M9 13v2"></path>
          <path d="M10 19v2"></path>
          <path d="M14 19v2"></path>
        </svg>
        SEO meta generator
      </h1>
      <p class="mt-0 text-left">Fill in your page details. Gemini writes the tags.</p>
    </header>
    <section
      class="d-flex align-items-start justify-content-around w-100 flex-row flex-wrap"
    >
      <AppForm
        v-if="!aiResult && !isLoading"
        :initial-form="form"
        :isLoading="isLoading"
        @submit="generateSEO($event)"
      />

      <div
        v-if="isLoading"
        class="d-flex flex-column align-items-center justify-content-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="24"
          height="24"
        >
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-dasharray="80 40"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
        <p>Loading...</p>
      </div>

      <AiResults v-if="aiResult" :ai-result="aiResult" @reset="resetForm" />
    </section>
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
  max-width: 800px;
  width: 100%;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.5rem;
      vertical-align: middle;
    }
  }
}

.header-label {
  display: inline-block;
  background: #fdf0e0;
  color: #893f06;
  font-size: 11px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 20px;
  margin-bottom: 12px;
  border: 1px solid #893f06;
}
</style>

<script lang="ts" setup>
import { ref } from 'vue'

export interface FormFields {
  site: string
  pageTitle: string
  targetKeywords: string
  pageDescription: string
  pageTone: 'formal' | 'informal'
}

interface Props {
  initialForm: FormFields
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
})

const form = ref<FormFields>({ ...props.initialForm })

defineEmits<{
  (e: 'submit', payload: FormFields): void
}>()
</script>

<template>
  <div class="d-flex align-items-start justify-content-around w-100 flex-row flex-wrap">
    <div class="steps-container">
      <h2 class="mt-0">Quick Start</h2>

      <div class="step-item">
        <div class="num-badge">1</div>
        <p>Fill out the metadata details</p>
      </div>

      <div class="step-item">
        <div class="num-badge">2</div>
        <p>Click the <strong>"Generate"</strong> button</p>
      </div>

      <div class="step-item">
        <div class="num-badge">3</div>
        <p>Copy your clean HTML meta snippets</p>
      </div>
    </div>

    <form @submit.prevent="$emit('submit', form)">
      <label for="site">Domain</label>
      <input
        id="site"
        type="text"
        v-model="form.site"
        required
        name="website"
        placeholder="https://example.com"
        autocomplete="url"
      />

      <label for="title">Page title</label>
      <input
        id="title"
        type="text"
        v-model="form.pageTitle"
        required
        name="title"
        placeholder="The draft heading or main topic of your page"
        autocomplete="off"
        autocapitalize="words"
      />

      <label for="tone">Brand voice</label>
      <select id="tone" v-model="form.pageTone" name="tone" autocomplete="off">
        <option value="formal">Professional & Authoritative</option>
        <option value="informal">Casual & Engaging</option>
      </select>

      <label for="keywords">Focus keywords</label>
      <input
        id="keywords"
        type="text"
        v-model="form.targetKeywords"
        required
        name="keywords"
        placeholder="Separate terms with commas"
        autocomplete="off"
      />

      <label for="description">Description</label>
      <textarea
        id="description"
        rows="4"
        cols="50"
        v-model="form.pageDescription"
        required
        name="description"
        placeholder="Paste an excerpt, outline, or paragraph describing the page"
        autocomplete="off"
        autocapitalize="sentences"
      ></textarea>

      <div class="d-flex justify-content-center">
        <AppButton
          text="Generate"
          variant="primary"
          type="submit"
          :disabled="props.isLoading"
        />
      </div>
    </form>
  </div>
</template>

<style lang="css" scoped>
.steps-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 320px;
}

.steps-container h2 {
  font-size: 1.5rem;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.num-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #123466;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(18, 52, 102, 0.15);
}

.step-item p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.4;
  color: #334155;
}

.step-item strong {
  color: #123466;
}

@media (max-width: 768px) {
  .steps-container {
    max-width: 100%;
    margin-bottom: 4rem;
  }
}
</style>

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
  <div class="d-flex justify-content-center w-100 flex-wrap">
    <form @submit.prevent="$emit('submit', form)">
      <div class="first-row">
        <div class="d-flex flex-column w-100 gap-1">
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
        </div>
        <div class="d-flex flex-column w-100 gap-1">
          <label for="tone">Brand voice</label>
          <select id="tone" v-model="form.pageTone" name="tone" autocomplete="off">
            <option value="formal">Professional & Authoritative</option>
            <option value="informal">Casual & Engaging</option>
          </select>
        </div>
      </div>

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

      <div class="d-flex justify-content-between align-items-center form-footer">
        <div class="d-flex align-items-center flex-wrap gap-2">
          <div class="d-flex align-items-center text-secondary gap-2">
            <span class="badge rounded-circle bg-secondary text-white">1</span>
            Fill in details
          </div>
          <div class="d-flex align-items-center text-secondary gap-2">
            <span class="badge rounded-circle bg-secondary text-white">2</span>
            Generate
          </div>
          <div class="d-flex align-items-center text-secondary gap-2">
            <span class="badge rounded-circle bg-secondary text-white">3</span>
            Copy HTML
          </div>
        </div>
        <AppButton
          class="generate-button"
          text="Generate"
          variant="primary"
          type="submit"
          :disabled="props.isLoading"
        />
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.first-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
}

.generate-button {
  &::after {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: #ffffff;
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cpath d='M197.58,129.06l-51.61-19.69L126.3,58.4a13.92,13.92,0,0,0-26.6,0L80.05,109.37,28.44,129.06a13.85,13.85,0,0,0,0,25.88l51.61,19.69L99.7,225.6a13.92,13.92,0,0,0,26.6,0l19.64-50.97,51.61-19.69a13.85,13.85,0,0,0,0-25.88Z'/%3E%3C/svg%3E");
    -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cpath d='M197.58,129.06l-51.61-19.69L126.3,58.4a13.92,13.92,0,0,0-26.6,0L80.05,109.37,28.44,129.06a13.85,13.85,0,0,0,0,25.88l51.61,19.69L99.7,225.6a13.92,13.92,0,0,0,26.6,0l19.64-50.97,51.61-19.69a13.85,13.85,0,0,0,0-25.88Z'/%3E%3C/svg%3E");
    mask-size: contain;
    -webkit-mask-size: contain;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    vertical-align: middle;
  }
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #4b5563;
  color: white;
  font-size: 11px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .form-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
}
</style>

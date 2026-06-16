<script lang="ts" setup>
export interface AppAlertProps {
  message: string
  variant: 'success' | 'danger' | 'warning' | 'info'
}

defineProps<AppAlertProps>()
</script>

<template>
  <div
    :class="['alert', variant ? `alert-${variant}` : '']"
    :aria-live="variant === 'danger' ? 'assertive' : 'polite'"
    role="alert"
  >
    <slot>{{ message }}</slot>
  </div>
</template>

<style scoped>
.alert {
  padding: 1rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}
.alert-success {
  background-color: #d4edda;
  color: #155724;
}
.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}
.alert-warning {
  background-color: #fff3cd;
  color: #856404;
}
.alert-info {
  background-color: #d1ecf1;
  color: #0c5460;
}
</style>

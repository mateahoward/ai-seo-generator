<script lang="ts" setup>
export interface AppButtonProps {
  text: string
  variant?: 'primary' | 'outline-primary' | 'success' | 'danger' | 'warning' | 'info'
  type?: 'button' | 'submit' | 'reset'
  icon?: string
}

defineProps<AppButtonProps>()
</script>

<template>
  <button :class="['btn', variant ? `btn-${variant}` : '']" :type="type">
    <slot> {{ icon ? `<i class="icon-${icon}"></i>` : '' }} {{ text }}</slot>
  </button>
</template>

<style scoped lang="scss">
.btn {
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  max-width: 180px;

  &.btn-primary {
    background-color: #063567;
    color: #fff;
    border: none;

    &:hover {
      background-color: #031e3a;
    }
  }

  &.btn-outline-primary {
    background-color: transparent;
    color: #063567;
    border: 1px solid #063567;

    &:hover {
      background-color: #063567;
      color: #fff;
    }
  }

  &.btn-success {
    background-color: #0c511c;
    color: #fff;
    border: none;

    &:hover {
      background-color: #073411;
    }
  }

  &.btn-danger {
    background-color: #dc3545;
    color: #fff;
    border: none;

    &:hover {
      background-color: #c82333;
    }
  }

  &.btn-warning {
    background-color: #ffc107;
    color: #212529;
    border: none;

    &:hover {
      background-color: #e0a800;
      color: #252424;
    }
  }

  &.btn-info {
    background-color: #17a2b8;
    color: #252424;
    border: none;

    &:hover {
      background-color: #138496;
    }
  }
}
</style>

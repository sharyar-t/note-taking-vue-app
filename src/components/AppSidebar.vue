<script setup lang="ts">
import { ref } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'All Notes',
      icon: 'i-lucide-home',
      to: '/all-notes',
    },
    {
      label: 'Archived',
      icon: 'i-lucide-archive',
      to: '/archived-notes',
    },
  ],
])
</script>

<template>
  <div class="border-r border-neutral-800 px-6 py-8">
    <div class="pb-6">
      <AppLogo />
    </div>
    <UNavigationMenu
      orientation="vertical"
      :items="items"
      class="data-[orientation=vertical]:w-48"
    />
  </div>
</template>

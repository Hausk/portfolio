<template>
  <article class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
    <img
      :src="image"
      :alt="title"
      class="w-full h-48 object-cover"
    >
    <div class="p-6">
      <h3 class="text-xl font-bold mb-2">
        {{ title }}
      </h3>
      <p class="text-gray-600 dark:text-gray-300 mb-4">
        {{ description }}
      </p>
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tag in tags"
          :key="tag"
          class="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
        >
          {{ tag }}
        </span>
      </div>
      <a
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center text-blue-600 hover:text-blue-800"
      >
        Voir le projet
        <svg
          class="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  image: string
  tags: string[]
  link: string
}>()
</script>

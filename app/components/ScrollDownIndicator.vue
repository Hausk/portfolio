<template>
  <div
    class="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
    @click="scrollToContent"
  >
    <div class="animate-bounce">
      <svg
        class="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const scrollToContent = () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  })
}
</script>

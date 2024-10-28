<template>
  <div class="max-w-2xl mx-auto">
    <h2 class="text-3xl font-bold mb-8">
      Contact
    </h2>
    <form
      class="space-y-6"
      @submit.prevent="handleSubmit"
    >
      <div>
        <label class="block text-sm font-medium mb-2">Nom</label>
        <input
          v-model="form.name"
          type="text"
          required
          class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
        >
      </div>
      <div>
        <label class="block text-sm font-medium mb-2">Email</label>
        <input
          v-model="form.email"
          type="email"
          required
          class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
        >
      </div>
      <div>
        <label class="block text-sm font-medium mb-2">Message</label>
        <textarea
          v-model="form.message"
          rows="4"
          required
          class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Envoyer
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = async () => {
  // Implémentez ici votre logique d'envoi
  console.log('Form submitted:', form.value)
}
</script>

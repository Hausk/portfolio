<template>
  <main>
    <!-- Hero Section avec Three.js -->
    <section class="h-screen relative">
      <ThreeScene />
      <div class="absolute inset-0 flex items-center justify-center text-white z-10">
        <div class="text-center">
          <h1 class="text-5xl md:text-7xl font-bold mb-4">
            John Doe
          </h1>
          <p class="text-xl md:text-2xl mb-8">
            Full Stack Developer & DevOps Engineer
          </p>
          <ScrollDownIndicator />
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section class="container mx-auto px-4 py-24">
      <h2 class="text-3xl font-bold mb-12">
        Mes Projets
      </h2>
      <ProjectsGrid />
    </section>

    <!-- DevOps Showcase -->
    <DevOpsShowcase />

    <!-- Contact Section -->
    <section class="container mx-auto px-4 py-24">
      <ContactForm />
    </section>
  </main>
</template>

<script setup lang="ts">
// Optionnel: Définir le titre de la page et les métadonnées
useHead({
  title: 'John Doe - Full Stack Developer & DevOps Engineer',
  meta: [
    { name: 'description', content: 'Portfolio de John Doe, développeur Full Stack spécialisé en DevOps' }
  ]
})
</script>

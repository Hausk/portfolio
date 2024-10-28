<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <ProjectCard
      v-for="project in projects"
      :key="project.id"
      v-bind="project"
    />
  </div>
</template>

<script setup lang="ts">
interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  link: string
}

const projects = ref<Project[]>([
  {
    id: 1,
    title: 'Projet DevOps',
    description: 'Infrastructure as Code avec Terraform',
    image: '/images/project1.jpg',
    tags: ['Terraform', 'AWS', 'CI/CD'],
    link: 'https://github.com/yourusername/project1'
  }
  // Ajoutez d'autres projets ici
])
</script>

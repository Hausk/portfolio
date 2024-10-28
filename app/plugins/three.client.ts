import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// Bun permet d'utiliser les imports dynamiques de manière plus efficace
export default defineNuxtPlugin(() => {
  return {
    provide: {
      three: THREE,
      threeAddons: {
        OrbitControls,
        GLTFLoader
      }
    }
  }
})

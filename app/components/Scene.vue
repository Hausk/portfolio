<template>
  <ClientOnly>
    <div
      ref="container"
      class="w-full h-screen"
    >
      <canvas
        ref="canvas"
        class="w-full h-full"
      />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const { $three: THREE, $threeAddons } = useNuxtApp()
const container = ref<HTMLDivElement>()
const canvas = ref<HTMLCanvasElement>()

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: InstanceType<typeof $threeAddons.OrbitControls>
let animationId: number

const init = () => {
  if (!canvas.value || !container.value) return

  // Scene
  scene = new THREE.Scene()

  // Camera
  const aspect = container.value.clientWidth / container.value.clientHeight
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
  camera.position.z = 5

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    antialias: true,
    alpha: true
  })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // Controls
  controls = new $threeAddons.OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  // Example Mesh
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshNormalMaterial()
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  // Animation
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    controls.update()
    renderer.render(scene, camera)
  }
  animate()
}

const handleResize = () => {
  if (!container.value || !camera || !renderer) return

  camera.aspect = container.value.clientWidth / container.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
}

onMounted(() => {
  init()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (animationId) cancelAnimationFrame(animationId)

  // Cleanup Three.js resources
  scene?.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose()
      if (object.material instanceof THREE.Material) {
        object.material.dispose()
      }
    }
  })
  renderer?.dispose()
})
</script>

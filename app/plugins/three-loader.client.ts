export default defineNuxtPlugin(() => {
  const loadThree = async () => {
    const THREE = await import('three')
    return THREE
  }

  return {
    provide: {
      loadThree
    }
  }
})

export const useDevOpsData = () => {
  const status = ref<PipelineStatus | null>(null)
  const metrics = ref<Metrics | null>(null)
  const deployments = ref<Deployment[]>([])
  const loading = ref(true)
  const error = ref<Error | null>(null)

  const fetchData = async () => {
    try {
      loading.value = true
      const [statusData, metricsData, deploymentsData] = await Promise.all([
        useFetch('/api/devops/status'),
        useFetch('/api/devops/metrics'),
        useFetch('/api/devops/deployments')
      ])

      status.value = statusData.data.value
      metrics.value = metricsData.data.value
      deployments.value = deploymentsData.data.value || []
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  // Rafraîchir les données toutes les 5 minutes
  const startPolling = () => {
    fetchData()
    const interval = setInterval(fetchData, 5 * 60 * 1000)

    onBeforeUnmount(() => {
      clearInterval(interval)
    })
  }

  return {
    status,
    metrics,
    deployments,
    loading,
    error,
    fetchData,
    startPolling
  }
}

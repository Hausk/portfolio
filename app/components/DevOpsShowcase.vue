<template>
  <section class="max-w-7xl mx-auto px-4 py-12">
    <div class="mb-8">
      <h2 class="text-3xl font-bold mb-4">
        Infrastructure & DevOps
      </h2>

      <div
        v-if="loading"
        class="flex justify-center py-8"
      >
        <div class="animate-spin h-8 w-8 border-t-2 border-blue-500" />
      </div>

      <template v-else>
        <!-- CI/CD Badge -->
        <div class="flex items-center gap-4 mb-6">
          <div
            :class="[
              'px-4 py-2 rounded-full flex items-center gap-2',
              status?.status === 'success' ? 'bg-green-500/10 text-green-500'
              : status?.status === 'running' ? 'bg-blue-500/10 text-blue-500'
                : 'bg-red-500/10 text-red-500'
            ]"
          >
            <div
              :class="[
                'w-2 h-2 rounded-full',
                status?.status === 'success' ? 'bg-green-500'
                : status?.status === 'running' ? 'bg-blue-500'
                  : 'bg-red-500'
              ]"
            />
            <span class="text-sm font-medium">
              Pipeline Status: {{ status?.status }}
              <span class="text-xs ml-2">
                ({{ formatDate(status?.lastUpdate) }})
              </span>
            </span>
          </div>
        </div>

        <!-- Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            v-for="metric in displayMetrics"
            :key="metric.label"
            class="p-6 rounded-xl bg-gray-50 dark:bg-gray-800"
          >
            <h3 class="text-sm text-gray-500 mb-2">
              {{ metric.label }}
            </h3>
            <p class="text-2xl font-bold">
              {{ metric.value }}
            </p>
            <span class="text-xs text-gray-400">{{ metric.subtext }}</span>
          </div>
        </div>

        <!-- Recent Deployments -->
        <div class="space-y-4">
          <h3 class="text-xl font-semibold mb-4">
            Recent Deployments
          </h3>
          <div
            v-for="deploy in deployments"
            :key="deploy.id"
            class="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">
                  {{ deploy.commit }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ formatDate(deploy.date) }} • {{ deploy.duration }}
                </p>
              </div>
              <div class="flex items-center gap-2">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-xs',
                    deploy.status === 'success'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  ]"
                >
                  {{ deploy.status }}
                </span>
                <span class="text-xs text-gray-500">
                  {{ deploy.environment }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { format, formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

const {
  status,
  metrics,
  deployments,
  loading,
  startPolling
} = useDevOpsData()

const formatDate = (date: string) => {
  try {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: fr
    })
  } catch {
    return date
  }
}

const displayMetrics = computed(() => {
  if (!metrics.value) return []

  return [
    {
      label: 'Build Time',
      value: metrics.value.buildTime,
      subtext: 'Dernier build'
    },
    {
      label: 'Uptime',
      value: metrics.value.uptime,
      subtext: 'Derniers 30 jours'
    },
    {
      label: 'Performance',
      value: `${metrics.value.performanceScore}/100`,
      subtext: 'Score Lighthouse'
    }
  ]
})

// Démarrer le polling des données
onMounted(() => {
  startPolling()
})
</script>

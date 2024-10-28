import { defineEventHandler } from 'h3'

// Type pour le status du pipeline
export interface PipelineStatus {
  status: 'success' | 'running' | 'failed'
  lastUpdate: string
  runId: string
  branch: string
}

export default defineEventHandler(async (): Promise<PipelineStatus> => {
  try {
    const response = await fetch(
      'https://api.github.com/repos/VOTRE_USERNAME/VOTRE_REPO/actions/runs',
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`
        }
      }
    )
    const data = await response.json()
    const latestRun = data.workflow_runs[0]

    return {
      status: latestRun.status,
      lastUpdate: latestRun.updated_at,
      runId: latestRun.id,
      branch: latestRun.head_branch
    }
  } catch (error) {
    console.error('Error fetching pipeline status:', error)
    return {
      status: 'failed',
      lastUpdate: new Date().toISOString(),
      runId: '0',
      branch: 'main'
    }
  }
})

import { defineEventHandler } from 'h3'

export interface Deployment {
  id: string
  commit: string
  date: string
  status: 'success' | 'failed'
  environment: string
  duration: string
}

export default defineEventHandler(async (): Promise<Deployment[]> => {
  try {
    const response = await fetch(
      'https://api.vercel.com/v6/deployments',
      {
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`
        }
      }
    )
    const data = await response.json()

    return data.deployments.map((deploy: any) => ({
      id: deploy.uid,
      commit: deploy.meta.commit,
      date: deploy.created,
      status: deploy.state === 'READY' ? 'success' : 'failed',
      environment: deploy.target,
      duration: `${Math.floor(deploy.buildingAt - deploy.created)}s`
    }))
  } catch (error) {
    console.error('Error fetching deployments:', error)
    return []
  }
})

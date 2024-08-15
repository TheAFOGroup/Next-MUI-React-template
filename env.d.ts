import { loadEnvConfig } from '@next/env'

const projectDir = process.cwd()
loadEnvConfig(projectDir)

declare global {
  interface CloudflareEnv {
    DB: D1Database
  }
}
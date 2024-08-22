import { loadEnvConfig } from '@next/env'

const projectDir = process.cwd()
loadEnvConfig(projectDir)

declare global {
  interface CloudflareEnv {
    DB: D1Database
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      DB: D1Database;
    }
  }
}

export { };
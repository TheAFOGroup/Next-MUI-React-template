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
      // The KV Namespace binding type used here comes  
      // from `@cloudflare/workers-types`, in order to            
      // use it like so, make sure that you have installed            
      // the package as a dev dependency and you have added            
      // it to your `tsconfig.json` file under            
      // `compilerOptions.types`.            DB: D1Database;  
    }
  }
}

export { };
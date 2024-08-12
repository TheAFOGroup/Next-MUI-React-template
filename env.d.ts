declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB: D1Database
    }
  }
}

declare global {
  interface CloudflareEnv {
    DB: D1Database
  }
}
import { onRequest as __api_hello_tsx_onRequest } from "/home/apple/template/functions/api/hello.tsx"
import { onRequest as __hello_tsx_onRequest } from "/home/apple/template/functions/hello.tsx"

export const routes = [
    {
      routePath: "/api/hello",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_hello_tsx_onRequest],
    },
  {
      routePath: "/hello",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__hello_tsx_onRequest],
    },
  ]
"use client"
import { signIn } from "next-auth/react"
import { Button } from "@mui/material"

export function SignIn() {
  return (
    <form
    >
      <Button type="submit" onClick={() => signIn(undefined, { callbackUrl: '/c0ntr0lPanne1/dashboard' })}>Sign in</Button>
    </form>
  )
}
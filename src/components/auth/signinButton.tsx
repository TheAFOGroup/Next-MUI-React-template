"use client"
import { Button } from "@mui/material"
import { signIn } from "next-auth/react"

export function SignIn() {
  return (
    <form
    >
      <Button type="submit" onClick={() => signIn(undefined, { callbackUrl: '/admincp/dashboard' })}>Sign in</Button>
    </form>
  )
}
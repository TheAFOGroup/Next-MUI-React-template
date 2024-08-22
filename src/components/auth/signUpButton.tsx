"use client"
import { Button } from "@mui/material"

export function SignUp() {
  return (
    <form action="/auth/signup">
      <Button type="submit">Sign up</Button>
    </form>
  )
}
import { Button } from "@mui/material"

import { signOut } from "../../app/auth"

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({ redirectTo: '/admincp' });
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  )
}
import { Button } from "@mui/material"

import { signOut } from "../../app/auth"

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({ redirectTo: '/c0ntr0lPanne1' });
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  )
}
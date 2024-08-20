import { signOut } from "../../app/api/auth/[...nextauth]/route"
import { Button } from "@mui/material"

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  )
}
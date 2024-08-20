import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"
import { auth } from "../api/auth/[...nextauth]/route"
// {session?.data?.user?.email}
const Dashboard: React.FC<AppProps> = async () => {
  const session = await auth();

  return (
    <h1>
      Dashboard +
      {JSON.stringify(session)}
    </h1>
  );
}

export default Dashboard;


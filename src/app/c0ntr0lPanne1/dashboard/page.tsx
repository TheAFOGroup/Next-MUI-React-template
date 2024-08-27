//import { useSession } from "next-auth/react";
import { auth } from '../../auth';

const Dashboard = async () => {
  const session = await auth();

  if (!session) {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <h1>
      Dashboard +
      {JSON.stringify(session)}
    </h1>
  );
}

export default Dashboard;


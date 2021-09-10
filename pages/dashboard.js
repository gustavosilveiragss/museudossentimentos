import useAuth from '../hooks/useAuth';

function Dashboard() {
  const { user } = useAuth();

  return <h1>Dash: {user?.name}</h1>;
}

export default Dashboard;
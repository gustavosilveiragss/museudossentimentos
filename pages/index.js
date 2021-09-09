import useAuth from "../hooks/useAuth"

export default function Home() {

  const { user, signinGoogle } = useAuth();

  return (
    <h1>
      <button onClick={() => signinGoogle()}>Emtrar com Google</button>
    </h1>
  )
}

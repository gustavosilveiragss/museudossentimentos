import useAuth from "../hooks/useAuth";
import React, { useState, useEffect } from 'react';

const Auth = () => {
  const {
    user,
    signinGoogle,
    signinFacebook,
    signinGithub,
    signout,
  } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");

  function handleAuth(method) {
    switch (method) {
      case "google":
        console.log("google")
        signinGoogle().then(response => {
          if (typeof response === "undefined" || response?.message === null) {
            return;
          }

          setErrorMessage(response.message);
        });

        break;
      case "facebook":
        console.log("facebook")
        signinFacebook().then(response => {
          if (typeof response === "undefined" || response?.message === null) {
            return;
          }

          setErrorMessage(response.message);
        });

        break;
      case "github":
        console.log("github")
        signinGithub().then(response => {
          if (typeof response === "undefined" || response?.message === null) {
            return;
          }

          setErrorMessage(response.message);
        });

        break;
    }
  }

  return (
    <div>
      <h5>{user?.provider}</h5>

      <button onClick={() => handleAuth("google")}>Entrar com Google</button>
      <button onClick={() => handleAuth("facebook")}>Entrar com Facebook</button>
      <button onClick={() => handleAuth("github")}>Entrar com Github</button>

      <p>{errorMessage}</p>

      <button onClick={() => signout()}>Sair</button>
    </div>
  )
}

export default Auth;

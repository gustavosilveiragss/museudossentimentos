import { createContext, useState } from "react";
import { Router } from "next/router";
import firebase from "../lib/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signinGoogle = () => {
        try {
            setLoading(true);

            console.log(firebase)

            firebase.auth()
                .signInWithPopup(new firebase.auth.GoogleAuthProvider())
                .then((response) => {
                    console.log(response.user);
                    setUser(response.user);

                    Router.push("/dashboard");
                });
        } finally {
            setLoading(false);
        }
    }

    const signout = () => {
        try {
            Router.push('/');

            firebase.auth().signOut().then(() => {
                setUser(false);
            });
        } finally {
            setLoading(false);
        }
    }

    return <AuthContext.Provider value={{
        user,
        loading,
        signinGoogle,
        signout
    }}>{children}</AuthContext.Provider>;
}

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;
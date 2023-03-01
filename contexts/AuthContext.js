import { createContext, useState, useEffect } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';

import firebase from '../lib/firebase';

const AuthContext = createContext();

const formatUser = async (user) => ({
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleUser = async (currentUser) => {
        if (currentUser) {
            const formatedUser = await formatUser(currentUser);

            setUser(formatedUser);
            setSession(formatedUser.uid);
            
            await fetch("/api/users/" + formatedUser.uid, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formatedUser)
            }).then(res => {
               
            });

            return formatedUser.email;
        }

        setUser(false);
        setSession(false);

        return false;
    }

    const setSession = (session) => {
        if (session) {
            cookie.set('auth', session, {
                expires: 1,
            });
        } else {
            cookie.remove('auth');
        }
    }

    const signinGithub = async () => {
        try {
            setLoading(true);

            var error = {
                message: null
            }

            const response = await firebase
                .auth()
                .signInWithPopup(new firebase.auth.GithubAuthProvider())
                .catch(response => {
                    if (response.code == "auth/account-exists-with-different-credential") {
                        error.message = "Já existe uma conta com este email registrada por outra plataforma\nTente realizar o login com uma plataforma diferente"
                    }
                });

            if (error.message !== null) {
                return error;
            }
            handleUser(response.user);

            Router.push('/');
        } finally {
            setLoading(false);
        }
    }

    const signinGoogle = async () => {
        try {
            setLoading(true);

            var error = {
                message: null
            }

            const response = await firebase
                .auth()
                .signInWithPopup(new firebase.auth.GoogleAuthProvider())
                .catch(response => {
                    if (response.code == "auth/account-exists-with-different-credential") {
                        error.message = "Já existe uma conta com este email registrada por outra plataforma\nTente realizar o login com uma plataforma diferente"
                    }
                });

            if (error.message !== null) {
                return error;
            }

            handleUser(response.user);

            Router.push('/');
        } finally {
            setLoading(false);
        }
    }

    const signout = async () => {
        try {
            Router.push('/');

            await firebase.auth().signOut();

            handleUser(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={{
        user,
        loading,
        signinGoogle,
        signinGithub,
        signout
    }}>{children}</AuthContext.Provider>;
}

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext; 

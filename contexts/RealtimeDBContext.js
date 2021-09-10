/*

    Well I started this thinking I'd use these calls directly on the pages
    I'll actually switc to the API, but I'll keep this crap here just in case

*/

import firebase from '../lib/firebase';
import "firebase/database";
import { createContext, useState } from 'react';

const RealtimeDBContext = createContext();

export function RealtimeDBProvider({ children }) {
    const [loading, setLoading] = useState(true);

    // Usually I'd structure this whole thing nicely, using Models and all that stuff
    // But I have to deliver this really soon
    // It hurts to see code this bad
    // But oh well...

    const writeUserData = async (
        uid,
        email,
        name,
        token,
        provider,
        photoUrl
    ) => {
        try {
            setLoading(true);

            await firebase.database().ref('users/' + uid).set({
                uid: user.uid,
                email: user.email,
                name: user.displayName,
                token: user.za,
                provider: user.providerData[0].providerId,
                photoUrl: user.photoURL,
            });
        } finally {
            setLoading(false);
        }
    }

    return <RealtimeDBContext.Provider value={{
        loading,
        writeUserData
    }}>{children}</RealtimeDBContext.Provider>;
}

export const RealtimeDBConsumer = RealtimeDBContext.Consumer;

export default RealtimeDBContext;
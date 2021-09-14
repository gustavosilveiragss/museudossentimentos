import firebase from '../../../lib/firebase';
import "firebase/database";

export default async function handler(req, res) {
    const { uid } = req.query

    const dbRef = firebase.database().ref().child("users").child(uid);

    if (req.method === "POST") {
        await dbRef.set({
            uid: req.body.uid,
            email: req.body.email,
            name: req.body.name,
            provider: req.body.provider,
            photoUrl: req.body.photoUrl,
        }, (error) => {
            if (error) {
                res.status(500).json({ error: error, success: false });
                return;
            }

            res.status(200).json({ success: true });
        });

        return;
    }

    else if (req.method === "GET") {
        dbRef.get().then((snapshot) => {
            if (snapshot.exists()) {
                res.status(200).json({ success: true, user: snapshot.val()});
            } else {
                res.status(404).json({ error: "data not found", success: false });
            }
          }).catch((error) => {
            res.status(500).json({ error: error, success: false });
          });

        return;
    }

    // invalid request
    res.status(400).json({ success: false });
}
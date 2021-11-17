import firebase from '../../../lib/firebase';
import "firebase/database";

export default async function handler(req, res) {
    if (req.method !== "DELETE") {
        res.status(400).json({ success: false });

        return;
    }

    const dbRef = firebase.database().ref().child("posts");


    dbRef.orderByChild("uid")
        .equalTo(req.body.uid)
        .once("value")
        .then(function (snapshot) {
            snapshot.forEach((childSnapshot) => {
                dbRef.child(childSnapshot.key).remove();
            });
        });
    ;

    res.status(200).json({ success: true });
}
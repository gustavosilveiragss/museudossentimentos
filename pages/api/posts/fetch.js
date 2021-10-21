import firebase from '../../../lib/firebase';
import "firebase/database";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.status(400).json({ success: false });

        return;
    }

    const dbRef = firebase.database().ref().child("posts");

    var snapshot = await dbRef.get();

    if (snapshot.exists()) {
        res.status(200).json({ success: true, posts: snapshot.val() });
    } else {
        res.status(404).json({ error: "data not found", success: false });
    }
}
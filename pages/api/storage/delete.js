import firebase from '../../../lib/firebase';
import "firebase/database";

export default async function handler(req, res) {
    if (req.method !== "DELETE") {
        res.status(400).json({ success: false });

        return;
    }

    const storageRef = firebase.storage().ref();
    
    await storageRef.child(req.body.ref).delete();

    console.log(req.body.ref);

    res.status(200).json({ success: true });
}
import firebase from '../../../lib/firebase';
import "firebase/database";
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(400);
        
        return;
    }

    const dbRef = firebase.database().ref().child("feelings");

    var error = "";

    await dbRef.push().set({
        uid: uuidv4(),
        title: req.body.title,
    }, (responseError) => {
        if (responseError) {
            error = responseError;
            return;
        }
    });

    if (error !== "") {
        res.status(500).json({ error: error });
        return;
    }

    res.status(200).json({ success: true });
}
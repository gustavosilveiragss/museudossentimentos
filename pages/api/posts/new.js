import firebase from '../../../lib/firebase';
import "firebase/database";
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(400);
        
        return;
    }

    const dbRef = firebase.database().ref().child("posts");

    var error = "";

    await dbRef.push().set({
        uid: uuidv4(),
        url: req.body.url || "",
        content: req.body.content || "",
        feelingsUids: req.body.feelingsUids,
        type: req.body.type,
        description: req.body.description,
        title: req.body.title,
        authorUid: req.body.authorUid
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
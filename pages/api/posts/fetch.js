import firebase from '../../../lib/firebase';
import "firebase/database";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.status(400).json({ success: false });

        return;
    }

    const dbRef = firebase.database().ref().child("posts");

    var snapshot = await dbRef.get();

    if (!snapshot.exists()) {
        res.status(404).json({ error: "data not found", success: false });

        return;
    }

    var posts = snapshot.val();

    posts = Object.keys(posts).map(key => posts[key]);

    for (let i = 0; i < posts.length; i++) {
        var userRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${posts[i].authorUid}`, {
            method: "GET"
        });
        var jsonRes = await userRes.json();

        posts[i].author = jsonRes.user;
    }

    res.status(200).json({ success: true, posts: posts });
}
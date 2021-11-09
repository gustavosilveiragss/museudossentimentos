import firebase from '../../../lib/firebase';
import "firebase/database";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.status(400).json({ success: false });

        return;
    }

    const { author } = req.query;

    if (author[0] !== "author") {
        res.status(400).json({ success: false, error: "use /author to filter posts by author" });

        return;
    }

    const dbRef = firebase.database().ref()
        .child("posts")
        .orderByChild("authorUid")
        .equalTo(author[1]);

    var snapshot = await dbRef.get();

    if (!snapshot.exists()) {
        res.status(404).json({ error: "data not found", success: false });

        return;
    }

    var posts = snapshot.val();

    var { user } = req.query;

    user = JSON.parse(user);

    posts = Object.keys(posts).map(key => posts[key]);

    for (let i = 0; i < posts.length; i++) {
        posts[i].author = user;
    }

    res.status(200).json({ success: true, posts: posts });
}
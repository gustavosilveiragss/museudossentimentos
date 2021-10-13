import firebase from '../../../lib/firebase';
import "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import bytes from "bytes";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(400);

        return;
    }

    const storageRef = firebase.storage().ref();

    console.log(req.body)

    var fileRef = storageRef.child(`${req.body.category}/${uuidv4()}.${req.body.extension}`);

    var error = "";

    await fileRef.put(req.body.file).catch(err => {
        error = err;
    });

    if (error !== "") {
        res.status(500).json({ error: error });
        return;
    }

    res.status(200).json({ success: true });
}

export const config = {
    api: {
      bodyParser: {
        sizeLimit: bytes("50mb"),
      },
    },
  }
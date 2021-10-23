import firebase from '../../../lib/firebase';
import 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import formidable from 'formidable'

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400);

    return;
  }

  const storageRef = firebase.storage().ref();

  const data = await new Promise((resolve, reject) => {
    const form = new formidable()

    form.parse(req, (err, fields, files) => {
      if (err) reject({ err })
      resolve({ err, fields, files })
    })
  });

  var buffer = new Buffer.from(JSON.parse(data.fields.file).data);

  var fileRef = storageRef.child(`${data.fields.folder}/${uuidv4()}.${data.fields.extension}`);

  var error = "";

  // sim, eu poderia pegar a url ali no ref, mas preferi ir pelo try catch só pq sim
  var fileUrl = "";

  try {
    var snapshot = await fileRef.put(buffer, {
      contentType: data.fields.type
    });
  
    fileUrl = await snapshot.ref.getDownloadURL();
  } catch (err) {
    error = err;
  }

  if (error !== "") {
    res.status(500).json({ error: error });
    return;
  }

  res.status(200).json({ success: true, url: fileUrl });
}

export const config = {
  api: {
    bodyParser: false
  },
}
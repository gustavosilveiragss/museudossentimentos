import firebase from '../../../lib/firebase';
import 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import formidable from 'formidable'

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400);

    return;
  }

  console.log("1")

  const storageRef = firebase.storage().ref();

  console.log("2")

  const data = await new Promise((resolve, reject) => {
    const form = new formidable()

    form.parse(req, (err, fields, files) => {
      if (err) reject({ err })
      resolve({ err, fields, files })
    })
  });

  console.log("2.5")

  var buffer = new Buffer.from(JSON.parse(data.fields.file).data);

  console.log("3")

  var fileRef = storageRef.child(`${data.fields.folder}/${uuidv4()}.${data.fields.extension}`);

  console.log("4")

  var error = "";

  // sim, eu poderia pegar a url ali no ref, mas preferi ir pelo try catch só pq sim
  var fileUrl = "";

  try {
    var snapshot = await fileRef.put(buffer, {
      contentType: data.fields.type
    });

    console.log("5")
  
    fileUrl = await snapshot.ref.getDownloadURL();
  } catch (err) {
    error = err;
  }

  console.log("6")

  if (error !== "") {
    res.status(500).json({ error: error });

    console.log("7")

    return;
  }

  console.log("8")

  res.status(200).json({ success: true, url: fileUrl });
}

export const config = {
  api: {
    bodyParser: false
  },
}
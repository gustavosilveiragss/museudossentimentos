import firebase from '../../../lib/firebase';
import 'firebase/compat/storage';
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

  console.log(buffer)

  var fileRef = storageRef.child(`${data.fields.category}/${uuidv4()}.${data.fields.extension}`);

  var error = "";

  await fileRef.put(buffer, {
    contentType: data.fields.type
  }).catch(err => {
    console.log("deu ruim" + err)
    error = err;
  });

  if (error !== "") {
    res.status(500).json({ error: error });
    return;
  }

  /*const form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    
  });*/

  res.status(200).json({ success: true });
}

export const config = {
  api: {
    bodyParser: false
  },
}
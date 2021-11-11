import firebase from '../../../lib/firebase';
import "firebase/database";
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
    /*if (req.method !== "POST") {
        res.status(400);

        return;
    }*/

    const dbRef = firebase.database().ref().child("feelings");

    var error = "";

    var feelings = {
        "feelings": [
            {
                "title": "ansiedade",
                "negative": true,
                "message": "Se sentindo ansioso(a)? Que tal ver um vídeo com algumas paisagens da itália?",
                "url": "https://www.youtube.com/watch?v=WKcnvPDgifA",
                "ref": "Dolomitas Itália - Kraig Adams"
            },
            {
                "title": "depressão",
                "negative": true,
                "message": "INSERIR MENSAGEM PRA DEPRESSÃO",
                "url": "",
                "ref": ""
            },
            {
                "title": "desespero",
                "negative": true,
                "message": "Se sentindo desesperado(a)? Que tal ver uma pintura mais relaxante?",
                "url": "https://www.metmuseum.org/art/collection/search/10497",
                "ref": "The Oxbow - Thomas Cole"
            },
            {
                "title": "estresse",
                "negative": true,
                "message": "Se sentindo estressado(a)? Que tal ouvir uma música mais relaxante?",
                "url": "https://www.youtube.com/watch?v=OkyrIRyrRdY",
                "ref": "Banana Pancakes - Jack Johnson"
            },
            {
                "title": "felicidade",
                "negative": false
            },
            {
                "title": "raiva",
                "negative": true,
                "message": "Se sentindo irritado(a)? Que tal ver um vídeo relaxante de um luthier fazendo uma guitarra?",
                "url": "https://www.youtube.com/watch?v=b_60m9HyYvk",
                "ref": "Tchiks Guitars"
            },
            {
                "title": "tristeza",
                "negative": true,
                "message": "INSERIR MENSAGEM PRA TRISTEZA",
                "url": "",
                "ref": ""
            },
            {
                "title": "medo",
                "negative": true,
                "message": "INSERIR MENSAGEM PRA MEDO",
                "url": "",
                "ref": ""
            },
            {
                "title": "frustação",
                "negative": true,
                "message": "INSERIR MENSAGEM PRA FRUSTAÇÃO",
                "url": "",
                "ref": ""
            },
            {
                "title": "alegria",
                "negative": false
            },
            {
                "title": "ciúme",
                "negative": true,
                "message": "INSERIR MENSAGEM PRA CIÚME",
                "url": "",
                "ref": ""
            },
            {
                "title": "amor",
                "negative": false
            },
            {
                "title": "empatia",
                "negative": false
            },
            {
                "title": "surpresa",
                "negative": false
            },
            {
                "title": "esperança",
                "negative": false
            },
            {
                "title": "paixão",
                "negative": false
            },
            {
                "title": "gratidão",
                "negative": false
            }
        ]
    };

    for (const feeling of feelings.feelings) {
        await dbRef.push().set({
            uid: uuidv4(),
            title: feeling.title,
            negative: feeling.negative,
            message: feeling.message || "",
            url: feeling.url || "",
            ref: feeling.ref || ""
        }, (responseError) => {
            if (responseError) {
                error = responseError;
                return;
            }
        });   
    }

    if (error !== "") {
        res.status(500).json({ error: error });
        return;
    }

    res.status(200).json({ success: true });
}
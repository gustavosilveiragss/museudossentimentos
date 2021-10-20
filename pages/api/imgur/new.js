import imgur from "imgur";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ success: false });

    return;
  }

  imgur.setAPIUrl(process.env.NEXT_PUBLIC_IMGUR_API_URL);

  const clientId = process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID;

  imgur.setClientId(clientId);

  await imgur
    .uploadBase64(req.body.selectedFile)
    .then((json) => {
      res.status(200).json({ success: true, url: json.link });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: err.message });
    });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
}
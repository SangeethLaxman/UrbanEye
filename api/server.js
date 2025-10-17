const {GoogleGenAI} = require("@google/genai")

export default async function handler(req, res) {
  const allowedOrigins = [
    'https://sangeethlaxman.github.io',
    'http://127.0.0.1:5500',
    'http://localhost:5500'
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    try {
      const { contents } = req.body;

      if (!process.env.API_KEY) {
        return res.status(500).json({ error: 'Missing GEMINI_API_KEY' });
      }

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent({ contents });
      const text = result.response.text();

      res.status(200).json({ text });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to generate content' });
      console.error(err)
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

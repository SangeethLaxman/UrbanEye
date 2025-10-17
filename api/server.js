import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  const allowedOrigins = [
    "https://sangeethlaxman.github.io",
    "http://127.0.0.1:5500",
    "http://localhost:5500"
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { prompt, image, mimeType } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Missing API_KEY" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const contents = [
      { text: prompt },
    ];

    if (image) {
      console.log("image recognizing!")
      contents.unshift({
        inlineData: {
          mimeType: mimeType || "image/png",
          data: image
        }
      });
    }


    console.log("generating...")
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents
    });

    res.status(200).json({ text: response.text() });
  } catch (err) {
    console.error("Error generating:", err);
    res.status(500).json({ error: "Failed to generate content" });
  }
}

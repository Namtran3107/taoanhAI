import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const { prompt, images, aspectRatio } = req.body;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!
    });

    const imageParts = images.map((img: any) => ({
      inlineData: {
        mimeType: img.mimeType,
        data: img.base64
      }
    }));

    const systemPrompt = `
You are a professional fashion visual designer.
Generate EXACTLY ONE image.
DO NOT create collage.
DO NOT place images side-by-side.
Merge all references into one unified product image.
Aspect ratio: ${aspectRatio}.
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          ...imageParts,
          { text: systemPrompt + "\nUser prompt: " + prompt }
        ]
      }
    });

    const parts = result.candidates?.[0]?.content?.parts || [];

    const image = parts.find(p => p.inlineData);

    if (!image) {
      return res.status(400).json({ error: "No image generated" });
    }

    res.status(200).json({
      image: `data:${image.inlineData.mimeType};base64,${image.inlineData.data}`
    });

  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

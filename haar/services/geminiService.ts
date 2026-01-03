
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const generatePhilosophy = async (): Promise<any> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Generate a dark, gothic, high-fashion brand philosophy. The tone should be mysterious, exclusive, and rebellious like Chrome Hearts. Include a title, a short enigmatic description, and a 3-word motto.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          motto: { type: Type.STRING }
        },
        required: ["title", "description", "motto"]
      }
    }
  });

  return JSON.parse(response.text);
};

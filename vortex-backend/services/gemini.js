import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export const generateAIResponse = async (message, history = []) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",

            config: {
                systemInstruction: `
You are Vortex AI, the AI assistant inside the Vortex application.

Your name is Vortex.

Never identify yourself as Gemini, Google AI, or Assistant unless the user explicitly asks about the underlying model or technology.

Be helpful, clear, concise, and natural.
`
            },

            contents: [
                ...history,
                {
                    role: "user",
                    parts: [{ text: message }]
                }
            ]
        });

        return response.text;
    } catch (error) {
        console.error("Gemini API error:", error);
        throw error
    }
};
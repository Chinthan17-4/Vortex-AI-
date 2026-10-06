import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { VORTEX_SYSTEM_PROMPT } from "../config/ai.js";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export const generateAIResponse = async (message, history = []) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",

            config: {
                systemInstruction: VORTEX_SYSTEM_PROMPT
            },

            contents: [
                ...history,
                {
                    role: "user",
                    parts: [{ text: message }]
                }
            ]
        });

        const reply = response.text;

        if (!reply || !reply.trim()) {
            throw new Error("Vortex received an empty response.");
        }

        return reply;
    } catch (error) {
        console.error("Gemini API error:", error);

        if (error.status === 503) {
            throw new Error(
                "Vortex is temporarily busy. Please try again in a moment."
            );
        }

        if (error.status === 429) {
            throw new Error(
                "Vortex has reached the current API limit. Please try again later."
            );
        }

        throw new Error(
            "Vortex couldn't generate a response right now. Please try again."
        );
    }
};
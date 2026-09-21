import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { processMessage, createMemory } from "./chatbot/Chatbot.js";
dotenv.config();
const app = express();


const PORT = process.env.PORT || 5000; // .env patterns
const chatMemories = new Map();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Vortex Backend is running 🚀");
});

app.post("/api/chat", (req, res) => {
    const { message, chatId } = req.body;

    if (!message || !chatId) {
        return res.status(400).json({
            error: "message and chatId are required"
        });
    }

    if (!chatMemories.has(chatId)) {
        chatMemories.set(chatId, createMemory());
    }

    const memory = chatMemories.get(chatId);

    const reply = processMessage(message, memory);

    res.json({
        reply: reply
    });
});

app.listen(PORT, () => {
    console.log(`Vortex server running on http://localhost:${PORT}`);
});


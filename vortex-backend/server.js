import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { processMessage, createMemory } from "./chatbot/Chatbot.js";
dotenv.config();
const app = express();


const PORT = process.env.PORT || 5000; // .env patterns
const userMemories = new Map();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Vortex Backend is running 🚀");
});

app.post("/api/chat", (req, res) => {
    const { message, chatId, userId } = req.body;

    if (!message || !chatId || !userId) {
        return res.status(400).json({
            error: "message, chatId and userId are required"
        });
    }

    if (!userMemories.has(userId)) {
        userMemories.set(userId, new Map());
    }

    const userChats = userMemories.get(userId);

    if (!userChats.has(chatId)) {
        userChats.set(chatId, createMemory());
    }

    const memory = userChats.get(chatId);
    const reply = processMessage(message, memory);

    res.json({
        reply: reply
    });
});

app.listen(PORT, () => {
    console.log(`Vortex server running on http://localhost:${PORT}`);
});


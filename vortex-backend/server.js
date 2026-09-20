import express from "express";
import cors from "cors";
import { processMessage, createMemory } from "./chatbot/Chatbot.js";

const app = express();


const PORT = 5000;
const chatMemories = new Map();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Vortex Backend is running 🚀");
});

app.post("/api/chat", (req, res) => {
    const { message, chatId } = req.body;



    if (!chatMemories.has(chatId)) {
        chatMemories.set(chatId, createMemory());
    }

    const memory = chatMemories.get(chatId);

    const reply = processMessage(message, memory);
    console.log("MEMORY:", memory);

    res.json({
        reply: reply
    });
});

app.listen(PORT, () => {
    console.log(`Vortex server running on http://localhost:${PORT}`);
});


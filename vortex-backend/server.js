import express from "express";
import { processMessage, createMemory } from "./chatbot/Chatbot.js";

const app = express();

const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Vortex Backend is running 🚀");
});

app.post("/api/chat", (req, res) => {
    const message = req.body.message;

    const memory = createMemory();

    const reply = processMessage(message, memory);

    res.json({
        reply: reply
    });
});

app.listen(PORT, () => {
    console.log(`Vortex server running on http://localhost:${PORT}`);
});
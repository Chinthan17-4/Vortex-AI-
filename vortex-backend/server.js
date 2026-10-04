import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { processMessage, createMemory } from "./chatbot/Chatbot.js";
import { generateAIResponse } from "./services/gemini.js";
import connectDB from "./config/db.js";
import Chat from "./models/Chat.js";
import Message from "./models/Message.js";

dotenv.config();
const app = express();
connectDB();

const PORT = process.env.PORT || 5000; // .env patterns
const userMemories = new Map();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Vortex Backend is running 🚀");
});

app.get("/api/chats/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const chats = await Chat.find({ userId })
            .sort({ updatedAt: -1 });

        res.json(chats);
    } catch (error) {
        console.error("Failed to fetch chats:", error.message);

        res.status(500).json({
            error: "Failed to fetch chats"
        });
    }
});

app.get("/api/chats/:chatId/messages", async (req, res) => {
    try {
        const { chatId } = req.params;

        const messages = await Message.find({ chatId })
            .sort({ createdAt: 1 });  // retrieves the data (chats history) in order of oldest to newest

        res.json(messages);
    } catch (error) {
        console.error("Failed to fetch messages:", error.message);

        res.status(500).json({
            error: "Failed to fetch messages"
        });
    }
});

app.post("/api/chat", async (req, res) => {
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

    const previousMessages = await Message.find({ chatId })
        .sort({ createdAt: 1 })
        .limit(20);

    const history = previousMessages.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [
            {
                text: msg.content
            }
        ]
    }));

    const reply = await generateAIResponse(message, history);
    await Message.create({
        messageId: `msg-${Date.now()}`,
        chatId,
        role: "user",
        content: message
    });

    const chat = await Chat.findOneAndUpdate(
        { chatId },
        {
            chatId,
            userId,
            title: message.slice(0, 40)
        },
        {
            new: true,
            upsert: true
        }
    );

    await Message.create({
        messageId: `msg-${Date.now()}-bot`,
        chatId,
        role: "assistant",
        content: reply
    });

    res.json({
        reply: reply
    });
});

app.delete("/api/chats/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const chats = await Chat.find({ userId });
        const chatIds = chats.map((chat) => chat.chatId);

        await Message.deleteMany({
            chatId: { $in: chatIds }
        });

        await Chat.deleteMany({
            userId
        });

        res.json({
            message: "Chat history cleared successfully"
        });
    } catch (error) {
        console.error("Failed to clear chat history:", error.message);

        res.status(500).json({
            error: "Failed to clear chat history"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Vortex server running on http://localhost:${PORT}`);
});


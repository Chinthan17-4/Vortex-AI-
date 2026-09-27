import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        chatId: {
            type: String,
            required: true,
            unique: true
        },

        userId: {
            type: String,
            required: true
        },

        title: {
            type: String,
            default: "New Chat"
        }
    },
    {
        timestamps: true
    }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
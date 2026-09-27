import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        messageId: {
            type: String,
            required: true,
            unique: true
        },

        chatId: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["user", "assistant"],
            required: true
        },

        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
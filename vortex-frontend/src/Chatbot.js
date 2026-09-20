// ===============================
// VORTEX CHATBOT BRAIN
// ===============================

// Conversation memory

function createMemory() {
    return {
        userName: null,
        messageCount: 0,
        lastIntent: null
    };
}

// your existing responses
const responses = {
    greeting: [
        "Hey! 👋 How can I help you?",
        "Hello! 😊 What can I do for you?",
        "Hi there! 🤖 What's up?"
    ],

    goodbye: [
        "Goodbye! 👋",
        "See you later! 😊",
        "Take care! 👋"
    ],

    identity: "I'm Vortex AI 🤖",

    howAreYou: [
        "I'm doing great! 😄 Thanks for asking.",
        "I'm doing good! 🤖 How about you?"
    ],

    help: "Sure! 😊 You can ask me about my name, say hello, or ask how I'm doing.",

    thanks: [
        "You're welcome! 😊",
        "Anytime! 😄",
        "No problem! 👍"
    ],

    goodMorning: "Good morning! ☀️ Have a great day!",

    goodNight: "Good night! 🌙 Sleep well!",

    unknown: [
        "I'm not sure I understand that yet. 🤔",
        "Hmm, I don't know how to answer that yet. 😅",
        "I'm still learning! Try asking me something else. 🤖"
    ]
};

const intents = {
    greeting: ["hello", "hi", "hey"],
    goodbye: ["bye", "goodbye"],
    identity: [
        "who are you",
        "tell me your name",
        "what's your name",
        "what is your name"
    ],
    userName: [
        "what is my name",
        "what's my name",
        "do you know my name"
    ],
    howAreYou: ["how are you"],
    explain: [
        "explain something",
        "explain"
    ],

    coding: [
        "help me code",
        "code",
        "coding",
        "programming"
    ],

    brainstorm: [
        "brainstorm ideas",
        "brainstorm"
    ],
    help: ["help"],
    thanks: ["thank"],
    goodMorning: ["good morning"],
    goodNight: ["good night"],
    time: [
        "what time is it",
        "what's the time",
        "current time",
        "tell me the time"
    ],
    calculator: [
        "calculate"
    ],

    date: [
        "what is today's date",
        "what's today's date",
        "what is the date",
        "today's date",
        "current date"
    ],
};

const intentPriority = [
    "userName",
    "calculator",
    "coding",
    "brainstorm",
    "explain",
    "help",
    "time",
    "date",
    "identity",
    "howAreYou",
    "thanks",
    "goodbye",
    "goodMorning",
    "goodNight",
    "greeting"
];

// CHATBOT LOGIC

function getRandomResponse(responseArray) {
    const randomIndex = Math.floor(Math.random() * responseArray.length); // random response selection function from the object
    // math.random will give 0.1 to 0.9 values the floor will round off to 0
    // .length will give the total number of values in the array
    return responseArray[randomIndex];
}

function escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function detectIntent(message) {
    const matchedIntents = [];

    for (const intent in intents) {
        const keywords = intents[intent];  // matching keywords


        for (const keyword of keywords) {
            const pattern = new RegExp(`\\b${escapeRegex(keyword)}\\b`, "i"); // to match only the keyword


            if (pattern.test(message)) {
                if (!matchedIntents.includes(intent)) { // two intents should not be there (same intents)
                    matchedIntents.push(intent);
                }
            }
        }
    }

    if (matchedIntents.length === 0) {
        return ["unknown"];
    }

    return matchedIntents;  // one or more intents can be there
}

function getHighestPriorityIntent(matchedIntents) {
    for (const priorityIntent of intentPriority) {
        if (matchedIntents.includes(priorityIntent)) {
            return priorityIntent;
        }
    }

    return "unknown";
}


function rememberUserName(message, memory) {
    const namePattern = /(?:my name is|i am|i'm|call me)\s+([a-zA-Z]+)/i;

    const match = message.match(namePattern);

    if (match) {
        memory.userName = match[1];
        return true;
    }

    return false;
}

function getBotResponse(message, memory) {
    const originalMessage = message;
    const normalizedMessage = message.toLowerCase();

    if (rememberUserName(originalMessage, memory)) {
        return `Nice to meet you, ${memory.userName}! 😊`;
    }

    const matchedIntents = detectIntent(normalizedMessage);

    const intent = getHighestPriorityIntent(matchedIntents);
    memory.lastIntent = intent;

    if (intent === "userName") {
        if (memory.userName) {
            return `Your name is ${memory.userName}! 😊`;
        }

        return "I don't know your name yet. Tell me by saying 'My name is ...' 😊";
    }
    if (intent === "calculator") {
        const expression = originalMessage
            .replace(/calculate/i, "")
            .trim();

        try {
            const result = Function(`"use strict"; return (${expression})`)();

            return `The answer is ${result}. 🧮`;
        } catch {
            return "I couldn't calculate that. Try something like 'calculate 25 + 10'. 🤔";
        }
    }
    if (intent === "time") {
        const currentTime = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

        return `The current time is ${currentTime}. ⏰`;
    }

    if (intent === "date") {
        const currentDate = new Date().toLocaleDateString([], {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        return `Today's date is ${currentDate}. 📅`;
    }

    if (intent === "greeting") {
        if (memory.messageCount === 1) {
            return "Hey! Welcome to Vortex! 👋 How can I help you?";
        }

        if (memory.userName) {
            return `Welcome back, ${memory.userName}! 😎`;
        }

        return getRandomResponse(responses.greeting);
    }

    if (intent === "goodbye") {
        return getRandomResponse(responses.goodbye);
    }

    if (intent === "identity") {
        return responses.identity;
    }

    if (intent === "howAreYou") {
        return getRandomResponse(responses.howAreYou);
    }

    if (intent === "help") {
        return responses.help;
    }

    if (intent === "thanks") {
        return getRandomResponse(responses.thanks);
    }

    if (intent === "goodMorning") {
        return responses.goodMorning;
    }

    if (intent === "goodNight") {
        return responses.goodNight;
    }
    if (intent === "explain") {
        return "Absolutely! 😊 Tell me what you'd like me to explain.";
    }

    if (intent === "coding") {
        return "Sure! 👨‍💻 Tell me what you want to code or debug.";
    }

    if (intent === "brainstorm") {
        return "Let's brainstorm! 💡 Tell me what you're working on, and we'll generate some ideas.";
    }

    return getRandomResponse(responses.unknown);
}

function recordMessage(memory) {
    memory.messageCount++;
}

// PUBLIC CHATBOT INTERFACE
function processMessage(message, memory) {
    recordMessage(memory);

    return getBotResponse(message, memory);
}

export { processMessage, createMemory };
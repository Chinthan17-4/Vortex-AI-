import { useState, useCallback, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './firebase';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Settings from './pages/Settings';
import Usage from './pages/Usage';
import Help from './pages/Help';

// -------------------------------------------------------
// Demo data — remove when connecting the real chatbot brain
// -------------------------------------------------------
const DEMO_CHATS = [
  {
    id: 'chat-1',
    title: 'Welcome to Vortex',
    group: 'Today',
    messages: [
      {
        id: 'msg-1',
        role: 'assistant',
        content: 'Hello! 👋 Welcome to Vortex AI. I\'m your intelligent workspace assistant. How can I help you today?',
        timestamp: new Date(Date.now() - 300000).toISOString(),
      },
      {
        id: 'msg-2',
        role: 'user',
        content: 'Can you help me write a JavaScript function to reverse a string?',
        timestamp: new Date(Date.now() - 240000).toISOString(),
      },
      {
        id: 'msg-3',
        role: 'assistant',
        content: 'Of course! Here\'s a clean JavaScript function to reverse a string:',
        timestamp: new Date(Date.now() - 200000).toISOString(),
        codeBlock: {
          language: 'javascript',
          code: `function reverseString(str) {\n  return str.split('').reverse().join('');\n}\n\n// Example usage:\nconsole.log(reverseString('hello')); // "olleh"`,
        },
      },
    ],
  },
  {
    id: 'chat-2',
    title: 'Project brainstorm ideas',
    group: 'Today',
    messages: [],
  },
  {
    id: 'chat-3',
    title: 'React component architecture',
    group: 'Yesterday',
    messages: [],
  },
  {
    id: 'chat-4',
    title: 'CSS grid layout help',
    group: 'Yesterday',
    messages: [],
  },
  {
    id: 'chat-5',
    title: 'API endpoint planning',
    group: 'Previous 7 Days',
    messages: [],
  },
  {
    id: 'chat-6',
    title: 'Database schema design',
    group: 'Previous 7 Days',
    messages: [],
  },
];

// -------------------------------------------------------
// App — Central state management hub
// -------------------------------------------------------
function App() {
  // Navigation
  const [currentPage, setCurrentPage] = useState('chat');

  // Chat state
  const [chats, setChats] = useState(DEMO_CHATS);
  const [activeChatId, setActiveChatId] = useState(null);
  const [selectedModel, setSelectedModel] = useState('vortex-fast');
  const [isTyping, setIsTyping] = useState(false);

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [suggestionValue, setSuggestionValue] = useState('');

  // User (mock)
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          email: firebaseUser.email,
          plan: 'Free Plan',
        });
      } else {
        setUser(null);
      }

      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);
  // ---- Derived state ----
  const activeChat = chats.find((c) => c.id === activeChatId);
  const activeMessages = activeChat?.messages || [];

  // ---- Handlers ----

  const handleNavigate = useCallback((page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  }, []);

  const handleNewChat = useCallback(() => {
    const newId = 'chat-' + Date.now();
    const newChat = {
      id: newId,
      title: 'New Chat',
      group: 'Today',
      messages: [],
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newId);
    setCurrentPage('chat');
  }, []);

  const handleSelectChat = useCallback((chatId) => {
    setActiveChatId(chatId);
    setCurrentPage('chat');
  }, []);

  const handleSendMessage = useCallback(async (text) => {
    const userMsg = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    let chatId = activeChatId;

    // If no active chat, create one
    if (!chatId) {
      chatId = 'chat-' + Date.now();

      const newChat = {
        id: chatId,
        title: text.slice(0, 40) + (text.length > 40 ? '…' : ''),
        group: 'Today',
        messages: [userMsg],
      };

      setChats((prev) => [newChat, ...prev]);
      setActiveChatId(chatId);
    } else {
      // Add user message to existing chat
      setChats((prev) =>
        prev.map((chat) => {
          if (chat.id !== chatId) return chat;

          const title = chat.messages.length === 0
            ? text.slice(0, 40) + (text.length > 40 ? '…' : '')
            : chat.title;

          return {
            ...chat,
            messages: [...chat.messages, userMsg],
            title,
          };
        })
      );
    }

    // Ask the existing backend for a response
    setIsTyping(true);

    setTimeout(async () => {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chatId: chatId,
          message: text
        })
      });

      const data = await response.json();
      const botResponse = data.reply;

      const botMsg = {
        id: 'msg-' + Date.now() + '-bot',
        role: 'assistant',
        content: botResponse,
        timestamp: new Date().toISOString(),
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
              ...chat,
              messages: [...chat.messages, botMsg],
            }
            : chat
        )
      );

      setIsTyping(false);
    }, 700);
  }, [activeChatId, chats]);

  const handleSuggestionClick = useCallback((prompt) => {
    setSuggestionValue(prompt);
  }, []);

  const handleClearSuggestion = useCallback(() => {
    setSuggestionValue('');
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  if (authLoading) {
    return null;
  }

  if (!user) {
    return <Login onNavigate={handleNavigate} />;
  }

  // ---- Auth pages (full-screen, no sidebar) ----
  if (currentPage === 'login') {
    return <Login onNavigate={handleNavigate} />;
  }
  if (currentPage === 'signup') {
    return <Signup onNavigate={handleNavigate} />;
  }
  if (currentPage === 'forgot-password') {
    return <ForgotPassword onNavigate={handleNavigate} />;
  }

  // ---- Main app layout ----
  const renderPage = () => {
    switch (currentPage) {
      case 'settings':
        return <Settings onNavigate={handleNavigate} onToggleSidebar={toggleSidebar} />;
      case 'usage':
        return <Usage onNavigate={handleNavigate} onToggleSidebar={toggleSidebar} />;
      case 'help':
        return <Help onNavigate={handleNavigate} onToggleSidebar={toggleSidebar} />;
      case 'chat':
      default:
        return (
          <ChatWindow
            messages={activeMessages}
            isTyping={isTyping}
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
            onSendMessage={handleSendMessage}
            onSuggestionClick={handleSuggestionClick}
            suggestionValue={suggestionValue}
            onClearSuggestion={handleClearSuggestion}
            onToggleSidebar={toggleSidebar}
            userInitial={user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          />
        );
    }
  };

  return (
    <div className="app">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onNavigate={handleNavigate}
        currentPage={currentPage}
        user={user}
        sidebarOpen={sidebarOpen}
        onCloseSidebar={closeSidebar}
      />
      {renderPage()}
    </div>
  );
}

export default App;
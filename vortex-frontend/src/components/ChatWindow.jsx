import ChatHeader from './ChatHeader';
import WelcomeScreen from './WelcomeScreen';
import MessageList from './MessageList';
import ChatComposer from './ChatComposer';

/**
 * ChatWindow — Main chat area orchestrator
 * Conditionally renders WelcomeScreen or MessageList based on messages
 */
function ChatWindow({
  messages,
  isTyping,
  selectedModel,
  onSelectModel,
  onSendMessage,
  onSuggestionClick,
  suggestionValue,
  onClearSuggestion,
  onToggleSidebar,
  userInitial,
}) {
  const modelNames = {
    'vortex-fast': 'Vortex Fast',
    'vortex-smart': 'Vortex Smart',
    'vortex-pro': 'Vortex Pro',
  };

  return (
    <main className="chat-main">
      <ChatHeader
        onToggleSidebar={onToggleSidebar}
        selectedModel={selectedModel}
        onSelectModel={onSelectModel}
      />

      {messages.length === 0 ? (
        <WelcomeScreen onSuggestionClick={onSuggestionClick} />
      ) : (
        <MessageList
          messages={messages}
          isTyping={isTyping}
          userInitial={userInitial}
        />
      )}

      <ChatComposer
        onSend={onSendMessage}
        selectedModel={modelNames[selectedModel] || 'Vortex Fast'}
        initialValue={suggestionValue}
        onClearInitial={onClearSuggestion}
      />
    </main>
  );
}

export default ChatWindow;
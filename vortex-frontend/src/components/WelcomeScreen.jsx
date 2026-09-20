import VortexLogo from './VortexLogo';
import SuggestionCard from './SuggestionCard';

const SUGGESTIONS = [
  {
    icon: '◈',
    title: 'Explain something',
    description: 'Get clear, simple explanations on any topic.',
    prompt: 'Explain how machine learning works in simple terms',
  },
  {
    icon: '</>',
    title: 'Help me code',
    description: 'Write, debug, and improve your code.',
    prompt: 'Help me write a function to sort an array in JavaScript',
  },
  {
    icon: '✦',
    title: 'Brainstorm ideas',
    description: 'Turn your ideas into creative possibilities.',
    prompt: 'Brainstorm 5 creative project ideas for a portfolio',
  },
];

/**
 * WelcomeScreen — Empty state with large logo, heading, and suggestion cards
 * Matches the visual style of reference image 2
 */
function WelcomeScreen({ onSuggestionClick }) {
  return (
    <section className="welcome-screen">
      <div className="welcome-logo">
        <VortexLogo size={88} />
      </div>

      <p className="welcome-subtitle">Welcome to Vortex AI</p>
      <h2 className="welcome-heading">How Can I Assist You?</h2>

      <div className="suggestions">
        {SUGGESTIONS.map((s) => (
          <SuggestionCard
            key={s.title}
            icon={s.icon}
            title={s.title}
            description={s.description}
            onClick={() => onSuggestionClick(s.prompt)}
          />
        ))}
      </div>
    </section>
  );
}

export default WelcomeScreen;

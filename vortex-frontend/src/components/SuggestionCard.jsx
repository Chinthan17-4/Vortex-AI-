/**
 * SuggestionCard — Clickable suggestion on the welcome screen
 * Layout matches reference: title + description at top, icon at bottom-left
 */
function SuggestionCard({ icon, title, description, onClick }) {
  return (
    <button className="suggestion-card" onClick={onClick} type="button">
      <div className="suggestion-card-text">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
      <span className="suggestion-card-icon">{icon}</span>
    </button>
  );
}

export default SuggestionCard;

import { useState, useEffect, useRef } from 'react';

/**
 * ModelSelector — Dropdown for selecting AI model
 * @param {string} selectedModel - Currently selected model id
 * @param {function} onSelect - Callback with model id
 */

const MODELS = [
  {
    id: 'vortex-fast',
    name: 'Vortex Fast',
    description: 'Quick responses, everyday tasks',
    icon: '⚡',
  },
  {
    id: 'vortex-smart',
    name: 'Vortex Smart',
    description: 'Balanced speed and intelligence',
    icon: '◈',
  },
  {
    id: 'vortex-pro',
    name: 'Vortex Pro',
    description: 'Maximum capability, complex tasks',
    icon: '✦',
  },
];

function ModelSelector({ selectedModel, onSelect }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentModel = MODELS.find((m) => m.id === selectedModel) || MODELS[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        className="model-selector-btn"
        onClick={() => setOpen(!open)}
        type="button"
        aria-label="Select model"
        aria-expanded={open}
      >
        <span className="model-dot" />
        <span>{currentModel.name}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="model-dropdown">
          <div className="model-dropdown-title">Select Model</div>
          {MODELS.map((model) => (
            <button
              key={model.id}
              className={`model-option${model.id === selectedModel ? ' selected' : ''}`}
              onClick={() => {
                onSelect(model.id);
                setOpen(false);
              }}
              type="button"
            >
              <span className="model-option-icon">{model.icon}</span>
              <div className="model-option-info">
                <span className="model-option-name">{model.name}</span>
                <span className="model-option-desc">{model.description}</span>
              </div>
              <span className="model-option-check">✓</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ModelSelector;

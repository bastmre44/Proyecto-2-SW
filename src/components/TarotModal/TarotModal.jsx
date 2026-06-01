import './TarotModal.css'

const TAROT_ICONS = {
  tarot_fool: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="7" r="3"/>
      <path d="M5 20v-2a7 7 0 0 1 14 0v2"/>
      <path d="M12 4V2M8 5L6 3M16 5l2-2"/>
    </svg>
  ),
  tarot_magician: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z"/>
    </svg>
  ),
  tarot_wheel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
      <path d="M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>
    </svg>
  ),
  tarot_star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
    </svg>
  ),
  tarot_strength: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 4v16M6 12h12M18 8v8"/>
      <path d="M3 8h6M15 8h6"/>
    </svg>
  ),
  tarot_hermit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2a5 5 0 0 1 0 10"/>
      <path d="M6 21v-1a6 6 0 0 1 6-6h0"/>
      <line x1="19" y1="9" x2="19" y2="21"/>
      <line x1="16" y1="12" x2="22" y2="12"/>
    </svg>
  ),
}

const DEFAULT_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 8v4M12 16h.01"/>
  </svg>
)

function TarotModal({ tarot, onApply, onDismiss }) {
  if (!tarot) return null

  const icon = TAROT_ICONS[tarot.id] ?? DEFAULT_ICON

  return (
    <div className="tarot-overlay">
      <div className="tarot-modal">
        <div className="tarot-modal__icon">{icon}</div>
        <h2 className="tarot-modal__name">{tarot.name}</h2>
        <p className="tarot-modal__desc">{tarot.description}</p>
        <div className="tarot-modal__actions">
          <button className="tarot-btn tarot-btn--apply" onClick={onApply}>
            Aplicar efecto
          </button>
          <button className="tarot-btn tarot-btn--skip" onClick={onDismiss}>
            Ignorar
          </button>
        </div>
      </div>
    </div>
  )
}

export default TarotModal

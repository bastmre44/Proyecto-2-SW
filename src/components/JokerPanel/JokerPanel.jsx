import './JokerPanel.css'

const MAX_JOKERS = 4

function JokerPanel({ activeJokers = [], pendingJokers = [], onPickJoker }) {
  const slots = Array.from({ length: MAX_JOKERS }, (_, i) => activeJokers[i] ?? null)

  return (
    <>
      <div className="joker-bar">
        {slots.map((joker, i) => (
          joker
            ? <div key={joker.id} className="joker-slot joker-slot--filled" title={joker.description}>
                <span className="joker-slot__name">{joker.name}</span>
              </div>
            : <div key={i} className="joker-slot joker-slot--empty" />
        ))}
      </div>

      {pendingJokers.length > 0 && (
        <div className="joker-modal-overlay">
          <div className="joker-modal">
            <h2 className="joker-modal__title">¡Elige un Joker!</h2>
            <div className="joker-modal__options">
              {pendingJokers.map(joker => (
                <button key={joker.id} className="joker-option" onClick={() => onPickJoker(joker)}>
                  <span className="joker-option__name">{joker.name}</span>
                  <span className="joker-option__desc">{joker.description}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default JokerPanel

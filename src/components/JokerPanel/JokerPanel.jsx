import './JokerPanel.css'

function JokerPanel({ activeJokers = [], pendingJokers = [], onPickJoker }) {
  return (
    <>
      <div className="joker-panel">
        <h3 className="joker-panel__title">Jokers</h3>

        {activeJokers.length === 0 ? (
          <p className="joker-panel__empty">Ninguno aún</p>
        ) : (
          <div className="joker-panel__list">
            {activeJokers.map(joker => (
              <div key={joker.id} className="joker-card">
                <span className="joker-card__name">{joker.name}</span>
                <span className="joker-card__desc">{joker.description}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {pendingJokers.length > 0 && (
        <div className="joker-modal-overlay">
          <div className="joker-modal">
            <h2 className="joker-modal__title">¡Elige un Joker!</h2>
            <div className="joker-modal__options">
              {pendingJokers.map(joker => (
                <button
                  key={joker.id}
                  className="joker-option"
                  onClick={() => onPickJoker(joker)}
                >
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

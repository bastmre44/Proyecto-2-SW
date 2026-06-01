import { useState } from 'react'
import './MainMenu.css'

const DIFFICULTIES = [
  { key: 'easy',   label: 'Fácil'  },
  { key: 'normal', label: 'Medio'  },
  { key: 'hard',   label: 'Difícil' },
]

function MainMenu({ onStart, muted, onToggleMute }) {
  const [selected, setSelected] = useState('normal')

  return (
    <div className="main-menu">
      <div className="main-menu__decoration" aria-hidden="true">
        ♠ ♥ ♦ ♣
      </div>

      <h1 className="main-menu__title">Not-Balatro</h1>

      <div className="main-menu__difficulties">
        <p className="main-menu__label">Dificultad</p>
        <div className="main-menu__diff-buttons">
          {DIFFICULTIES.map(({ key, label }) => (
            <button
              key={key}
              className={`diff-btn ${selected === key ? 'diff-btn--active' : ''}`}
              onClick={() => setSelected(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <button
        className="main-menu__play-btn"
        onClick={() => onStart(selected)}
      >
        ¡Jugar!
      </button>

      <div className="main-menu__decoration" aria-hidden="true">
        ♣ ♦ ♥ ♠
      </div>

      <button className="mute-btn" onClick={onToggleMute} title={muted ? 'Activar música' : 'Silenciar'}>
        {muted
          ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        }
      </button>
    </div>
  )
}

export default MainMenu

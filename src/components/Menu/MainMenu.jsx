import { useState } from 'react'
import './MainMenu.css'

const DIFFICULTIES = [
  { key: 'easy',   label: 'Fácil'  },
  { key: 'normal', label: 'Medio'  },
  { key: 'hard',   label: 'Difícil' },
]

function MainMenu({ onStart }) {
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
    </div>
  )
}

export default MainMenu

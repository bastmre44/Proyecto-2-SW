import './LivesDisplay.css'

function LivesDisplay({ lives = 3, maxLives = 3 }) {
  return (
    <div className="lives">
      {Array.from({ length: maxLives }, (_, i) => (
        <span
          key={i}
          className={i < lives ? 'lives__heart lives__heart--full' : 'lives__heart lives__heart--empty'}
        >
          {i < lives ? '❤️' : '🤍'}
        </span>
      ))}
    </div>
  )
}

export default LivesDisplay

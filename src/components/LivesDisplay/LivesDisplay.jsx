import './LivesDisplay.css'

const HeartFull = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
             2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
             C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
             c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
)

const HeartEmpty = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
             2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
             C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
             c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
)

function LivesDisplay({ lives = 3, maxLives = 3 }) {
  return (
    <div className="lives">
      {Array.from({ length: maxLives }, (_, i) => (
        <span key={i} className={`lives__heart ${i < lives ? 'lives__heart--full' : 'lives__heart--empty'}`}>
          {i < lives ? <HeartFull /> : <HeartEmpty />}
        </span>
      ))}
    </div>
  )
}

export default LivesDisplay

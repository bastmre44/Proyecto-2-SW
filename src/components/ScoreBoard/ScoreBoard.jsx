import './ScoreBoard.css'

function ScoreBoard({ score = 0, targetScore = 500 }) {
  const progress = Math.min((score / targetScore) * 100, 100)

  return (
    <div className="scoreboard">
      <div className="scoreboard__scores">
        <span className="scoreboard__current">{score}</span>
        <span className="scoreboard__separator"> / </span>
        <span className="scoreboard__target">{targetScore}</span>
      </div>
      <div className="scoreboard__bar-track">
        <div className="scoreboard__bar-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}

export default ScoreBoard

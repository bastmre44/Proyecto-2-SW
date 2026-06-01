import './GameOverScreen.css'

function GameOverScreen({ score, round, onRestart }) {
  return (
    <div className="gameover">
      <div className="gameover__suits" aria-hidden="true">
        <span>♠</span><span>♥</span><span>♦</span><span>♣</span>
      </div>

      <div className="gameover__content">
        <h1 className="gameover__title">Game Over</h1>

        <div className="gameover__stats">
          <div className="gameover__stat">
            <span className="gameover__stat-label">Ronda alcanzada</span>
            <span className="gameover__stat-value">{round}</span>
          </div>
          <div className="gameover__divider" />
          <div className="gameover__stat">
            <span className="gameover__stat-label">Puntaje final</span>
            <span className="gameover__stat-value gameover__stat-value--score">{score}</span>
          </div>
        </div>

        <button className="gameover__btn" onClick={onRestart}>
          Jugar de nuevo
        </button>
      </div>

      <div className="gameover__suits gameover__suits--bottom" aria-hidden="true">
        <span>♣</span><span>♦</span><span>♥</span><span>♠</span>
      </div>
    </div>
  )
}

export default GameOverScreen

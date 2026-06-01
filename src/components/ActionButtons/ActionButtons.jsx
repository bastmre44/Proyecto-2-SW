import './ActionButtons.css'

function ActionButtons({ selectedCount = 0, discardsLeft = 3, onPlayHand, onDiscard, onSkip, onRestart }) {
  const canPlay    = selectedCount > 0
  const canDiscard = selectedCount > 0 && discardsLeft > 0

  return (
    <div className="action-buttons">
      <button
        className="action-btn action-btn--play"
        onClick={onPlayHand}
        disabled={!canPlay}
      >
        Play Hand
      </button>

      <button
        className="action-btn action-btn--discard"
        onClick={onDiscard}
        disabled={!canDiscard}
      >
        Discard [{discardsLeft}]
      </button>

      <button
        className="action-btn action-btn--skip"
        onClick={onSkip}
      >
        Skip
      </button>

      <button
        className="action-btn action-btn--restart"
        onClick={onRestart}
      >
        Restart
      </button>
    </div>
  )
}

export default ActionButtons

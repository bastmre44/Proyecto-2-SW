import { useEffect, useRef } from 'react'
import { useGameState } from './hooks/game/useGameState'
import { useJokers }    from './hooks/game/useJokers'
import { useTarot }     from './hooks/ui/useTarot'
import { useMusic }     from './hooks/ui/useMusic'

import MainMenu       from './components/Menu/MainMenu'
import GameOverScreen from './components/GameOver/GameOverScreen'
import Hand           from './components/Hand/Hand'
import ScoreBoard     from './components/ScoreBoard/ScoreBoard'
import LivesDisplay   from './components/LivesDisplay/LivesDisplay'
import ActionButtons  from './components/ActionButtons/ActionButtons'
import JokerPanel     from './components/JokerPanel/JokerPanel'
import TarotModal     from './components/TarotModal/TarotModal'

function App() {
  const game   = useGameState()
  const jokers = useJokers()
  const tarot  = useTarot()
  const { muted, toggleMute } = useMusic(game.screen, game.difficulty)

  const prevRound = useRef(game.round)
  useEffect(() => {
    if (game.screen === 'playing' && game.round > prevRound.current) {
      jokers.offerJokers()
    }
    prevRound.current = game.round
  }, [game.round, game.screen])

  if (game.screen === 'menu') {
    return <MainMenu onStart={game.startGame} muted={muted} onToggleMute={toggleMute} />
  }

  if (game.screen === 'gameover') {
    return (
      <GameOverScreen
        score={game.score}
        round={game.round}
        onRestart={() => { game.resetGame(); jokers.resetJokers(); tarot.resetTarot() }}
      />
    )
  }

  return (
    <div className="game">

      <header className="game-header">
        <div className="game-header__round">
          <span className="game-header__eyebrow">Ronda</span>
          <span className="game-header__round-num">{game.round}</span>
        </div>
        <ScoreBoard score={game.score} targetScore={game.targetScore} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <LivesDisplay lives={game.lives} maxLives={3} />
          <button className="mute-btn" onClick={toggleMute} title={muted ? 'Activar música' : 'Silenciar'}>
            {muted
              ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
              : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            }
          </button>
        </div>
      </header>

      <div style={{ marginTop: '16px' }}>
        <JokerPanel
          activeJokers={jokers.active}
          pendingJokers={jokers.pending}
          onPickJoker={(joker) => { jokers.chooseJoker(joker.id); tarot.rollTarot() }}
        />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        {game.handName && (
          <div className="game-hand-name">{game.handName}</div>
        )}
        <Hand
          cards={game.hand}
          selected={game.selected}
          onSelect={(card) => game.toggleSelect(card.id)}
        />
      </div>

      <div style={{ paddingBottom: '180px' }}>
        <ActionButtons
          selectedCount={game.selected.length}
          discardsLeft={game.discardsLeft}
          onPlayHand={() => game.playHand(jokers.active)}
          onDiscard={game.discard}
          onSkip={game.skip}
          onRestart={() => { game.resetGame(); jokers.resetJokers(); tarot.resetTarot() }}
        />
      </div>

      <TarotModal
        tarot={tarot.active}
        onApply={() => { game.applyTarot(tarot.active.id); tarot.dismissTarot() }}
        onDismiss={tarot.dismissTarot}
      />
    </div>
  )
}

export default App

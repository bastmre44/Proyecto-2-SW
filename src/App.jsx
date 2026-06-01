import { useGameState } from './hooks/useGameState'
import { useJokers }    from './hooks/useJokers'
import { useTarot }     from './hooks/useTarot'

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

  if (game.screen === 'menu') {
    return <MainMenu onStart={game.startGame} />
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

      {/* Header: ronda | scorebar | vidas */}
      <header className="game-header">
        <div className="game-header__round">
          <span className="game-header__eyebrow">Ronda</span>
          <span className="game-header__round-num">{game.round}</span>
        </div>
        <ScoreBoard score={game.score} targetScore={game.targetScore} />
        <LivesDisplay lives={game.lives} maxLives={3} />
      </header>

      {/* Jokers */}
      <div style={{ marginTop: '16px' }}>
        <JokerPanel
          activeJokers={jokers.active}
          pendingJokers={jokers.pending}
          onPickJoker={(joker) => jokers.chooseJoker(joker.id)}
        />
      </div>

      {/* Cartas — ocupan el espacio libre y quedan centradas */}
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

      {/* Botones pegados abajo */}
      <div style={{ paddingBottom: '180px' }}>
        <ActionButtons
          selectedCount={game.selected.length}
          onPlayHand={() => game.playHand(jokers.active)}
          onDiscard={game.discard}
          onSkip={game.skip}
          onRestart={() => { game.resetGame(); jokers.resetJokers(); tarot.resetTarot() }}
        />
      </div>

      <TarotModal
        tarot={tarot.active}
        onApply={() => tarot.applyTarot()}
        onDismiss={tarot.dismissTarot}
      />
    </div>
  )
}

export default App

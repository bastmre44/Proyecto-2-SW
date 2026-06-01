import { useGameState } from './hooks/useGameState'
import { useJokers }    from './hooks/useJokers'
import { useTarot }     from './hooks/useTarot'

import MainMenu       from './components/Menu/MainMenu'
import GameOverScreen from './components/GameOver/GameOverScreen'
import Hand           from './components/Hand/Hand'
import ScoreBoard     from './components/ScoreBoard/ScoreBoard'
import LivesDisplay    from './components/LivesDisplay/LivesDisplay'
import ActionButtons   from './components/ActionButtons/ActionButtons'
import JokerPanel      from './components/JokerPanel/JokerPanel'
import TarotModal      from './components/TarotModal/TarotModal'
// import GameBoard from './components/Game/GameBoard'

function App() {
  const game   = useGameState()
  const jokers = useJokers()
  const tarot  = useTarot()

  if (game.screen === 'menu') {
    return (
      <MainMenu
        onStart={game.startGame}
      />
    )
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

  // parte front: descomentar GameBoard ADRIANA
  return (
    // <GameBoard
    //   hand          = {game.hand}
    //   score         = {game.score}
    //   targetScore   = {game.targetScore}
    //   round         = {game.round}
    //   lives         = {game.lives}
    //   deckLeft      = {game.deck.length}
    //   difficulty    = {game.difficulty}
    //   selected      = {game.selected}
    //   onSelect      = {game.toggleSelect}
    //   onPlayHand    = {game.playHand}
    //   onDiscard     = {game.discard}
    //   onSkip        = {game.skip}
    //   onRestart     = {game.resetGame}
    //   activeJokers  = {jokers.active}
    //   pendingJokers = {jokers.pending}
    //   onOfferJokers = {jokers.offerJokers}
    //   onChooseJoker = {jokers.chooseJoker}
    //   activeTarot   = {tarot.active}
    //   onApplyTarot  = {tarot.applyTarot}
    //   onDismissTarot= {tarot.dismissTarot}
    // />

<div style={{ padding: '2rem', color: 'white' }}>
  <ScoreBoard
    round={game.round}
    score={game.score}
    targetScore={game.targetScore}
  />
  <LivesDisplay lives={game.lives} maxLives={3} />
  <p>Cartas en mazo: {game.deck.length}</p>

  <Hand
    cards={game.hand}
    selected={game.selected}
    onSelect={(card) => game.toggleSelect(card.id)}
  />

  <ActionButtons
    selectedCount={game.selected.length}
    onPlayHand={() => game.playHand(jokers.active)}
    onDiscard={game.discard}
    onSkip={game.skip}
    onRestart={() => { game.resetGame(); jokers.resetJokers(); tarot.resetTarot() }}
  />
  <JokerPanel
    activeJokers={jokers.active}
    pendingJokers={jokers.pending}
    onPickJoker={(joker) => jokers.chooseJoker(joker.id)}
  />

  <TarotModal
    tarot={tarot.active}
    onApply={() => tarot.applyTarot()}
    onDismiss={tarot.dismissTarot}
  />
</div>
  )
}

export default App
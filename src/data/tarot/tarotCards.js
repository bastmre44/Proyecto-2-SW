//configuracion logica de cartas del tarot

export const TAROT_CARDS = [
  {
    id: 'tarot_fool',
    name: 'El Loco',
    description: 'Mano nueva gratis',
    apply: (gameState) => ({
      ...gameState,
      hand: gameState.freshHand(),
      selected: [],
    }),
  },
  {
    id: 'tarot_magician',
    name: 'El Mago',
    description: 'x2 valor de cartas seleccionadas',
    apply: (gameState) => ({
      ...gameState,
      hand: gameState.hand.map(card =>
        gameState.selected.includes(card.id)
          ? { ...card, numericValue: card.numericValue * 2 }
          : card
      ),
    }),
  },
  {
    id: 'tarot_wheel',
    name: 'La Rueda de la Fortuna',
    description: '-100 al objetivo',
    apply: (gameState) => ({
      ...gameState,
      targetScore: gameState.targetScore - 100,
    }),
  },
  {
    id: 'tarot_star',
    name: 'La Estrella',
    description: 'Seleccionadas → ♦ diamantes',
    apply: (gameState) => ({
      ...gameState,
      hand: gameState.hand.map(card =>
        gameState.selected.includes(card.id)
          ? { ...card, suit: 'diamonds' }
          : card
      ),
    }),
  },
  {
    id: 'tarot_strength',
    name: 'La Fuerza',
    description: '+1 valor a todas las cartas',
    apply: (gameState) => ({
      ...gameState,
      hand: gameState.hand.map(card => ({
        ...card,
        numericValue: card.numericValue + 1,
      })),
    }),
  },
  {
    id: 'tarot_hermit',
    name: 'El Ermitaño',
    description: 'Recupera una vida perdida',
    apply: (gameState) => ({
      ...gameState,
      lives: Math.min(gameState.lives + 1, gameState.maxLives),
    }),
  },
]

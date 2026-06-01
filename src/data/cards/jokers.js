export const JOKERS = [
  {
    id: 'joker_multiplier',
    name: 'Multiplicador Loco',
    description: 'Multiplica el puntaje total x2',
    apply: (score) => score * 2,
  },
  {
    id: 'joker_flat_bonus',
    name: 'Bonus Fijo',
    description: 'Suma 50 puntos al puntaje total',
    apply: (score) => score + 50,
  },
  {
    id: 'joker_hearts',
    name: 'Rey de Corazones',
    description: 'x1.5 si hay corazones en la mano',
    apply: (score, hand) => hand.some(c => c.suit === 'hearts') ? score * 1.5 : score,
  },
  {
    id: 'joker_face_cards',
    name: 'La Corte',
    description: '+15 por cada figura (J, Q, K)',
    apply: (score, hand) => {
      const faces = hand.filter(c => ['J', 'Q', 'K'].includes(c.value))
      return score + faces.length * 15
    },
  },
  {
    id: 'joker_high_card',
    name: 'As Supremo',
    description: 'x3 si tienes un As en la mano',
    apply: (score, hand) => hand.some(c => c.value === 'A') ? score * 3 : score,
  },
  {
    id: 'joker_pairs_bonus',
    name: 'Coleccionista',
    description: '+30 por cada par en la mano',
    apply: (score, hand) => {
      const counts = {}
      hand.forEach(c => { counts[c.value] = (counts[c.value] || 0) + 1 })
      const pairs = Object.values(counts).filter(n => n >= 2).length
      return score + pairs * 30
    },
  },
]

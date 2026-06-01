import { createDeck } from '../../data/cards/deck.js'

export const shuffleDeck = (deck) => {
  const shuffled = [...deck]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const dealHand = (deck, n = 8) => {
  const hand = deck.slice(0, n)
  const remainingDeck = deck.slice(n)
  return { hand, remainingDeck }
}

export const replaceCards = (hand, selectedIds, deck) => {
  const kept = hand.filter(card => !selectedIds.includes(card.id))
  const newCards = deck.slice(0, selectedIds.length)
  const remaining = deck.slice(selectedIds.length)
  return { newHand: [...kept, ...newCards], remainingDeck: remaining }
}

export const createShuffledDeck = () => shuffleDeck(createDeck())

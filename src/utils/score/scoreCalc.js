import { evaluateHand } from './handEvaluator.js'

export const calculateScore = (selectedCards, activeJokers = []) => {
  const handResult = evaluateHand(selectedCards)
  if (!handResult) return { total: 0, handName: null, baseScore: 0, multiplier: 1 }

  const { handName, baseScore, multiplier } = handResult
  const cardSum = selectedCards.reduce((sum, card) => sum + card.numericValue, 0)
  let total = (baseScore + cardSum) * multiplier

  for (const joker of activeJokers) {
    if (typeof joker.apply === 'function') {
      total = joker.apply(total, selectedCards)
    }
  }

  return { total: Math.floor(total), handName, baseScore, multiplier }
}

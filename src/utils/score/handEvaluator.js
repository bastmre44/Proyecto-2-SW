const RANK_VALUE = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
  '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14,
}

export const HAND_SCORES = {
  royalFlush:   { handName: 'Escalera Real', baseScore: 100, multiplier: 8 },
  fourOfAKind:  { handName: 'Póker',         baseScore: 60,  multiplier: 7 },
  fullHouse:    { handName: 'Full House',     baseScore: 40,  multiplier: 4 },
  flush:        { handName: 'Flush',          baseScore: 35,  multiplier: 4 },
  straight:     { handName: 'Escalera',       baseScore: 30,  multiplier: 4 },
  threeOfAKind: { handName: 'Trío',           baseScore: 30,  multiplier: 3 },
  twoPair:      { handName: 'Doble Par',      baseScore: 20,  multiplier: 2 },
  pair:         { handName: 'Par',            baseScore: 10,  multiplier: 2 },
  highCard:     { handName: 'Carta Alta',     baseScore: 5,   multiplier: 1 },
}

function getValueCounts(cards) {
  const counts = {}
  for (const card of cards) {
    counts[card.value] = (counts[card.value] || 0) + 1
  }
  return counts
}

function getCountPattern(cards) {
  return Object.values(getValueCounts(cards)).sort((a, b) => b - a)
}

function isFlush(cards) {
  return cards.length === 5 && cards.every((c) => c.suit === cards[0].suit)
}

function getStraightInfo(cards) {
  if (cards.length !== 5) return { isStraight: false, highRank: 0 }
  const ranks = [...new Set(cards.map((c) => RANK_VALUE[c.value]))].sort((a, b) => a - b)
  if (ranks.length !== 5) return { isStraight: false, highRank: 0 }
  const isConsecutive = ranks.every((r, i) => i === 0 || r === ranks[i - 1] + 1)
  if (isConsecutive) return { isStraight: true, highRank: ranks[4] }
  if (ranks.join(',') === '2,3,4,5,14') return { isStraight: true, highRank: 5 }
  return { isStraight: false, highRank: 0 }
}

export function evaluateHand(cards) {
  if (!Array.isArray(cards) || cards.length === 0) return null

  const pattern = getCountPattern(cards)
  const flush = isFlush(cards)
  const { isStraight, highRank } = getStraightInfo(cards)

  if (flush && isStraight && highRank === 14) return { ...HAND_SCORES.royalFlush }
  if (pattern[0] === 4)                        return { ...HAND_SCORES.fourOfAKind }
  if (pattern[0] === 3 && pattern[1] === 2)    return { ...HAND_SCORES.fullHouse }
  if (flush)                                   return { ...HAND_SCORES.flush }
  if (isStraight)                              return { ...HAND_SCORES.straight }
  if (pattern[0] === 3)                        return { ...HAND_SCORES.threeOfAKind }
  if (pattern[0] === 2 && pattern[1] === 2)    return { ...HAND_SCORES.twoPair }
  if (pattern[0] === 2)                        return { ...HAND_SCORES.pair }
  return { ...HAND_SCORES.highCard }
}

export default evaluateHand

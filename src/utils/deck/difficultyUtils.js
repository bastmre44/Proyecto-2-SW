const DIFFICULTY_SETTINGS = {
  easy:   { baseTarget: 100, increment: 50  },
  normal: { baseTarget: 200, increment: 100 },
  hard:   { baseTarget: 350, increment: 175 },
}

export const getTargetScore = (round, difficulty = 'normal') => {
  const { baseTarget, increment } = DIFFICULTY_SETTINGS[difficulty]
  return baseTarget + (round - 1) * increment
}

export const getDifficultySettings = (difficulty = 'normal') => DIFFICULTY_SETTINGS[difficulty]

export const DIFFICULTIES = ['easy', 'normal', 'hard']

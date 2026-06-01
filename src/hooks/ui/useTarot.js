import { useState, useCallback } from 'react'
import { TAROT_CARDS } from '../../data/tarot/tarotCards.js'

const TAROT_CHANCE = 0.3

export function useTarot() {
  const [active, setActive] = useState(null)

  const rollTarot = useCallback(() => {
    if (Math.random() > TAROT_CHANCE) return
    setActive(TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)])
  }, [])

  const dismissTarot = useCallback(() => setActive(null), [])
  const resetTarot   = useCallback(() => setActive(null), [])

  return { active, rollTarot, dismissTarot, resetTarot }
}

export default useTarot

import { useState, useCallback } from 'react'
import { JOKERS } from '../../data/cards/jokers.js'

const getRandomJokers = (exclude = []) => {
  const pool = JOKERS.filter((j) => !exclude.includes(j.id))
  return [...pool].sort(() => Math.random() - 0.5).slice(0, 2)
}

export function useJokers() {
  const [active, setActive]   = useState([])
  const [pending, setPending] = useState([])

  const offerJokers = useCallback(() => {
    const currentIds = active.map((j) => j.id)
    setPending(getRandomJokers(currentIds))
  }, [active])

  const chooseJoker = useCallback((jokerId) => {
    const chosen = pending.find((j) => j.id === jokerId)
    if (!chosen) return
    setActive((prev) => [...prev, chosen])
    setPending([])
  }, [pending])

  const resetJokers = useCallback(() => {
    setActive([])
    setPending([])
  }, [])

  return { active, pending, offerJokers, chooseJoker, resetJokers }
}

export default useJokers

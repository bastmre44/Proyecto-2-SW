//logica de estado del juego, inicializa partidas, controla rondas, vidas y puntajes, y procesa acciones

import { useReducer, useCallback } from 'react'
import { createShuffledDeck, dealHand, replaceCards } from '../../utils/deck/deckUtils.js'
import { calculateScore } from '../../utils/score/scoreCalc.js'
import { getTargetScore } from '../../utils/deck/difficultyUtils.js'

const HAND_SIZE    = 8
const MAX_LIVES    = 3
const MAX_DISCARDS = 3

const initialState = {
  screen:       'menu',
  round:        1,
  lives:        MAX_LIVES,
  score:        0,
  targetScore:  0,
  hand:         [],
  selected:     [],
  deck:         [],
  activeJokers: [],
  difficulty:   'normal',
  handName:     null,
  discardsLeft: MAX_DISCARDS,
}

function gameReducer(state, action) {
  switch (action.type) {

    case 'START_GAME': {
      const difficulty = action.difficulty ?? 'normal'
      const fullDeck = createShuffledDeck()
      const { hand, remainingDeck: deck } = dealHand(fullDeck, HAND_SIZE)
      return {
        ...initialState,
        screen: 'playing',
        difficulty,
        hand,
        deck,
        targetScore:  getTargetScore(1, difficulty),
        discardsLeft: MAX_DISCARDS,
      }
    }

    case 'RESET_GAME':
      return { ...initialState }

    case 'TOGGLE_SELECT': {
      const id = action.id
      const selected = state.selected.includes(id)
        ? state.selected.filter((x) => x !== id)
        : [...state.selected, id]
      return { ...state, selected }
    }

    case 'PLAY_HAND': {
      if (state.selected.length === 0) return state
      const playedCards = state.hand.filter((c) => state.selected.includes(c.id))
      const gained = calculateScore(playedCards, action.activeJokers || [])
      const newScore = state.score + gained.total
      const { newHand: hand, remainingDeck: deck } = replaceCards(state.hand, state.selected, state.deck)

      // Gana la ronda
      if (newScore >= state.targetScore) {
        const nextRound = state.round + 1
        return {
          ...state,
          round:        nextRound,
          score:        0,
          targetScore:  getTargetScore(nextRound, state.difficulty),
          hand,
          deck,
          selected:     [],
          handName:     gained.handName,
          discardsLeft: MAX_DISCARDS,
        }
      }

      // Mazo agotado y mano vacía → game over
      if (hand.length === 0) {
        return {
          ...state,
          screen:   'gameover',
          score:    newScore,
          hand:     [],
          deck:     [],
          selected: [],
          handName: gained.handName,
        }
      }

      const lives = state.lives - 1
      if (lives <= 0) {
        return {
          ...state,
          screen:   'gameover',
          score:    newScore,
          lives:    0,
          hand,
          deck,
          selected: [],
          handName: gained.handName,
        }
      }

      return {
        ...state,
        score:    newScore,
        lives,
        hand,
        deck,
        selected: [],
        handName: gained.handName,
      }
    }

    case 'DISCARD': {
      if (state.selected.length === 0 || state.discardsLeft <= 0) return state
      const { newHand: hand, remainingDeck: deck } = replaceCards(state.hand, state.selected, state.deck)

      // Mazo agotado y mano vacía → game over
      if (hand.length === 0) {
        return { ...state, screen: 'gameover', hand: [], deck: [], selected: [] }
      }

      return { ...state, hand, deck, selected: [], discardsLeft: state.discardsLeft - 1 }
    }

    case 'SKIP': {
      const nextRound = state.round + 1
      return {
        ...state,
        round:        nextRound,
        score:        0,
        targetScore:  getTargetScore(nextRound, state.difficulty),
        selected:     [],
        discardsLeft: MAX_DISCARDS,
      }
    }

    case 'APPLY_TAROT': {
      const { tarotId } = action
      switch (tarotId) {
        case 'tarot_fool': {
          const allIds = state.hand.map(c => c.id)
          const { newHand: hand, remainingDeck: deck } = replaceCards(state.hand, allIds, state.deck)
          return { ...state, hand, deck, selected: [] }
        }
        case 'tarot_magician':
          return {
            ...state,
            hand: state.hand.map(c =>
              state.selected.includes(c.id) ? { ...c, numericValue: c.numericValue * 2 } : c
            ),
          }
        case 'tarot_wheel':
          return { ...state, targetScore: Math.max(0, state.targetScore - 100) }
        case 'tarot_star':
          return {
            ...state,
            hand: state.hand.map(c =>
              state.selected.includes(c.id) ? { ...c, suit: 'diamonds' } : c
            ),
          }
        case 'tarot_strength':
          return {
            ...state,
            hand: state.hand.map(c => ({ ...c, numericValue: c.numericValue + 1 })),
          }
        case 'tarot_hermit':
          return { ...state, lives: Math.min(state.lives + 1, MAX_LIVES) }
        default:
          return state
      }
    }

    default:
      return state
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  const startGame    = useCallback((difficulty) => dispatch({ type: 'START_GAME', difficulty }), [])
  const resetGame    = useCallback(() => dispatch({ type: 'RESET_GAME' }), [])
  const toggleSelect = useCallback((id) => dispatch({ type: 'TOGGLE_SELECT', id }), [])
  const playHand     = useCallback((activeJokers) => dispatch({ type: 'PLAY_HAND', activeJokers }), [])
  const discard      = useCallback(() => dispatch({ type: 'DISCARD' }), [])
  const skip         = useCallback(() => dispatch({ type: 'SKIP' }), [])
  const applyTarot   = useCallback((tarotId) => dispatch({ type: 'APPLY_TAROT', tarotId }), [])

  return {
    ...state,
    startGame,
    resetGame,
    toggleSelect,
    playHand,
    discard,
    skip,
    applyTarot,
  }
}

export default useGameState

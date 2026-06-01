import './CardComponent.css'

const SUIT_SYMBOLS = {
  hearts:   '♥',
  diamonds: '♦',
  clubs:    '♣',
  spades:   '♠',
}

const RED_SUITS = ['hearts', 'diamonds']

function CardComponent({ card, selected = false, isSpecial = false, onClick }) {
  const symbol  = SUIT_SYMBOLS[card.suit]
  const isRed   = RED_SUITS.includes(card.suit)

  const classes = [
    'card',
    isRed      ? 'card--red'      : 'card--black',
    selected   ? 'card--selected' : '',
    isSpecial  ? 'card--special'  : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} onClick={onClick}>
      {isSpecial && <span className="card__badge">★</span>}

      <div className="card__corner card__corner--top">
        <span className="card__value">{card.value}</span>
        <span className="card__suit">{symbol}</span>
      </div>

      <div className="card__center">{symbol}</div>

      <div className="card__corner card__corner--bottom">
        <span className="card__value">{card.value}</span>
        <span className="card__suit">{symbol}</span>
      </div>
    </div>
  )
}

export default CardComponent

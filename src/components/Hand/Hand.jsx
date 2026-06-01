import CardComponent from '../Card/CardComponent'
import './Hand.css'

const DUMMY_CARDS = [
  { id: 'd1', value: 'A',  suit: 'spades',   numericValue: 11 },
  { id: 'd2', value: 'K',  suit: 'hearts',   numericValue: 10 },
  { id: 'd3', value: 'Q',  suit: 'diamonds', numericValue: 10 },
  { id: 'd4', value: 'J',  suit: 'clubs',    numericValue: 10 },
  { id: 'd5', value: '10', suit: 'hearts',   numericValue: 10 },
  { id: 'd6', value: '7',  suit: 'spades',   numericValue: 7  },
  { id: 'd7', value: '3',  suit: 'diamonds', numericValue: 3  },
  { id: 'd8', value: '2',  suit: 'clubs',    numericValue: 2  },
]

function Hand({ cards = DUMMY_CARDS, selected = [], onSelect }) {
  return (
    <div className="hand">
      {cards.map(card => (
        <CardComponent
          key={card.id}
          card={card}
          selected={selected.includes(card.id)}
          isSpecial={card.isSpecial}
          onClick={() => onSelect?.(card)}
        />
      ))}
    </div>
  )
}

export default Hand

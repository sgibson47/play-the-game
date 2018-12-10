import React from 'react'

const Deck = (props) => (
  <div className="deck">
    {props.cardsLeft}
    <p>Cards left in the Deck</p>
  </div>
)

export default Deck
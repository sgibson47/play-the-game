import React from 'react'

const Deck = (props) => (
  <div className="deck">
    {props.cardsLeft}
    <p>Cards To Go</p>
  </div>
)

export default Deck
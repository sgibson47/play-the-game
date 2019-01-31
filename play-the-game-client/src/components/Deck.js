import React from 'react'

const Deck = (props) => (
  
    <div className="deckCard">
      <br/>
      <br/>
      {props.cardsLeft}
      <p>Cards left <br/> in the Deck</p>
    </div>
  
)

export default Deck
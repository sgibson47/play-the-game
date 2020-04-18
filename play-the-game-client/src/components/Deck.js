import React from 'react'

const Deck = ({cardsLeft}) => (
    <div className="deckCard">
      <br/>
      <br/>
      {cardsLeft}
      <p>Cards left <br/> in the Deck</p>
    </div>
  
);

export default Deck;
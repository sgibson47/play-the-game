import React from 'react';

function Rules (){

  return (
    <div className="Rules">
      <h1>Rules</h1>
      
      <h3>Goal</h3>
        <p> 
          Run out the deck by playing the cards dealt to you in ascending order on the 1 piles or in descending order on the 100 piles. 
        </p>

      <br/>

      <h3>Cards</h3>
        <ul>
          <li>2 cards with the number 1 on them</li>
          <li>2 cards with the number 100 on them</li>
          <li>98 cards with the numbers 2-99 on them</li>
        </ul>
        
      <br/>

      <h3>Basic Game Play</h3>

        <p>At the start of a game, the 1 & 100 cards will be laid out to start the piles and the player will be dealt 7 cards from the the deck into their hand. </p>

        <p>Each turn, a player must play at least 2 cards from their hand.</p>

        <p>A card is played by putting it on one of the four piles.</p>
         
        <p>Cards placed on the 100 piles must be smaller in value than the pile's top most card. Cards placed on the 1 piles must be larger in value than the pile's top most card.</p>

        <p>Except, a card may be played out of out of order if its value is exactly 10 greater or less than the pile's top most card. For example, if a 1 pile has a top most card of 45, instead of having to play a card with a value greater than 45, the player may play a card with a value of 35.</p>
          
        <p>After the player plays at least 2 cards from their hand, they draw as many cards as needed to get back up to 7 cards in their hand.</p>
         
        <p>The player takes turns until they cannot make any more valid plays (they lose) or they run out the deck (they win).</p>    
    </div>
  );
};

export default Rules;
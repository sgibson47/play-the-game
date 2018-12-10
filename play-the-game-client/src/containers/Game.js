import React, {Component} from 'react';
import Deck from '../components/Deck'
import Hand from './Hand'
import Piles from './Piles'

const handCards = [
  {value: 3},
  {value: 4},
  {value: 5},
  {value: 6},
  {value: 7},
  {value: 8},
  {value: 9}
]


const piles = [
  {
    id: 5,
    asc: true,
    game_id: 1,
    cards: [
      {value: 12}
    ]
  },
  {
    id: 6,
    asc: true,
    game_id: 1,
    cards: [
      {value: 12}
    ]
  },
  {
    id: 7,
    asc: false,
    game_id: 1,
    cards: [
      {value: 12}
    ]
  },
  {
    id: 8,
    asc: false,
    game_id: 1,
    cards: [
      {value: 12}
    ]
  }
]



class Game extends Component {
  render(){
    return(
      <div className="game">
        <Deck cardsLeft={66}/>
        <Piles piles={piles}/>
        <Hand cards={handCards}/>
      </div>
    )
  }
}

export default Game;
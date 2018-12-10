import React, {Component} from 'react';
import './App.css'
import Game from './Game'

const API_URL = "http://localhost:3001/api"

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      game: {
        id: 0,
        status: true,
        playerName: "",
        piles: [
          {
            id: 0,
            asc: true,
            game_id: 0,
            cards: []
          },
          {
            id: 1,
            asc: true,
            game_id: 0,
            cards: []
          },
          {
            id: 2,
            asc: false,
            game_id: 0,
            cards: []
          },
          {
            id: 3,
            asc: false,
            game_id: 0,
            cards: []
          }
        ],
        deck: {
          id: 0,
          game_id: 0,
          cards: []
        },
        hand: {
          id: 0,
          game_id: 0,
          cards: []
        }
      }
    }
  }

  componentDidMount(){
    fetch(`${API_URL}/games/1`)
      .then(response => response.json())
      .then(game => this.setState({game: game}))
  }

  render(){
    return(
      <div className="App">
        <h1>Play The Game</h1>
        <Game game={this.state.game}/>
      </div>
    )
  }
}

export default App;
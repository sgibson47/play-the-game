import React, {Component} from 'react';
import './App.css'
import Game from './Game'
import {connect} from 'react-redux'
import {getGame, selectCard} from '../actions/game'

const API_URL = "http://localhost:3001/api"

class App extends Component {

  componentDidMount(){
    this.props.getGame()
  }

  render(){
    return(
      <div className="App">
        <h1>Play The Game</h1>
        <Game 
          currentGame={this.props.currentGame} 
          selectedCard={this.props.selectedCard}
          selectCard={this.props.selectCard}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return({
    currentGame: state.game,
    selectedCard: state.selectedCard
  })
}

export default connect(mapStateToProps, {getGame, selectCard})(App);
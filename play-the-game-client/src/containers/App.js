import React, {Component} from 'react';
import './App.css'
import Game from './Game'
import {connect} from 'react-redux'
import {getGame, selectCard, deselectCard, selectPile, deselectPile, addMove, updateTopCard } from '../actions/game'

const API_URL = "http://localhost:3001/api"

class App extends Component {

  componentDidMount(){
    this.props.getGame()
  }

  render(){
    // console.log("From App")
    // debugger
    return(
      <div className="App">
        <h1>Play The Game</h1>
        <Game 
          currentGame={this.props.currentGame} 
          
          selectedCard={this.props.selectedCard}
          selectCard={this.props.selectCard}
          deselectCard={this.props.deselectCard}
          
          selectedPile={this.props.selectedPile}
          selectPile={this.props.selectPile}
          deselectPile={this.props.deselectPile}
          
          addMove={this.props.addMove}
          updateTopCard={this.props.updateTopCard}
          moves={this.props.movesData.moves}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return({
    currentGame: state.game,
    selectedCard: state.selectedCard,
    selectedPile: state.selectedPile,
    movesData: state.movesData
  })
}

export default connect(mapStateToProps, {getGame, selectCard, deselectCard, selectPile, deselectPile, addMove, updateTopCard})(App);
import React, {Component} from 'react';
import './App.css'
import Game from './Game'
import GamesPage from './GamesPage'
import {connect} from 'react-redux'
import {getGame, selectCard, deselectCard, selectPile, deselectPile, makeMove, endGame, endTurn, addMove, clearMoves } from '../actions/game'
import { BrowserRouter as Router, Route } from 'react-router-dom';

const API_URL = "http://localhost:3001/api"

class App extends Component {

  state = {
    games: [
      {"id": 1, "status": false, "playerName": "Sam"},
      {"id": 2, "status": true, "playerName": "Steven"},
      {"id": 3, "status": true, "playerName": "Garnet"}
    ]
  }

  render(){
    // console.log("From App")
    // debugger
    return(
      <Router>
        <div>
          <Route exact path="/" render={() => <div className="App"><h1>Play The Game</h1></div>} />
          <Route 
            exact path='/games' 
            render={
              routerProps => <GamesPage {...routerProps} games={this.state.games}/>} />
          <Route 
            exact path='/games/:gameId' 
            render={
              routerProps => 
                <Game 
                  {...routerProps} 
                  currentGame={this.props.currentGame}
                  moves={this.props.movesData.moves}
                  selectedCard={this.props.selectedCard} 
                  selectedPile={this.props.selectedPile}
                  
                  selectCard={this.props.selectCard}
                  deselectCard={this.props.deselectCard}
                  
                  selectPile={this.props.selectPile}
                  deselectPile={this.props.deselectPile}
                  
                  makeMove={this.props.makeMove}
                  endTurn={this.props.endTurn}
                  addMove={this.props.addMove}
                  clearMoves={this.props.clearMoves}
                  endGame={this.props.endGame}
                  getGame={this.props.getGame}
                />
            } 
          />   
        </div>
      </Router>
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

export default connect(
  mapStateToProps, 
  {
    getGame, 
    selectCard, 
    deselectCard, 
    selectPile, 
    deselectPile, 
    makeMove, 
    endTurn, 
    addMove, 
    clearMoves, 
    endGame
  }
)(App);
import React, {Component} from 'react';
import './App.css'
import Game from './Game'
import GamesPage from './GamesPage'
import NavBar from '../components/NavBar'
import Rules from '../components/Rules'
import NewGame from '../components/NewGame'
import {connect} from 'react-redux'
import {
  getGame, 
  selectCard, 
  deselectCard, 
  selectPile, 
  deselectPile, 
  makeMove, 
  endGame, 
  endTurn, 
  getGames, 
  newGame } from '../actions/game'
import { BrowserRouter as Router, Route } from 'react-router-dom';

const API_URL = "http://localhost:3001/api"

class App extends Component {

  render(){
    // console.log("From App")
    // debugger
    return(
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" render={() => <div className="App">Root</div>} />
          <Route exact path="/rules" render={Rules}/>
          <Route exact path="/new" render={
              routerProps => 
                <NewGame 
                  {...routerProps} 
                  newGame={this.props.newGame}
                />
            } 
          />
          <Route 
            exact path='/games' 
            render={
              routerProps => 
                <GamesPage 
                  {...routerProps} 
                  games={this.props.games}
                  getGames={this.props.getGames}
                />
            } 
          />
          <Route 
            exact path='/games/:gameId' 
            render={
              routerProps => 
                <Game 
                  {...routerProps} 
                  currentGame={this.props.currentGame}
                  selectedCard={this.props.selectedCard} 
                  selectedPile={this.props.selectedPile}
                  
                  selectCard={this.props.selectCard}
                  deselectCard={this.props.deselectCard}
                  
                  selectPile={this.props.selectPile}
                  deselectPile={this.props.deselectPile}
                  
                  makeMove={this.props.makeMove}
                  endTurn={this.props.endTurn}
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
    movesData: state.movesData,
    games: state.games
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
    endGame,
    getGames,
    newGame
  }
)(App);
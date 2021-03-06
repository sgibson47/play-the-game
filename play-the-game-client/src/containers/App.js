import React, {Component} from 'react';
import './App.css';
import Game from './Game'
import GamesPage from './GamesPage'
import NavBar from '../components/NavBar'
import Rules from '../components/Rules'
import NewGame from '../components/NewGame'
import Root from '../components/Root'

import {connect} from 'react-redux'
// used to subscribe a component to the Redux store

import {
  getGame, 
  selectCard, 
  deselectCard, 
  selectPile, 
  deselectPile, 
  makeMove,  
  endTurn, 
  getGames, 
  newGame } from '../actions/game'

import { BrowserRouter as Router, Route } from 'react-router-dom';
// Enables client side routing

// When rendering a component through a Route, 
// the component recieves props from the Route automatically 
// that contain info on the route.
// If you want to pass additional data to the component,
// use the render attribute.
// The render attr takes an anonymous function, and
// the props from the route  are available as an argument for the function.

class App extends Component {

  render(){
    return(
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={Root} />
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
    getGames,
    newGame
  }
)(App);
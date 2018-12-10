import React, {Component} from 'react';
import './App.css'
import Game from './Game'
import {connect} from 'react-redux'
import {getGame} from '../actions/game'

const API_URL = "http://localhost:3001/api"

class App extends Component {

  componentDidMount(){
    this.props.getGame()
  }

  render(){
    debugger
    return(
      <div className="App">
        <h1>Play The Game</h1>
        <Game game={this.props.game}/>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return({
    game: state.game
  })
}

export default connect(mapStateToProps, {getGame})(App);
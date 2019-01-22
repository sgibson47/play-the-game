import React, {Component} from 'react'

class Root extends Component {
  render(){
    return (
      <div className='Root'>
        <h2>Welcome to Play The Game</h2>
        <p>The Game was developed by <a href="https://idwgames.com">IDW Games</a>. 
        <br/>It challenges players to run out a deck of cards numbered 2-99 
        by playing each in ascending or descending order on 4 piles.</p>

        <p>Play The Game is a web application that lets users play The Game.</p>
        
        <p>You can get started on a new game by clicking on "New Game" above.
        <br/> 
        You can learn more about how to play The Game by clicking on "Rules" above.
        <br/>
        Or, you can check out all the games that have been started by clicking on "Index of Games" above. </p>
        <div> ---------------------------------------</div>
        <div>Play The Game was developed with a Ruby on Rails API backend 
        and a React with Redux frontend as a portfolio project for 
        the <br/>Flatiron School's Online Full Stack Web Development Program. </div>
      </div>
    )
  }
}

export default Root
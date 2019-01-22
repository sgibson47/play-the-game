import React, {Component} from 'react'

class GameOver extends Component {

  GameOverClassName = () => {
    if(!this.props.render){
      return "GameOver"
    }else {
      return "HideGameOver"
    }
  }

  render(){
    return (
      <div className={this.GameOverClassName()} >
        <h1>GAME OVER</h1>
      </div>
    )
  }
}

export default GameOver
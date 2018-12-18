import React, {Component} from 'react'

class GameOver extends Component {

  GameOverClassName = () => {
    if(this.props.render){
      return "GameOver"
    }else {
      return "HideGameOver"
    }
  }

  render(){
    return (
      <div 
        className={this.GameOverClassName()} 
        >
        GAME OVER
      </div>
    )
  }
}

export default GameOver
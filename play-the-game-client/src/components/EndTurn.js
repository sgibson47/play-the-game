import React, {Component} from 'react'

class EndTurn extends Component {

  endTurn = () =>{
    const gameId = this.props.gameId

    this.props.endTurn(gameId)
  }

  endTurnClassName = () => {
    if(this.props.render){
      return "EndTurn"
    }else {
      return "HideEndTurn"
    }
  }

  render(){
    // console.log("From EndTurn")
    // debugger
    return (
      <div 
        className={this.endTurnClassName()} 
        >
        <button onClick={this.endTurn}>EndTurn</button>
      </div>
    )
  }
}

export default EndTurn
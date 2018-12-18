import React, {Component} from 'react'

class EndTurn extends Component {

  EndTurnClassName = () => {
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
        className={this.EndTurnClassName()} 
        >
        <button onClick={this.props.endTurn}>EndTurn</button>
      </div>
    )
  }
}

export default EndTurn
import React, {Component} from 'react'

class BadMove extends Component {
  badMoveClassName = () => {
    if(this.props.render){
      return "BadMove"
    }else {
      return "HideBadMove"
    }
  }

  render(){
    return (
      <div className={this.badMoveClassName()}>
        That's not a valid move.
      </div>
    )
  }
}

export default BadMove


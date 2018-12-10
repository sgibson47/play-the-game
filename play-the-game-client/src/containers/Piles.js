import React, {Component} from 'react';
import Pile from './Pile'

class Piles extends Component {
  render(){
    return(
      <div className="piles">
        {this.props.piles.map(pile =>
          <Pile key={pile.id} pile={pile}/>
        )}
      </div>
    )
  }
}

export default Piles;
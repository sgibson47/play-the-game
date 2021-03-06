import React, {Component} from 'react';
import Pile from './Pile'

class Piles extends Component {
  render(){
    return(
      <div className="piles">
        <h3>Piles:</h3>
        {this.props.piles.map(pile =>
          <Pile 
            key={pile.id} 
            pile={pile}
            selectedPile={this.props.selectedPile}
            selectPile={this.props.selectPile}
            deselectPile={this.props.deselectPile}
          />
        )}
      </div>
    )
  }
}

export default Piles;
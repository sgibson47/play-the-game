import React, {Component} from 'react';
import Card from '../components/Card'

class Hand extends Component {
  render(){
    return(
      <div className="hand">
        {this.props.cards.map(card =>
          <Card value={card.value}/>
        )}
      </div>
    )
  }
}

export default Hand;
import React, {Component} from 'react';
import GamesList from '../components/GamesList';

class GamesPage extends Component {
  componentWillMount(){
    this.props.getGames()
  }

  render(){
    return(
      <div className="Games">
        <h1>Index of Games</h1>
        <GamesList games={this.props.games} />
      </div>
    )
  }
}

export default GamesPage
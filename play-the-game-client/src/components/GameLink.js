import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class GameLink extends Component {

  render(){
    return (
      <div>
        <Link to={`/games/${this.props.game.id}`}>
          {`${this.props.game.playerName}'s game`}
        </Link>
      </div>
    );
  }
};

export default GameLink;
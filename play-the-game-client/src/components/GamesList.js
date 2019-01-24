import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import GameLink from './GameLink';

class GamesList extends Component {

  render(){
    const games = this.props.games;
    const listItems = games.map((game)=><GameLink game={game}/>);
    return (
      <div>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }
};

export default GamesList;
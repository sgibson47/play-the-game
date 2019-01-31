import React, {Component} from 'react';
import GameLink from '../components/GameLink';

class GamesList extends Component {

  render(){
    const games = this.props.games;
    const listItems = games.map((game)=><GameLink key={game.id} game={game}/>);
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
import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class GamesList extends Component{
  renderGames = (games) =>{
   games.map(game =>
       <li><Link key={game.id} to={`/games/${game.id}`}>{`${game.playerName}'s game`}</Link></li>
    );
  }

  render(){
    debugger
    return (
      <div>
        <h1>All the Games!</h1>
        <ul>
         {this.renderGames(this.props.games)}
        </ul>
      </div>
    );
  }
};

export default GamesList;

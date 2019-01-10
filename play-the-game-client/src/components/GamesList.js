import React from 'react';
import { Link } from 'react-router-dom';

function GamesList (props){
  const games = props.games;
  const makeLink = (game) =>{
    return <Link to={`/games/${game.id}`}>
      {`${game.playerName}'s game`}
    </Link>
  }
  const listItems = games.map((game)=>
    <li key={game.id}>{makeLink(game)}</li>
    )

  return (
    <div>
      <h1>All the Games!</h1>
      <ul>
        {listItems}
      </ul>
    </div>
  );
};

export default GamesList;
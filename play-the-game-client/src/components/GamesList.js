import React from 'react';
import { Link } from 'react-router-dom';

const GamesList = ({ games }) => {
  const renderGames = Object.keys(games).map(gameId =>
    <li>
      <Link key={games[gameId].id} to={`/games/${games[gameId].id}`}>{`${games[gameId].playerName}'s game`}</Link>
    </li>
  );

  return (
    <div>
      <h1>All the Games!</h1>
      <ul>
        {renderGames}
      </ul>
    </div>
  );
};

export default GamesList;
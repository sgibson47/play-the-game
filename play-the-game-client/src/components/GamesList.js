import React from 'react';
import { Link } from 'react-router-dom';

const GamesList = ({ games }) => {
  const renderGames = Object.keys(games).map(game =>
    <Link key={game.id} to={`/games/${game.id}`}>{`${game.playerName}'s game`}</Link>
  );

  return (
    <div>
      {renderGames}
    </div>
  );
};

export default GamesList;
import React from 'react';
import GamesList from '../components/GamesList';

const GamesPage = ({ games }) => (
  <div>
    <GamesList games={games} />
  </div>
)

export default GamesPage
import React, {Component} from 'react';
import { Link } from 'react-router-dom';

const GameLink = ({id, playerName}) =>{
  return(
    <div>
      <Link to={`/games/${id}`}>
        {`${playerName}'s game`}
      </Link>
    </div>
  )
}

export default GameLink;
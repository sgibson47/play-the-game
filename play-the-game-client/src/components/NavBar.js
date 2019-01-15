import React from 'react';
import { Link } from 'react-router-dom';

function NavBar (){

  return (
    <div className="NavBar">
      <Link to='/'>
        <h1 className='NavBar-Header'>Play The Game</h1>
      </Link>
      <Link to='/new'>
        New Game
      </Link>| 
      <Link to='/games'>
        Index of Games
      </Link>| 
      <Link to='/rules'>
        Rules
      </Link>
    </div>
  );
};

export default NavBar;
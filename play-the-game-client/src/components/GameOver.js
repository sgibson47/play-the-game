import React from 'react'

const GameOver = ({render}) =>{
  return (
    <div className={render ? "GameOver" : "HideGameOver"} >
      <h1>GAME OVER</h1>
    </div>
  )
}

export default GameOver
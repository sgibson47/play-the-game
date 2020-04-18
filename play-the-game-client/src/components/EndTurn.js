import React from 'react'
import {endTurn} from '../actions/game'

const EndTurn =({render, gameId}) => {
  return (
    <div className={render ? "EndTurn" : "HideEndTurn"} >
      <button onClick={endTurn(gameId)}>EndTurn</button>
    </div>
  )
}

export default EndTurn
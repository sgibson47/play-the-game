const API_URL = "http://localhost:3001/api"

//** Action Creators **
const setGame = currentGame => {
  return{
    type: 'GET_GAME_SUCCESS',
    currentGame
  }
}

export const selectCard = selectedCard => {
  return{
    type: 'SELECT_CARD',
    selectedCard
  }
}

export const deselectCard = () => {
  return{
    type: 'DESELECT_CARD'
  }
}

export const selectPile = selectedPile => {
  return{
    type: 'SELECT_PILE',
    selectedPile
  }
}

export const deselectPile = () => {
  return{
    type: 'DESELECT_PILE'
  }
}

export const addMove = move => {
  return{
    type: 'ADD_MOVE',
    move
  }
}

export const clearMoves = () => {
  return{
    type: 'CLEAR_MOVES'
  }
}

export const updateTopCard = data => {
  return{
    type: 'UPDATE_TOP_CARD',
    data
  }
}

//** Async Actions **
export const getGame = () =>{
  return dispatch => {
    return fetch(`${API_URL}/games/1`)
      .then(response => response.json())
      .then(game => dispatch(setGame(game)))
      .catch(error => console.log(error))
  }
}

export const updateGame = moves =>{
  return dispatch => {
    return fetch(`${API_URL}/games/1`, {
      method: 'PUT',
      body: JSON.stringify({game:{ newMoves: moves }}),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      // .then(response => console.log('Success:', JSON.stringify(response)))
      .then(game => dispatch(setGame(game)))
      .then(dispatch(clearMoves()))
      .catch(error => console.log(error))
  }
}


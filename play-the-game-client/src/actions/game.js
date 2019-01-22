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

export const updateTopCard = data => {
  return{
    type: 'UPDATE_TOP_CARD',
    data
  }
}

const setGames = games => {
  return{
    type: 'GET_GAMES_SUCCESS',
    games
  }
}

//** Async Actions **
export const getGame = (gameId) =>{
  return dispatch => {
    return fetch(`${API_URL}/games/${gameId}`)
      .then(response => response.json())
      .then(
        game => {
            if(game===null){

            }else{
              dispatch(setGame(game))
            }
          }
        )
      .catch(error => console.log(error))
  }
}

export const makeMove = (move, gameId) =>{
  return dispatch => {
    return fetch(`${API_URL}/games/${gameId}`, {
      method: 'PUT',
      body: JSON.stringify({game:{ newMove: move }}),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(game => dispatch(setGame(game)))
      .catch(error => console.log(error))
  }
}

export const endTurn = (gameId) =>{
  return dispatch => {
    return fetch(`${API_URL}/games/${gameId}`, {
      method: 'PUT',
      body: JSON.stringify({game:{ endTurn: true }}),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(game => dispatch(setGame(game)))
      .catch(error => console.log(error))
  }
}

export const getGames = () =>{
  return dispatch => {
    return fetch(`${API_URL}/games`)
      .then(response => response.json())
      .then(games => dispatch(setGames(games)))
      .catch(error => console.log(error))
  }
}

export const newGame = (playerName, history) =>{
  return dispatch => {
    return fetch(`${API_URL}/games`, {
      method: 'POST',
      body: JSON.stringify({game:{ playerName: playerName }}),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(game => history.push(`/games/${game.id}`))
      .catch(error => console.log(error))
  }
}


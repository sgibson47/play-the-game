const API_URL = "http://localhost:3001/api"

//** Action Creators **

const setGame = game => {
  return{
    type: 'GET_GAME_SUCCESS',
    game
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
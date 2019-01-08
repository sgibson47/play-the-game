const initialState = {}

export default (state = initialState, action) => {
  switch(action.type){
    case 'GET_GAMES_SUCCESS':
      return action.games

    default:
      return state;
  }
}
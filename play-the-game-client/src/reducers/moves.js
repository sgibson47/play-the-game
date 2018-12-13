const initialState = {
  moves: []
}

export default (state = initialState, action) => {

  switch(action.type) {
    case 'ADD_MOVE':
      let newMoves = state.moves.concat(action.move)
      return Object.assign({}, state, {moves: newMoves})

    case 'CLEAR_MOVES':
      return initialState

      
    default: 
      return state;
  }
}
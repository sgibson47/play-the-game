const initialState = {
  moves: 0
}

export default (state = initialState, action) => {

  switch(action.type) {
    case 'ADD_MOVE':
      let newMoves = state.moves + 1
      return Object.assign({}, state, {moves: newMoves})

    case 'CLEAR_MOVES':
      return initialState

      
    default: 
      return state;
  }
}
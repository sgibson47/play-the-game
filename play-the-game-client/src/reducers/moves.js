const initialState = {
  moves: []
}

export default (state = initialState, action) => {

  switch(action.type) {
    case 'ADD_MOVE':
      const move = { card_id: action.card_id, pile_id: action.pile_id }
      const moves = Object.assign({}, state.moves, move)
      return Object.assign({}, state, (moves: moves))
      
    default: 
      return state;
  }
}
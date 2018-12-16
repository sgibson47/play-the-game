const initialState = {
  moves: 0,
  movedCardIds: []
}

export default (state = initialState, action) => {

  switch(action.type) {
    case 'ADD_MOVE':
      let newMoves = state.moves + 1
      let newMovedCards = state.movedCardIds.push(action.cardId)
      return Object.assign({}, state, {moves: newMoves}, {movedCardIds: newMovedCards})

    case 'CLEAR_MOVES':
      return initialState

      
    default: 
      return state;
  }
}
const initialState = {
            id: 0,
            asc: true,
            game_id: 0,
            cards: []
          }

export default (state = initialState, action) => {

  switch(action.type) {
    case 'SELECT_PILE':
      return action.selectedPile;
    case 'DESELECT_PILE':
      return initialState;
    
    default: 
      return state;
  }
}
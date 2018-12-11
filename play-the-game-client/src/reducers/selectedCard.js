const initialState = {
        id: 0,
        value: 0,
        whereIsCard_type: "",
        whereIsCard_id: 0,
        created_at: "",
        updated_at: ""
      }

export default (state = initialState, action) => {

  switch(action.type) {
    case 'SELECT_CARD':
      return action.selectedCard;
    case 'DESELECT_CARD':
      return initialState;
    
    default: 
      return state;
  }
}
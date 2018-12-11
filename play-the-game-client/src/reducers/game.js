const initialState =
    {currentGame:
      {
        id: 0,
        status: true,
        playerName: "",
        piles: [
          {
            id: 0,
            asc: true,
            game_id: 0,
            cards: []
          },
          {
            id: 1,
            asc: true,
            game_id: 0,
            cards: []
          },
          {
            id: 2,
            asc: false,
            game_id: 0,
            cards: []
          },
          {
            id: 3,
            asc: false,
            game_id: 0,
            cards: []
          }
        ],
        deck: {
          id: 0,
          game_id: 0,
          cards: []
        },
        hand: {
          id: 0,
          game_id: 0,
          cards: []
        }
      },
      selectedCard:{
        id: 0,
        value: 0,
        whereIsCard_type: "",
        whereIsCard_id: 0,
        created_at: "",
        updated_at: ""
      }
    }

export default (state = initialState, action) => {
  switch(action.type){
    case 'GET_GAME_SUCCESS':
      return state
      // Object.assign({}, state, action.currentGame)
    case 'SELECT_CARD':
      return state
      // Object.assing({}, state, action.selectedCard)

    default:
      return state;
  }
}
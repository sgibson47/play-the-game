const initialState =
      {
        id: 0,
        status: true,
        playerName: "",
        piles: [
          {
            id: 0,
            asc: true,
            game_id: 0,
            topMostcard: null
          },
          {
            id: 1,
            asc: true,
            game_id: 0,
            topMostcard: null
          },
          {
            id: 2,
            asc: false,
            game_id: 0,
            topMostcard: null
          },
          {
            id: 3,
            asc: false,
            game_id: 0,
            topMostcard: null
          }
        ],
        deck: {
          id: 0,
          game_id: 0,
          cardCount: -1
        },
        hand: {
          id: 0,
          game_id: 0,
          cards: []
        }
      }

export default (state = initialState, action) => {
  switch(action.type){
    case 'GET_GAME_SUCCESS':
      return action.currentGame
    
    default:
      return state;
  }
}
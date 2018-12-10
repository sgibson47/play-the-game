import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'

import thunk from 'redux-thunk'

const gameReducer = (state = {}, action) => {
  switch(action.type){
    case 'GET_CURRENT_GAME_SUCCESS':
      return action.game;

    default:
      return state;
  }
}

const reducers = combineReducers({
  currentGame: gameReducer
});

const middleware = [thunk];

export default createStore(
  reducers,
  window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_(),
  applyMiddleware(...middleware)
)
import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import game from './reducers/game'

const reducers = combineReducers({
  game
});

const middleware = [thunk];

export default createStore(
  reducers,
  window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_(),
  applyMiddleware(...middleware)
)
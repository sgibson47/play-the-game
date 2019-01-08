import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import game from './reducers/game'
import selectedCard from './reducers/selectedCard'
import selectedPile from './reducers/selectedPile'
import movesData from './reducers/moves'
import games from './reducers/games'
import { composeWithDevTools } from 'redux-devtools-extension';


const reducers = combineReducers({
  game,
  selectedCard,
  selectedPile, 
  movesData,
  games
});

const middleware = [thunk];

export default createStore(
  reducers, composeWithDevTools(
  applyMiddleware(...middleware),
))
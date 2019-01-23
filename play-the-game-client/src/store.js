import {
  createStore,
  // Creates a Redux store that holds the complete state tree of your app.
  
  applyMiddleware,
  // applyMiddleware supercharges createStore with middleware

  combineReducers
  // The combineReducers helper function turns an object 
  // whose values are different reducing functions into 
  // a single reducing function you can pass to createStore.

} from 'redux'

import thunk from 'redux-thunk'
// a middleware 
// allows us to return a function inside of our action creator
// that function recieves the store's dispatch function & getState

import game from './reducers/game'
import selectedCard from './reducers/selectedCard'
import selectedPile from './reducers/selectedPile'
import games from './reducers/games'

import { composeWithDevTools } from 'redux-devtools-extension';
// enables tracking changes to the store in Chrome dev tools

const reducers = combineReducers({
  game,
  selectedCard,
  selectedPile, 
  games
});

const middleware = [thunk];

export default createStore(
  reducers, composeWithDevTools(
  applyMiddleware(...middleware),
))

// create a store based on all the imported reducers,
// create the store with DevTools & middleware
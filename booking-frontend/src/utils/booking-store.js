import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import RoomReducer from '../reducers/room-reducer';

const rootReducer = combineReducers({
  room: RoomReducer,
});

function createReduxStore() {
  return createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}

export const bookingStore = createReduxStore();

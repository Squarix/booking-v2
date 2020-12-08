import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import RoomReducer from '../reducers/room-reducer';
import AdminReducer from '../reducers/admin-reducer';
import FilterReducer from '../reducers/filter-reducer';

const rootReducer = combineReducers({
  room: RoomReducer,
  filter: FilterReducer,
  admin: AdminReducer,
});

function createReduxStore() {
  return createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}

export const bookingStore = createReduxStore();

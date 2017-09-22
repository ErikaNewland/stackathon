
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';

import nytimesData from './nytimes'
import geoData from './geo'

const reducer = combineReducers({
	// nytimesData, 
  geoData
});


const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    // createLogger()
  )
);

export default store;

export * from './geo'
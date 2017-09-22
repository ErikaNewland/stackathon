
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';

import envMortData from './envMort'
import geoData from './geo'

const reducer = combineReducers({
	envMortData, 
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
export * from './envMort'
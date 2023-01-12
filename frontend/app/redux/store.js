import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mealReducer from './reducers';

const rootReducer = combineReducers({ mealReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));
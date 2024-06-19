import { applyMiddleware, legacy_createStore } from "redux";
import {thunk} from 'redux-thunk';
import {rootReducer} from './reducers/rootReducer.js'
import logger from 'redux-logger';

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk,logger));
import { combineReducers } from "redux";
import {quizReducer} from './quizReducer.js'

export const rootReducer = combineReducers({
    quiz:quizReducer,
})
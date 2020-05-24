import {combineReducers} from 'redux';
import {default as toDoListReducer} from './toDoListReducer';
const appState = combineReducers({
    toDoListReducer
});
export const rootReducer = (state, action) => {

    return appState(state, action)
}
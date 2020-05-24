import * as actions from '../constant/actionTypes';

export function addNewToDo(payload){
    console.log("action","addNewToDO");
    return {
        type : actions.ADD_NEW_TO_DO,
        payload : payload
    }
}

export function completeToDo(payload){
    return {
        type : actions.COMPLETE_TO_DO,
        id : payload
    }
}

export function updateToDo(payload){
    return {
        type : actions.UPDATE_TO_DO,
        payload : payload
    }
}

export function deleteToDo(id){
    return {
        type : actions.DELETE_TO_DO,
        id : id 
    }
}
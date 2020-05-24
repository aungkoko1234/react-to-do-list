import * as actions from '../constant/actionTypes';
const INITAIL_STATE = {
    toDoList: []
}

function toDoListReducer(state =INITAIL_STATE,action){
    switch(action.type){
        case actions.ADD_NEW_TO_DO : return Object.assign({},state,{
            toDoList : [...state.toDoList,action.payload]
        })
        case actions.COMPLETE_TO_DO : return Object.assign({},state,{
            toDoList : completeToDoListById(state,action.id)
        })
        case actions.DELETE_TO_DO : return Object.assign({},state,{
            toDoList : handleDeleteToDO(state,action.id)
        })
        case actions.UPDATE_TO_DO : return Object.assign({},state,{
            toDoList : updateToDo(state,action.payload)
        })
        default : return state;
    }
}

function completeToDoListById(state,id){
     let toDoList = state.toDoList;
     let updatedToDo = [];
      toDoList.map(todo=>{
         if(todo.id == id){
             todo.isComplete =true
         }
         updatedToDo.push(todo)
     })
     return updatedToDo;
   
}

function updateToDo(state,payload){
    let toDoList = state.toDoList;
    let editedToDo = [];
    toDoList.map(todo=>{
        if(todo.id == payload.id){
            todo =payload
        }
         editedToDo.push(todo)
    })
    return editedToDo
}

function handleDeleteToDO(state,id){
    let toDoList = state.toDoList;
    let deletedToDo =  toDoList.filter((todo)=> todo.id !=id);
    return deletedToDo;
}

export default toDoListReducer;
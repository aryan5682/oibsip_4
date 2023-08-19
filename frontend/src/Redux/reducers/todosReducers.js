import * as actionTypes from '../actions/type'

export const todosReducers = (state=[],action) => {
 switch(action.type){
    case actionTypes.ADDNEWTODO:
        return [action.payload,...state]
    case actionTypes.FETCHTODO:
      return action.payload
    case actionTypes.TOGGLETODO:
      return state.map(todo=>(
        todo._id=== action.payload._id? {...todo ,done:!todo.done}:todo
      ))
    case actionTypes.UPDATETODO:
      return state.map(todo=>(
        todo._id=== action.payload._id? {...todo ,data:action.payload.data}:todo
      ))
    case actionTypes.DELETETODO:
      return state.filter(todo=>todo._id!==action.payload._id)
     default :
          return state;  
 }
}



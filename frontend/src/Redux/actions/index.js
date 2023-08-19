import axios from 'axios'
import { ADDNEWTODO ,DELETETODO,FETCHTODO, TOGGLETODO, TOGGLE_TAB, UPDATETODO} from './type';
export const addNewTodo =(data) =>async(dispatch) =>{
    try{
        const token=localStorage.getItem("token");
 const res= await axios.post('http://localhost:8000/api/users/todos',{data},{
 headers:{
    'x-auth-token': token, // Token should be a string
  },
})
 
  dispatch({type:ADDNEWTODO,payload:res.data})
}catch(error){
    console.log('Error while calling addNewTodo API',error.message)
}
};
export const getAllTodos= ()=> async(dispatch)=>{
  try{
    const token=localStorage.getItem("token");
const res= await axios.get('http://localhost:8000/api/users/gettodos',{
headers:{
'x-auth-token': token, // Token should be a string
},
})

dispatch({type:FETCHTODO,payload:res.data})
}catch(error){
console.log('Error while calling getTodo API',error.message)
}
}
export const toggleTodo= (id)=> async(dispatch)=>{
  try{
    const token=localStorage.getItem("token");
const res= await axios.get(`http://localhost:8000/api/users/marktodo/${id}`,{
headers:{
'x-auth-token': token, // Token should be a string
},
})

dispatch({type:TOGGLETODO,payload:res.data})
}catch(error){
console.log('Error while calling getTodo API',error.message)
}
}
export const updateTodo= (id,data)=> async(dispatch)=>{
  try{
    const token=localStorage.getItem("token");
const res= await axios.put(`http://localhost:8000/api/users/todos/${id}`,{data},{
headers:{
'x-auth-token': token, // Token should be a string
},
})

dispatch({type:UPDATETODO,payload:res.data})
}catch(error){
console.log('Error while calling update API',error.message)
}
}
export const deleteTodo= (id)=> async(dispatch)=>{
  try{
    const token=localStorage.getItem("token");
const res= await axios.delete(`http://localhost:8000/api/users/todos/${id}`,{
headers:{
'x-auth-token': token, // Token should be a string
},
})

dispatch({type:DELETETODO,payload:res.data})
}catch(error){
console.log('Error while calling update API',error.message)
}
}
export const toggleTab=(tab)=>async(dispatch)=>{
  dispatch({type:TOGGLE_TAB,selected:tab})
}
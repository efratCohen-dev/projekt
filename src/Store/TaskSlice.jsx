import { createSlice } from "@reduxjs/toolkit";
const initValue={
    tasks:[]
}

const TodoSlice=createSlice({
    name:"todo",
    initialState:initValue,
    reducers:{
    getAll:(state,actions)=>{
        
    state.tasks=actions.payload.res
    },addTask:(state,actions)=>{
        state.tasks=[...state.tasks,actions.payload.task]

     },deleteTask:(state,actions)=>{
        state.tasks=state.tasks.filter( t=> t.id !=actions.payload.id)

     },editTask:(state,actions)=>{
        state.tasks.map((t)=>{
            if(t.id==actions.payload.id){
                t.name=actions.payload.name
                t.isComplete=actions.payload.isComplete
            }
        })
     }
    }
})
export const {addTask,deleteTask,editTask,getAll}=TodoSlice.actions
export default TodoSlice.reducer
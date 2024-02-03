import { createSlice } from "@reduxjs/toolkit";
const initValue={
    users:[]
}

const UserSlice=createSlice({
    name:"user",
    initialState:initValue,
    reducers:{
    getAll:(state,actions)=>{
        
        state.users=actions.payload.res

    },addUser:(state,actions)=>{
        state.users=[...state.users,actions.payload.user]

     },deleteUser:(state,actions)=>{
        state.users=state.users.filter( t=> t.id !=actions.payload.id)

     },editUser:(state,actions)=>{
        state.users.map((t)=>{
            if(t.id==actions.payload.id){
                t.name=actions.payload.name
                t.adress=actions.payload.adress
               t.email=actions.payload.email
               t.phone=actions.payload.phone
            }
        })
     }
    }
})
export const {addUser,deleteUser,editUser,getAll}=UserSlice.actions
export default UserSlice.reducer
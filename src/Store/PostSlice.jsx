import { createSlice } from "@reduxjs/toolkit";
const initValue={
    postes:[]
}

const PostSlice=createSlice({
    name:"post",
    initialState:initValue,
    reducers:{
    getAll:(state,actions)=>{
    state.postes=actions.payload.res
    },addPost:(state,actions)=>{
        state.postes=[...state.postes,actions.payload.post]

     },deletePost:(state,actions)=>{
        state.postes=state.postes.filter( p=> p.id !=actions.payload.id)

     },editPost:(state,actions)=>{
        state.postes.map((p)=>{
            if(p.id==actions.payload.id){
                p.content=actions.payload.content
                p.like=actions.payload.like
            }
        })
     }
    }
})
export const {addPost,deletePost,editPost,getAll}=PostSlice.actions
export default PostSlice.reducer
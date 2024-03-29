import { useSelector ,useDispatch } from 'react-redux';
import OnePost from './onePost'
import {addPost,getAll} from '../../Store/PostSlice'
import React,{  useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useGet from "../../Hooks/GetHook";
import usePost from "../../Hooks/PostHook";

const Post=()=>{
 
  const [open, setOpen] = React.useState(false);
  const [content,setContent]=useState("");
  const {res,axiosData}=useGet({url:"https://localhost:7126/api/Post"});
  const {axiosDataPost}=usePost({url:"https://localhost:7126/api/Post"});
  const dispatch = useDispatch()
 
 
  useEffect(()=>{
    axiosData()
    dispatch(getAll({res:res}))
  })
    const myPostes = useSelector(x => x.PostSlice.postes)
    const handleClickOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
      setOpen(false);
    };
    const savePost=()=>{
        const post={
            content:content,
            ceateDate:Date.now(),
            like:false
        }
        axiosDataPost(post)
        dispatch(addPost({post:post}))
        handleClose()
    }
    // axiosData()
    // dispatch(getAll({res:res}))

    return(
        <>
         <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          הוספת פוסט
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>הוספת משימה</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="content of post"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e)=>setContent(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={()=>savePost()}>add</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
        {
         
         myPostes.map((item) => {
             return (
                 <OnePost items={item} />
             )
         })
     
     }
        </>
    )
}
export default Post;
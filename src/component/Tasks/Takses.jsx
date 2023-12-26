import React,{  useEffect, useState } from "react";
import { useSelector ,useDispatch } from 'react-redux';
import { addTask ,getAll} from "../../Store/TaskSlice";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Task from "./Task";
import useGet from "../../Hooks/GetHook";
import usePost from "../../Hooks/PostHook";

const Todoes=()=>{
 
  const myTasks = useSelector(x => x.TodoSlice.tasks)
    const [open, setOpen] = React.useState(false);
    const [nameTask,setNameTask]=useState("");
    const [id,setId]=useState(0);
    const {res,axiosData}=useGet({url:"api/get"});
    const {axiosDataPost}=usePost({url:"api/post"});
    const dispatch = useDispatch()
    const handleClickOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
      setOpen(false);
    };
    const saveTask=()=>{
        setId(id+1);
        const task={
            id:id,
            name:nameTask,
            caeteDate:Date.now(),
            isComplated:false
        }
        dispatch(addTask({task:task}))
        axiosDataPost(task)
        handleClose()
    }
    useEffect(()=>{
      axiosData()
      dispatch(getAll({res:res}))
    },[])
    return(
        <> 
        <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          הוספת משימה
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>הוספת משימה</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="name of task"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e)=>setNameTask(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={()=>saveTask()}>add</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      {
         
          myTasks.map((item) => {
              return (
                  <Task items={item} />
              )
          })
      
      }
        </>
    )
    }
    export default Todoes;
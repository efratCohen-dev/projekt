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
 
    const [open, setOpen] = React.useState(false);
    const [nameTask,setNameTask]=useState("");
    const {res,axiosData}=useGet({url:'https://localhost:7126/api/Todo'});
    const {axiosDataPost}=usePost({url:'https://localhost:7126/api/Todo'});
    const dispatch = useDispatch()
    useEffect(()=>{
      axiosData()
      dispatch(getAll({res:res}))
    })
    const myTasks = useSelector(x => x.TodoSlice.tasks)
    const handleClickOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
      setOpen(false);
    };
    const saveTask=()=>{
        const task={
            name:nameTask,
            caeteDate:Date.now(),
            isComplated:false
        }
        dispatch(addTask({task:task}))
        axiosDataPost(task)
        handleClose()
    }
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
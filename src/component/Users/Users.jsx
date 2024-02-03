import React,{  useEffect, useState } from "react";
import { useSelector ,useDispatch } from 'react-redux';
import { addUser,getAll } from "../../Store/UserSlice";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import User from './Users'
import useGet from "../../Hooks/GetHook";
import usePost from "../../Hooks/PostHook";
import { pink, cyan, teal, lime } from '@mui/material/colors';
import Add from '@mui/icons-material/Add';
import BubbleChart from '@mui/icons-material/BubbleChart';
import DialogContentText from '@mui/material/DialogContentText';;




const Users=()=>{
 
      const [open, setOpen] = React.useState(false);
      const [nameUser,setNameUser]=useState("");
      const [adress, setAdress] = useState("");
      const [email, setEmail] = useState("");
      const [phone, setPhone] = useState("");
      const {res,axiosData}=useGet({url:"https://localhost:7126/api/User"});
      const {axiosDataPost}=usePost({url:"https://localhost:7126/api/User"});
      const dispatch = useDispatch()

      useEffect(()=>{
        axiosData()
        dispatch(getAll({res:res}))
      })

      const myUsers = useSelector(x => x.UserSlice.users)
      const handleClickOpen = () => {
        setOpen(true);
      };
      
      const handleClose = () => {
        setOpen(false);
      };
      const saveUser=()=>{
          const user={
              name:nameUser,
              email:email,
              phone:phone,
              adress:adress
          }
          axiosDataPost(user)
          dispatch(addUser({user:user}))
          handleClose()
      }
      return(
          <> 
          <React.Fragment>
          <Button variant="outlined" onClick={handleClickOpen}>
              הוספת משתמש
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>הוספת משתמש</DialogTitle>
            <DialogContent>
              <TextField autoFocus margin="dense" id="name" label="name of user" type="text" fullWidth variant="standard" onChange={(e)=>setNameUser(e.target.value)}/>
              <TextField autoFocus margin="dense" id="adress" label="adress of user" type="text" fullWidth variant="standard" onChange={(e)=>setAdress(e.target.value)}/>
              <TextField autoFocus margin="dense" id="phone" label="phone of user" type="text" fullWidth variant="standard" onChange={(e)=>setPhone(e.target.value)}/>
              <TextField autoFocus margin="dense" id="email" label="email of user" type="text" fullWidth variant="standard" onChange={(e)=>setEmail(e.target.value)}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={()=>saveUser()}>add</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
        {
           
           myUsers.map((item) => {
                return (
                    <User items={item} />
                )
            })
        
        }
          </>
      )
      }
      export default Users;
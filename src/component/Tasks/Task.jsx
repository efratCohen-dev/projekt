import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import useDelete from "../../Hooks/DeleteHook";
import { deleteTask, editTask } from "../../Store/TaskSlice";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Mode from '@mui/icons-material/Mode';
import Send from '@mui/icons-material/Send';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Checkbox from '@mui/material/Checkbox';
import { pink, cyan, teal, lime } from '@mui/material/colors';
import {moment} from 'moment';
import usePut from "../../Hooks/PutHook";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Task = (props) => {
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const [Complated, setComplated] = useState(props.items.Complated)
    const [time, setTime] = useState(props.items.caeteDate)
    const [name, setName] = useState(props.items.name)
    const{axiosDataDelete}=useDelete({url:'https://localhost:7126/api/Todo'})
    const {axiosDataPut}=usePut({url:'https://localhost:7126/api/Todo'})
    const moment= require('moment') 
    const d=props.items.caeteDate;
    const Date=moment(d).format("DD/MM/yyy kk:mm:ss");
    const toEdit = () => {
        setEdit(false)
        dispatch(editTask({id:props.items.id,name:name,Complated:Complated}))
        axiosDataPut({id:props.items.id,name:name,Complated:Complated})
    }
    const toDelete=()=>{
        axiosDataDelete(props.items.id)
        dispatch(deleteTask({id:props.items.id}))
    }
    return (
        <>
            {!edit ?
              <Card sx={{ width:'15%', margin: 'auto', marginTop: '10px', borderStyle: 'solid', borderColor: teal['500'] }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.items.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {Date}
                        </Typography>
                    </CardContent>
                    <Checkbox {...label} defaultNotChecked disabled/>
                    <CardActions >

                        <Button size="xxlarge" onClick={()=>toDelete()}><DeleteForeverIcon size="xxlarge" sx={{ color: teal['500'] }} /></Button>
                        <Button size="xxlarge" onClick={() => setEdit(true)}><Mode size="xxlarge" sx={{ color: teal['500'] }} /></Button>
                    </CardActions>
                </Card>
                : <Card sx={{ width:'15%', margin: 'auto', marginTop: '10px', borderStyle: 'solid', borderColor: teal['500'] }}>
                    <CardContent>
                        <TextField id="outlined-basic"  variant="outlined"  defaultValue={props.items.name} onChange={(e) => setName(e.target.value)} />
                    </CardContent>
                    {
                    props.items.Complated ?
                        <Checkbox
                            {...label}
                            defaultChecked
                            onClick={() => setComplated(!Complated)}
                        />
                        : <Checkbox
                            {...label}
                            defaultNotChecked
                            onClick={() => setComplated(!Complated)}
                        />
                    }
                    <CardActions >
                        <Button size="xxlarge" onClick={()=>toEdit()} ><Send size="xxlarge" sx={{ color: teal['500'] }} /></Button>
                    </CardActions>
                </Card>}
        </>
    )
}
export default Task
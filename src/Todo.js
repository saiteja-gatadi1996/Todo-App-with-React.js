import { Button, List, ListItem, ListItemText, makeStyles, Modal } from '@material-ui/core'
import React, { useState } from 'react'
import "./Todo.css"
import db from './firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));


function Todo({todo}) {
    const classes=useStyles();
    const[open, setOpen]= useState(false);
    const[input, setInput]= useState('')
    const handleOpen=()=>{
        setOpen(true);

    }

    const updateTodo=()=>{
        db.collection('todos').doc(todo.id).set({
                todo:input
            //prevents you from overiding
        },{merge:true})
        setOpen(false)
    }
    
    return (
<>
        <Modal open={open}
        onClose={e=>setOpen(false)}>
            <div className={classes.paper}>
                <h1>Modal </h1>
                <input placeholder={todo.todo} value={input} onChange={e=>setInput(e.target.value)}/>
                <Button onClick={updateTodo}>Update Todo</Button>
            </div>
        </Modal>
        <List className="todo__list">
            <ListItem>
                <ListItemText primary={todo.todo} secondary="Time Date"/> 
            </ListItem>
            <button onClick={e=>setOpen(true)}>Edit</button>
            <DeleteForeverIcon onClick={(e)=>db.collection('todos').doc(todo.id).delete()}></DeleteForeverIcon>
         </List>
           
  </>         
      

    )
}

export default Todo

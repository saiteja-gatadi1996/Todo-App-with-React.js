import React, { useEffect, useState } from 'react'
import {Button, FormControl, Input, InputLabel} from "@material-ui/core";
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from "firebase"


function App() {
  const[todos, setTodos]=useState([]);
  const[input, setInput]=useState('')

  useEffect(()=>{
    db.collection('todos').orderBy('timestamp','desc')
    .onSnapshot((snapshot)=>
    {
      //todo is the field we given in firebase
      setTodos(snapshot.docs.map((doc)=>
      ({id:doc.id, 
        todo:doc.data().todo}))
    )})
  },[])

  const addTodo=(e)=>{
    //adding our typed input to existing todos
    e.preventDefault();
    
    
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
  }
  return (
    <div className="app">
      <form>
            <FormControl>
              <InputLabel>Write a Todo</InputLabel>
              <Input value={input} onChange={(e)=>setInput(e.target.value)}/>
            </FormControl>


        <Button disabled={!input} onClick={addTodo} type="submit" variant="contained" color="primary">
        Add Todo
        </Button>  
      </form>

     <ul>
      
       {todos.map((todo)=>(
          <Todo todo={todo}/>
       ))}
     </ul>
    </div>
  );
}

export default App;

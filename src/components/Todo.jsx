import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import Todoitems from './Todoitems'

const Todo = () => {
  const [todoList, setTodoList] = useState(localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")):[]);  //need to update here too, for keeping values despite refreshing
  const inputRef = useRef();

  const add = () => {
        const inputText = inputRef.current.value.trim();
        
        if(inputText === ""){
            return null;
        }        
        const newTodo = {
            id : Date.now(),    //unique
            text : inputText,   //object
            isComplete : false  //status
        }
        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value='';
    }

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.filter((todo) => todo.id !== id)
        })
    }

    const Toggle = (id) => {
        setTodoList((prevTodos)=>{
            return prevTodos.map((todo)=>{
                if(todo.id===id){
                    return {...todo, isComplete: !todo.isComplete};
                }
                return todo;
            })
        })
    }

    useEffect(()=>{
        //console.log(todoList);
        localStorage.setItem("todos",JSON.stringify(todoList)); //need to store in string only
    },[todoList]);  //whenever todolist array gets updated, it will execute this function.
  
    return (
    
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
        
        {/*---title---*/}
        <div className='flex items-center mt-7 gap-2'>
            <img className='w-8' src={todo_icon} alt="todo_icon"></img>
            <h1 className='text-3xl font-semibold'>To-Do List</h1>
        </div>

        {/*---input box---*/}
        <div className='flex items-center my-7 bg-gray-200 rounded-full'>
            <input ref={inputRef} className='bg-transparent border-0 outline-none flex-2 h-14 px-3 placeholder-slate-600' type="text" placeholder='Add your task'/>
            <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-md cursor-pointer'>Add +</button>
        </div>

        {/*---todo list---*/}
        <div>
            {todoList.map((item,index)=> {
                return <Todoitems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} Toggle={Toggle}/>
            })
            }
        </div>
      
    </div>
  )
}

export default Todo

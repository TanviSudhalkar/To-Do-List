import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'

const Todoitems = ({text,id,isComplete,deleteTodo,Toggle}) => {
  return (
    <div className='flex items-center my-2 gap-1'>
        <div className='flex flex-1 items-center cursor-pointer'>
            <img onClick={()=>{Toggle(id)}} className='w-7' src={isComplete?tick:not_tick} alt=""></img>
        <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${isComplete?"line-through":""}`}>{text}</p>
        </div>

        <img onClick={()=>{deleteTodo(id)}} src={delete_icon} alt='' className='w-4 cursor-pointer'></img>
    </div>
  )
}

export default Todoitems

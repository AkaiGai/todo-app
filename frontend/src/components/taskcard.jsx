import React, {useState} from 'react'
import { Checkbox } from "@/components/ui/checkbox";

const TaskCard = ({task, index, onComplete, onDelete}) => {
  

  return(
    <div className='flex max-sm:flex-col justify-between sm:items-center shrink-0
    max-sm:gap-1 max-sm:px-4 max-sm:py-2
    w-full sm:h-12 gap-4 px-4
    max-sm:rounded-lg rounded-full
    bg-secondary-300
    drop-shadow-lg'>

      <div className='flex
      gap-2
      text-primary-900
      overflow-hidden'>
        <span className=''>{index}</span>
        <p className={`whitespace-nowrap 
        overflow-x-auto
        no-scrollbar
        ${task.is_completed ? 'line-through' : ''} `}>
          {task.text}
        </p>
        
      </div>

      <div className='flex max-sm:justify-end items-center 
      gap-2 z-10'>
        <Checkbox
          checked={task.is_completed}
          onCheckedChange={() => {onComplete(task.id)}}
          className="w-5 h-5 rounded-full data-[state=checked]:bg-accent-500 data-[state=checked]:border-none"
        />
        <label className={`
        px-1 py-0.5
        rounded-full
        text-xs font-extralight bg-secondary-100 text-text-muted`}>
        {task.is_completed ? 'Completed' : 'Pending'}
        </label>
        <button className='
        px-2.5 py-1
        rounded-full
        bg-primary-500 text-white font-light
        active:scale-90 transition-transform duration-150'
        onClick={() => {onDelete(task.id)}}>Delete</button>
      </div>

    </div>
  )

}

export default TaskCard;
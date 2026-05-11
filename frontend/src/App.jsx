import React, { useState, useEffect } from'react'
import TaskCard from './components/taskcard'

const App = () => {

  const backend = import.meta.env.VITE_BACKEND

  const [input, setInput] = useState('');
  const [tasks, setTask] = useState([]);

  const handleGetTask = async () => {
    const response = await fetch(`${backend}/get-task/`, {
      method:'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    });
    
    if(response.ok){
      const data = await response.json();
      setTask(data);
    }
  };

  useEffect(() => {
    handleGetTask();
  }, []);

  const handleAddTask = async () => {
    if(input.trim() === "") return;
    const newTask = {
      text: input,
      is_completed: false
    }

    const response = await fetch(`${backend}/add-task/`, {
      body: JSON.stringify(newTask),
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data.data);
    setTask([...tasks, data.data]);
    setInput("");
  };

  const handleComplete = async (id) => {

    const task = tasks.find((t) => t.id === id);

    const response = await fetch(`${backend}/update-task/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify({is_completed: !task.is_completed}),
      headers: {'Content-Type': 'application/json'}
    });
   
    if(response.ok)
      setTask(tasks.map((t) => {
        if(t.id === id){
          return {
            ...t,
            is_completed: !t.is_completed
          }
        }
        return t;
      }));

  };

  const handleDelete = async (id) => {

    const response = await fetch(`${backend}/remove-task/${id}/`, {
      method: 'DELETE',
    });

    if(response.ok)
      setTask(tasks.filter((task) => task.id !== id));
  };

  return(
    <section className="h-dvh min-w-full
    flex justify-center items-center
    bg-neutral-900">

      <div className="flex flex-col justify-start items-center
      w-[90vw] max-w-xl min-h-[50vh] max-h-[75vh]
      max-sm:gap-4 gap-12
      max-sm:px-6 max-sm:py-6 px-12 py-12  
      rounded-2xl
      bg-secondary-700">

        <form className="flex
        max-sm:gap-2 gap-4 
        w-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTask();
        }}>
        <input className="max-sm:w-50 flex-1 h-12
        max-sm:px-4 max-sm:py-2 p-4
        rounded-full
        bg-white text-text-primary
        border-none outline-none
        drop-shadow-lg"
        placeholder='Enter task...'
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}/>

        <button className='max-sm:flex-1 max-sm:max-w-28 w-32 h-12
        rounded-full
        bg-accent-500 text-white
        drop-shadow-lg
        active:scale-95 duration-150 transition-all'
        type='submit'>Add Task</button>
        </form>
        
        <div className="flex flex-col gap-4
        w-full h-[50vh]
        p-4
        rounded-2xl
      bg-secondary-500
        overflow-y-auto
        no-scrollbar-2">

        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            index={index + 1}
            onComplete={handleComplete}
            onDelete={handleDelete}
          />
        ))}

        </div>
        
      </div>

    </section>
  )
}

export default App;
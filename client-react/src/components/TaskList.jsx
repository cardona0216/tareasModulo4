import { useEffect, useState } from "react"
import {  getAllTasks } from "../api/tasks.api";
import { TaskCard } from "./TaskCard";


export function TaskList() {

   const [ tasks, setTasks] = useState([])

   useEffect(() => {
    async function loadTasks() {
        try {
            const res = await getAllTasks();
            setTasks(res.data);  // Guardar las tareas en el estado
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    }

    loadTasks();
}, []);
  return (
    <div style={{color: 'white'}} className="grid grid-cols-3 gap-3">
      {
          tasks.map((task) => (
            <TaskCard key={task.id} task={task}/>
          ))
      }
    </div>
  )
}



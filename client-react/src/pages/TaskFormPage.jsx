import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { createTask, deleteTasks, updateTask , getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import '../styles/Formulario.css'

export function TasksFormPage() {

  const {register,handleSubmit, formState:{
    errors},
    setValue
  
  } = useForm()

  const navigate = useNavigate()
  const params = useParams()
  console.log(params);
  

  const onSubmit = handleSubmit(async data => {
   if (params.id) {
   await updateTask(params.id , data)
   toast.success('tarea actualizada', {
    position:'top-center',
    style:{
      background: 'red',
      color:'white'
    }
  })
   }else{
    await createTask(data)
    toast.success('tarea creada', {
      position:'bottom-right',
      style:{
        background: 'red',
        color:'white'
      }
    })
  }
    navigate('/tasks')
  
  })

useEffect(() => {

 async function loadTask() {
    if (params.id) {
      console.log(params.id);
      
      console.log('obteniendo datos');
      const res = await getTask(params.id);
      console.log(res);
      
      setValue('titulo', res.titulo);
      setValue('description', res.description);
      
    }
  }
  loadTask()
}, [])
    return (
      <div className=" formulario flex-1 p-4">
        <form onSubmit={onSubmit}>
          <input style={{color:'black'}} type="text" placeholder="titulo"
           className="border p-2 w-full mb-2"
            {...register('titulo', {required:true})} 
            />
            {errors.titulo && <span>este campo es requerio</span>}
          <textarea 
           className="border p-2 w-full mb-2"
          style={{color:'black'}}
          rows='3' 
          placeholder="Description"
          {...register('description', {required:true})} 
          ></textarea>
          {errors.description && <span>este campo es requerio</span>}
          <button  className="bg-blue-500 text-white p-2 rounded" > Save</button>
        </form>
        {
          params.id &&  <button onClick={async() =>{
           const acepto = window.confirm('estas seguro de eliminar!')
           if (acepto) {
            await deleteTasks(params.id)
            navigate('/tasks')
            toast.success('tarea eliminada', {
              position:'bottom-right',
              style:{
                background: 'red',
                color:'white'
              }
            })
           }
          }}  className="bg-red-500 text-white p-2 rounded mt-2" >delete</button>
        }
      </div>
    )
  }
import { useEffect, useState } from "react";
import { getAllTasks, updateTaskStatus } from "../api/tasks.api";
import { TaskCard } from "./TaskCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      try {
        const res = await getAllTasks();
        console.log("Tareas obtenidas:", res.data); // Verificar que las tareas se obtienen correctamente
        setTasks(res.data);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }

    loadTasks();
  }, []);

  const groupTasksByStatus = () => {
    return tasks.reduce((acc, task) => {
      if (!acc[task.estado]) {
        acc[task.estado] = [];
      }
      acc[task.estado].push(task);
      return acc;
    }, {});
  };

  const tasksByStatus = groupTasksByStatus();
  console.log("Tareas agrupadas por estado:", tasksByStatus); // Verificar el agrupamiento de tareas

  const onDragEnd = async (result) => {
    console.log("Resultado de arrastre:", result); // Verificar el resultado del evento de arrastre
    if (!result.destination) {
      console.log("No hay destino, cancelando arrastre");
      return; 
    }
  
    const { source, destination } = result;
    console.log("Origen:", source);
    console.log("Destino:", destination);
  
    const movedTask = tasks[source.index];
    console.log("Tarea movida:", movedTask);
  
    if (destination.droppableId !== source.droppableId) {
      movedTask.estado = destination.droppableId;
  
      const updatedData = {
        titulo: movedTask.titulo,
        description: movedTask.description || '',
        estado: movedTask.estado,
        prioridad: movedTask.prioridad || 'media',
        fecha_vencimiento: movedTask.fecha_vencimiento || null,
      };
  
      try {
        await updateTaskStatus(movedTask.id, updatedData);
        setTasks((prevTasks) => {
          const updatedTasks = prevTasks.map((task) =>
            task.id === movedTask.id ? movedTask : task
          );
          console.log("Estado de tareas actualizado:", updatedTasks);
          return updatedTasks;
        });
        console.log("Tarea actualizada correctamente");
      } catch (error) {
        console.error("Error actualizando el estado de la tarea:", error);
      }
    }
  };
  
  
  // const statuses = ["pendiente", "en_progreso", "completada"];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="flex justify-around">
      {/* Columna de tareas pendientes */}
      <Droppable droppableId="pendiente">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-gray-300 p-4 rounded-lg w-1/3"
          >
            <h2 className="text-xl font-bold mb-2">Pendiente</h2>
            {tasksByStatus["pendiente"]?.length > 0 ? (
              tasksByStatus["pendiente"].map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-2"
                    >
                      <TaskCard task={task} />
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <div className="text-gray-500">No hay tareas en esta columna</div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
  
      {/* Columna de tareas en progreso */}
      <Droppable droppableId="en_progreso">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-gray-300 p-4 rounded-lg w-1/3"
          >
            <h2 className="text-xl font-bold mb-2">En Progreso</h2>
            {tasksByStatus["en_progreso"]?.length > 0 ? (
              tasksByStatus["en_progreso"].map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-2"
                    >
                      <TaskCard task={task} />
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <div className="text-gray-500">No hay tareas en esta columna</div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
  
      {/* Columna de tareas completadas */}
      <Droppable droppableId="completada">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-gray-300 p-4 rounded-lg w-1/3"
          >
            <h2 className="text-xl font-bold mb-2">Completada</h2>
            {tasksByStatus["completada"]?.length > 0 ? (
              tasksByStatus["completada"].map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-2"
                    >
                      <TaskCard task={task} />
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <div className="text-gray-500">No hay tareas en esta columna</div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  </DragDropContext>
  
  );
}

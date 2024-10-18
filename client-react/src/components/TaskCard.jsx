import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
export function TaskCard({ task }) {
  const navigate = useNavigate();

  const statusStyles = {
    pendiente: "bg-blue-700",
    en_progreso: "bg-yellow-600",
    completada: "bg-green-600",
  };

  console.log("Task en TaskCard:", task); // Añade este log para depurar

  return (
    <div
      onClick={() => navigate(`/tasks/${task.id}`)}
      className={`shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer ${statusStyles[task.estado]}`}
    >
      <hr className="mb-4" />
      <h1 className="text-xl font-bold mb-2 text-white">Título: {task.titulo}</h1>
      <p className="text-gray-300 mb-4">Descripción: {task.description}</p>
      <p className="text-gray-200">Estado: {task.estado}</p>
      <hr className="mt-4" />
    </div>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    estado: PropTypes.string.isRequired, // Asegúrate de que 'estado' está en el modelo
  }).isRequired,
};

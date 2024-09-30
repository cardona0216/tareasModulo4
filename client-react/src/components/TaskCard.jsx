
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

export function TaskCard({ task }) {

  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/tasks/${task.id}`)}
      className="bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      >
      <hr className="mb-4" />
      <h1 className="text-xl font-bold mb-2 text-white">Título: {task.titulo}</h1>
      <p className="text-gray-300 mb-4">Descripción: {task.description}</p>
      <hr className="mt-4" />
    </div>

  )
}

TaskCard.propTypes = {
    task: PropTypes.shape({
      id: PropTypes.number.isRequired,
      titulo: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  };



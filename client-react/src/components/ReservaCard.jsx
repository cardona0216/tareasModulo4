
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import { deleteReserva } from '../api/reservaApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



// eslint-disable-next-line react/prop-types
export function ReservaCard({ reserva, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate(); // Inicializa el hook para navegación

  const handleEdit = () => {
    setIsEditing(!isEditing); // Cambia entre el estado de edición y vista normal
    navigate(`/reservas/editar/${reserva.id}`);
  };
  
  const handleDelete = async () => {

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    // const acepto = window.confirm('estas seguro de eliminar!')
    if (result.isConfirmed) {
      
      try {
        await deleteReserva(reserva.id);
        
        if (onDelete) onDelete();
        Swal.fire(
          'Eliminado!',
          'La reserva ha sido eliminada.',
          'success'
        );
        
      } catch (error) {
        console.error("Error al eliminar la reserva", error);
        Swal.fire(
          'Error!',
          'Hubo un problema al eliminar la reserva.',
          'error'
        );
      }
    };
    }
  
    return (
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 text-white">
         
           <h1 style={{textAlign:'center'}}><strong style={{color:'purple', fontSize:'30px'}} >Cancha Reservada</strong> </h1> 
        {/* <h2 className="text-2xl font-bold mb-4">Reserva de cancha {reserva.cancha.nombre}</h2> */}
        <p className="text-gray-300 mb-2">Fecha: {reserva.fecha_reserva}</p>
        <p className="text-gray-300 mb-2">Hora: {reserva.hora_reserva}</p>
        <p className="text-gray-300 mb-2">Cancha: {reserva.cancha_detalle.nombre}</p>
        <p className="text-gray-300 mb-4">Ubicación: {reserva.cancha_detalle.ubicacion}</p>
        <p className="text-gray-300 mb-4">Reservado por: {reserva.usuario}</p>
        <div className="flex space-x-4">
          <button
           onClick={handleEdit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar Reserva
          </button>
        </div>
      </div>
      
    );
  }

  ReservaCard.propTypes = {
    canchaId: PropTypes.number.isRequired,
    reserva: PropTypes.shape({
       id: PropTypes.number.isRequired, // Agrega la validación del campo id aquí
        fecha_reserva: PropTypes.string.isRequired,
        hora_reserva: PropTypes.string.isRequired,
        cancha_detalle: PropTypes.shape({
            nombre: PropTypes.string.isRequired,
            ubicacion: PropTypes.string.isRequired,
        }).isRequired,
        usuario: PropTypes.string.isRequired,  // o PropTypes.shape() si el usuario es un objeto
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};


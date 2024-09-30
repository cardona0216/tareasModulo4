import { useState, useEffect } from 'react';
import { getReservaById, updateReserva } from '../api/reservaApi';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export function ReservaEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fechaReserva, setFechaReserva] = useState('');
  const [horaReserva, setHoraReserva] = useState('');
  const [cancha, setCancha] = useState('');
  const [loading, setLoading] = useState(true);
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
   
    const fetchReserva = async () => {
     
      try {
        const response = await getReservaById(id);
        const data = response.data;
        setFechaReserva(data.fecha_reserva);
        setHoraReserva(data.hora_reserva);
        setCancha(data.cancha);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la reserva:', error);
      }
    };

    fetchReserva();
     // Establecer la fecha mínima a la fecha actual
     const today = new Date().toISOString().split('T')[0];
     setMinDate(today);
    
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
    
      await updateReserva(id, {
        fecha_reserva: fechaReserva,
        hora_reserva: horaReserva,
        cancha: cancha  // Enviar el ID de la cancha
      });
    
      await Swal.fire({
        title: '¡Éxito!',
        text: 'Reserva actualizada correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      navigate('/reserva');
      
    } catch (error) {
      console.error('Error al actualizar la reservaggg:', error);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <form onSubmit={handleSave} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg" style={{marginTop:'80px'}}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Fecha de Reserva:</label>
        <input
          type="date"
          value={fechaReserva}
          onChange={(e) => setFechaReserva(e.target.value)}
          required 
          min={minDate} // Establecer la fecha mínima aquí
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        /> 
      </div>
      <div className='mb-4'>
          <label className="block text-gray-700 text-sm font-bold mb-2">Hora de Reserva:</label>
        <span><strong>Reservada a las:</strong> </span>
          <input type="text"
          value={horaReserva}
          onChange={(e) => setHoraReserva(e.target.value)}
           /> 
          <select 
              value={horaReserva} 
              onChange={(e) => setHoraReserva(e.target.value)} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={fechaReserva}>selecione una hora</option>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
              <option value="18:00">18:00</option>
              <option value="19:00">19:00</option>
              <option value="20:00">20:00</option>
              <option value="21:00">21:00</option>
              <option value="22:00">22:00</option>
            </select>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Guardar
      </button>
    </form>
  );
}

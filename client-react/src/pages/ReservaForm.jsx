
import axios from 'axios';
import {useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function ReservaForm({canchaId}) {
    const [fechaReserva, setFechaReserva] = useState('');
    const [horaReserva, setHoraReserva] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
      // Establece la fecha mínima en el campo de fecha
      console.log("Cancha ID:", canchaId); // Agrega este log para verificar el ID
      const today = new Date().toISOString().split('T')[0];
      document.getElementById("fechaReserva").setAttribute("min", today);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Obtén el token de donde lo guardaste
      
        try {
         const response =  await axios.post('http://localhost:8000/reserva/api/v1/reserva/', {
            cancha: canchaId,
            fecha_reserva: fechaReserva,
            hora_reserva: horaReserva,
            
        }, {
            headers: {
                'Authorization': `Token ${token}` // Incluye el token en la cabecera
            }
        });
        console.log(response.data);
          setSuccess(true);
          navigate('/reserva')
          setError(null); // Limpia el error si la solicitud es exitosa
        } catch (error) {
            const errorMessage = error.response?.data?.detail || 'Error desconocido';
            setError(errorMessage);
        }
      };
      return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
           <h2 className="text-2xl font-semibold mb-6 text-center">Reservar Cancha

            
           </h2>
           <div className="mb-4">
           <label className="block text-gray-700 text-sm font-bold mb-2">Fecha de Reserva:</label>
            <input 
              type="date" 
              id="fechaReserva"
              value={fechaReserva} 
              onChange={(e) => setFechaReserva(e.target.value)} 
             
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            
            />
          </div>
          <div className='mb-4'>
          <label className="block text-gray-700 text-sm font-bold mb-2">Hora de Reserva:</label>
          <select 
              value={horaReserva} 
              onChange={(e) => setHoraReserva(e.target.value)} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="----">selecione una hora</option>
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
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          
          >Reservar</button>
          {error && <p className="mt-4 text-red-500 text-center">Error: {error}</p>}
          {success && <p className="mt-4 text-green-500 text-center">Reserva realizada con éxito!</p>}
        </form>
      );
}

ReservaForm.propTypes = {
    canchaId: PropTypes.number.isRequired, // o PropTypes.string si el ID es una cadena
  };

export default ReservaForm

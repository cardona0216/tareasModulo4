

import { useEffect, useState } from 'react';
import { getAllReservas } from '../api/reservaApi'; // Asegúrate de tener esta función configurada
import { ReservaCard } from './ReservaCard';

import '../styles/ListaTasks.css'

export function ListaReservas() {
  const [reservas, setReservas] = useState([]);

  const fetchReservas = async () => {
    const response = await getAllReservas();
    console.log('mis reservas', response);
    
    setReservas(response.data);
  };
  useEffect(() => {
    fetchReservas();
    
  }, []);

   // Función para manejar la eliminación de una reserva
   const handleDelete = () => {
    fetchReservas(); // Vuelve a obtener las reservas después de eliminar una
  };

  return (
    <div style={{ marginTop:'70px'}}>
        <h1 className='titulo-reservas'>Mis Reservas</h1>
        <div style={{color: 'white', marginTop:'10px'}} className="grid grid-cols-3 gap-3 lista" >
          {
            reservas.map((reserva) => (
              
              <ReservaCard key={reserva.id} reserva={reserva} canchaId={reserva.cancha} onDelete={handleDelete} />
            ))
            
          }
        
        </div>
    </div>
  );
}


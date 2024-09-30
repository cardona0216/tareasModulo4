import { useState, useEffect } from 'react';
import { getReservaById } from '../api/reservaApi'; // Asegúrate de tener esta función configurada
import { ReservaEditForm } from './ReservaEditForm';
import { useParams } from 'react-router-dom';

export function ReservaEditPage() {
  const { id } = useParams(); // Obtiene el id de la URL
  console.log(id);
  
  const [reserva, setReserva] = useState(null); // Estado inicial nulo
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await getReservaById(id);
        console.log('Reserva obtenida:', response.data);
        setReserva(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la reserva', error);
      }
    };

    fetchReserva();
  }, [id]);

  const handleSave = () => {
    // Puedes definir aquí la lógica de actualización después de guardar
  };

  if (loading) return <div>Cargando...</div>;

  return reserva ? (
    <ReservaEditForm reserva={reserva} onSave={handleSave} />
  ) : (
    <div>No se encontró la reserva.</div>
  );
}

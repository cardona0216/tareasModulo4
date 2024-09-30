



// Reservas.jsx

import Card from './Card';  // Asegúrate de que la ruta sea correcta

function Reservas() {
  const handleReserve = (title) => {
    alert(`Reserva realizada para: ${title}`);
  };

  return (
    <div>
      <br  style={{background:'blue'}}/>
      <h1>Desde las reservas</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Card 
          title="Cancha 1" 
          description="Descripción de la cancha 1" 
          onReserve={() => handleReserve('Cancha 1')}
        />
        <Card 
          title="Cancha 2" 
          description="Descripción de la cancha 2" 
          onReserve={() => handleReserve('Cancha 2')}
        />
        <Card 
          title="Cancha 3" 
          description="Descripción de la cancha 3" 
          onReserve={() => handleReserve('Cancha 3')}
        />
        <Card 
          title="Cancha 3" 
          description="Descripción de la cancha 3" 
          onReserve={() => handleReserve('Cancha 3')}
        />
        {/* Agrega más tarjetas según sea necesario */}
      </div>
    </div>
  );
}

export default Reservas;



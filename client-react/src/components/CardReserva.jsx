import PropTypes from 'prop-types';
import '../styles/Card.css';

 export function CardReserva({canchaNombre, fechaReserva, horaReserva}) {
  return (
   
    <div className="card" style={{ marginTop: '100px' }}>
      <h2 className="card-title">Reserva de {canchaNombre}</h2>
      <p className="card-description">Fecha: {fechaReserva}</p>
      <p className="card-description">Hora: {horaReserva}</p>
      {/* <div className="card-buttons">
        <button className="card-button" onClick={onEdit}>Editar</button>
        <button className="card-button" onClick={onCancel}>Cancelar</button>
      </div> */}
    </div>
   
  )
}

CardReserva.propTypes = {
    canchaNombre: PropTypes.string.isRequired,
    fechaReserva: PropTypes.string.isRequired,
    horaReserva: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
  };



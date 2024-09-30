
// Card.jsx
import PropTypes from 'prop-types';
import './Card.css';

function Card({ title, description, onReserve }) {
  return (
    <div className="card" style={{marginTop:'100px'}}>
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
      <button className="card-button" onClick={onReserve}>Reservar</button>
    </div>
  );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onReserve: PropTypes.func.isRequired,
  };

export default Card;

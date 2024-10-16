
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navigation.css'
import '../styles/EditPerfil.css'
import { useEffect, useRef, useState } from 'react';

export function Navigation({ handleLogout , user }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const closeDropdown = () => setIsOpen(false);
  const navigate = useNavigate(); // Llama a useNavigate dentro del componente
  const logout = () => {
    handleLogout();  // Llama a la función pasada como prop
    navigate('/login'); // Redirige al usuario a la página de login
    localStorage.removeItem('accessToken');

  };
    // Cierra el desplegable al hacer clic fuera de él
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          closeDropdown();
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    

  return (
    <nav className="sidebar">
      <h1 className="sidebar-title">Reserva de Cancha</h1>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <Link to="/cancha" className="sidebar-link">Reservar</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/reserva" className="sidebar-link">Mis reservas</Link>
        </li>
         <li className="sidebar-item">
          <Link to="/tasks" className="sidebar-link">Mis Tareas App</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/tasks-create" className="sidebar-link">Crear Tarea</Link>
        </li> 
        <li className="sidebar-item">
          <button onClick={logout} className="sidebar-link">Cerrar sesión</button>
        </li>
        {user && (
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              {user}
            </button>
            {isOpen && (
             <ul className="dropdown-menu absolute right-0 mt-2 max-w-screen-sm bg-white shadow-lg rounded-lg border border-gray-200 z-10">
                <li>
                  <Link to="/edit-profile" onClick={() => { closeDropdown(); }} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Editar Perfil</Link>
                </li>
                <li>
                  <button onClick={() => { logout(); closeDropdown(); }} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Cerrar Sesión</button>
                </li>
              </ul>
            )}
          </li>
        )}
    </ul>
  </nav>
  );
}

// Define la validación de prop-types
Navigation.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.string,
};

export default Navigation;

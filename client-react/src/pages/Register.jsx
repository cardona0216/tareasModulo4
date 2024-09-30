
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/authApi';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();  // Inicializa el hook useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await register({
        username,
        email,
        password,
        password2,
        is_superuser: true
      })
      // const response = await axios.post('http://localhost:8000/register/', {
      //   username,
      //   email,
      //   password,
      //   password2,
      //   is_superuser: true // Para asegurarte de que el usuario se crea con permisos de superusuario
      // });
      setSuccess('Registro exitoso.');
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 500);  // Redirige después de 2 segundos para mostrar el mensaje de éxito
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        const { username: usernameErrors, email: emailErrors } = error.response.data;
        
        let errorMessage = '';

        // Verificar y agregar errores de username
        if (usernameErrors && usernameErrors.length > 0) {
          errorMessage += usernameErrors[0] + ' ';
        }

        // Verificar y agregar errores de email
        if (emailErrors && emailErrors.length > 0) {
          errorMessage += emailErrors[0] + ' ';
        }

        // Establecer el mensaje de error
        setError(errorMessage.trim() || 'Ocurrió un error.');
        setSuccess('');
      } else {
        setError('An error occurred');
      }
      // console.error(error.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
         
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Register
          </button>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
        </form>
       
        {success && <p className="text-green-500 text-sm mt-4">{success}</p>}
      </div>
    </div>
  );
};

export default Register;

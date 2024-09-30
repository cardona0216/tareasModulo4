import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate,  useNavigate } from 'react-router-dom';
import { TasksPage } from './pages/TasksPage';
import { TasksFormPage } from './pages/TaskFormPage';
import { Navigation } from './components/Navigation';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import { getUserProfile } from './api/profileApi';
import CanchasList from './components/CanchasList';
import { ListaReservas } from './components/ListaReservas';
import EditProfile from './components/EditProfile';
import { ReservaEditForm } from './components/ReservaEditForm';




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // el que esta loguedo
  const [ user , setUser] = useState( {});
  const [loading, setLoading] = useState(true); // Para manejar la pantalla de carga
  const navigate = useNavigate(); // Hook para redirigir al login

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        setIsAuthenticated(true);
        getUserProfile(token).then((userData) => {
          console.log('este es el user',userData);
          
          setUser(userData)
        })
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login'); // Redirigir al login después de cerrar sesión
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {isAuthenticated && <Navigation handleLogout={handleLogout} user={user?.username}  />}
      <main className="flex-grow bg-purple-500 bg-opacity-100 bg-cover bg-center" style={{ backgroundImage: "url('src/assets/cancha.jpg')" }}>
        <Routes>
          <Route path='/' element={isAuthenticated ? <Navigate to='/cancha' /> : <Navigate to='/login'/>}/>
          <Route path='/login' element={isAuthenticated ? <Navigate to='/cancha' /> : <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />}/>
          <Route path='/register' element={<Register />}/>
          {/* <Route path="/reserva/:canchaId" element={<ReservaForm />} /> Ruta para el formulario de reserva */}
          <Route path='/cancha' element={isAuthenticated ? <CanchasList />: <Navigate to='/login'/>}/>
          <Route path='/edit-profile' element={isAuthenticated ? <EditProfile /> : <Navigate to='/login' />} />
          <Route path="/reservas/editar/:id" element={<ReservaEditForm />} />
          <Route path='/reserva' element={isAuthenticated ? <ListaReservas /> : <Navigate to='/login' />}/>
          <Route path='/tasks' element={isAuthenticated ? <TasksPage /> : <Navigate to='/login' />}/>
          <Route path='/tasks-create' element={isAuthenticated ? <TasksFormPage /> : <Navigate to='/login' />}/>
          <Route path='/tasks/:id' element={isAuthenticated ? <TasksFormPage /> : <Navigate to='/login' />}/>
        </Routes>
      </main>
      <Toaster />
    </div>
  );
}

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

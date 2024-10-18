
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../api/profileApi'; // Asegúrate de definir esta función en tu archivo de API
import { useEffect, useState } from 'react';

function EditProfile() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
//   const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const userData = await getUserProfile(token);
        if (userData) {
        //   setUser(userData);
          setValue('username', userData.username);
          setValue('email', userData.email);
        } else {
          console.error('Failed to fetch user profile');
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        await updateUserProfile(token, data);
        navigate('/cancha'); // Redirigir al perfil después de actualizar
      } catch (error) {
        console.error('Failed to update user profile', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-20 p-6 bg-white rounded-lg shadow-md max-w-lg">
    <h1 className="text-2xl font-bold mb-6 text-center">Editar Perfil</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuario</label>
        <input
          id="username"
          type="text"
          {...register('username', { required: 'Username is required' })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>
      <div className="flex justify-center">
        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Guardar cambios
        </button>
      </div>
    </form>
  </div>
  
  );
}

export default EditProfile;

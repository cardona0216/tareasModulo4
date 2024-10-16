import axios from "axios";

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get('http://localhost:8000/profile/', {
      headers: {
        Authorization: `Bearer ${token}`, // Asegúrate de que "Bearer" esté seguido de un espacio y el token.
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error.response ? error.response.data : error.message);
    return null;
  }
};

 export const updateUserProfile = async (token, data) => {
    try {
      const response = await axios.put('http://localhost:8000/profile', data, {
        headers: {
         Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('API call error:', error.response ? error.response.data : error.message);
      throw new Error('Failed to update user profile');
    }
  };
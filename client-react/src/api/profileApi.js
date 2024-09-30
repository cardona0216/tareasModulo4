import axios from "axios";

export const getUserProfile = async (token) => {
    try {
      const response = await axios.post('http://localhost:8000/profile/', {}, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

 export const updateUserProfile = async (token, data) => {
    try {
      const response = await axios.put('http://localhost:8000/profile/', data, {
        headers: {
         Authorization: `Token ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('API call error:', error.response ? error.response.data : error.message);
      throw new Error('Failed to update user profile');
    }
  };
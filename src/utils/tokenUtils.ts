import axios from 'axios';

export const getNewAccessToken = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/refresh-token', {}, {
      withCredentials: true
    });

    document.cookie = `token=${res.data.token}; path=/`;
    return res.data.token;
  } catch (err) {
    window.location.href = '/login';
    return null;
  }
};
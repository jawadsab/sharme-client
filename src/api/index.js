import axios from 'axios';
// http://localhost:8000
const BASE_URL = 'https://shareme-server.herokuapp.com/';
const client = axios.create({ baseURL: BASE_URL });

export const request = ({ ...options }) => {
  const auth = localStorage.getItem('auth');
  if (auth) {
    const { token } = JSON.parse(auth);
    console.log("Tokken",token)
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    console.log("Yeahhh")
    delete client.defaults.headers.common["Authorization"]; 
  }
  const onSuccess = (response) => {
    console.log(response);
    return response;
  };
  const onError = (error) => {
    console.log(error)
    throw error;
  };

  return client(options).then(onSuccess).catch(onError);
};

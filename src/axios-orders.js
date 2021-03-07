import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-builder-fb123-default-rtdb.firebaseio.com/'
});

export default instance;
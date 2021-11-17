import axios from 'axios';

const journalApi = axios.create({
  baseURL: 'https://vue-demos-54c84-default-rtdb.firebaseio.com',
});

export default journalApi;
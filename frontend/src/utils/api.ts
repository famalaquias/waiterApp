import axios from 'axios';

// create: função que recebe um ojeto;
// esse objeto vai conter uma propriedade chamada baseURL;
// baseURL: é o começo de todas as requests, para não precisar ficar repetindo sempre;
export const api = axios.create({
  baseURL: 'http://10.0.0.175:3001',
});

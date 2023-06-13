import axios from 'axios';

const CancelToken = axios.CancelToken;

const api = axios.create({
  baseURL: 'http://############/########/#######/1.1'
});

const apiProject = axios.create({
  baseURL: 'http://###########/#########/Api'
});

export { CancelToken, api, apiProject };

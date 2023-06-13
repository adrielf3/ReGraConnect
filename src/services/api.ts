import axios from 'axios';

const CancelToken = axios.CancelToken;

const api = axios.create({
  baseURL: 'http://gruporegra.com.br/compartilhado/webApi/teste/1.1'
});

const apiProject = axios.create({
  baseURL: 'http://gruporegra.com.br/projetos/webApi'
});

export { CancelToken, api, apiProject };
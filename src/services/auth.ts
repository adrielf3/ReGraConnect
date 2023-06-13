import { Alert } from 'react-native';
import { CancelToken, api } from './api';
import base64 from 'react-native-base64';
import { hashApi } from './hash';

interface User {
  Id: number,
  IdEmpresaPadrao: number,
  Cracha: number,
  CPF: string,
  NomeCompleto: string,
  Apelido: string,
  Departamento: string,
  Funcao: string,
  Tipo: string,
  Nivel: number,
  Dt_Nascimento: string,
  Dt_Contrato: string,
  Telefone: number,
  Email: string,
  EmailPessoal: string,
  Id_Grupo: number,
  Foto: string,
  Status: string
}

interface Response {
  user: User | null
}

export function signIn(cpf: string, password: string, tokenFirebase: string): Promise<Response> {

  return new Promise(async (resolve) => {

    try {

      const hashData = await hashApi()

      const source = CancelToken.source();
      const cpfRemoveCharacter = cpf.replace(/([\u0300-\u036f]|[^0-9a-zA-Z]|[R])/g, '');

      const params = new FormData();
      params.append('cpf', base64.encode(cpfRemoveCharacter));
      params.append('senha', base64.encode(password));
      params.append('tokenFirebase', base64.encode(tokenFirebase));
      params.append('token', hashData);

      await api
        .post('/auth.php', params, {
          cancelToken: source.token,
          timeout: 30000
        })
        .then((response) => {
          setTimeout(() => {
            resolve({
              user: response.data
            });
          }, 2000);
        })
        .catch((error) => {

          setTimeout(() => {

            const response = error.toJSON()
            if (response.message === 'timeout of 30000ms exceeded') {
              Alert.alert('Não foi possível conectar', 'Verifique se você está conectado ao Wi-Fi ou à sua rede do celular.')
            } else {
              switch (response.status) {
                case 400:
                  // Parametro incorreto.
                  Alert.alert('', 'Falha na solicitação com o código de erro 400.')
                  break;
                case 401:
                  // Token invalido.
                  Alert.alert('', 'Falha na solicitação com o código de erro 401.')
                  break;
                case 404:
                  Alert.alert('', 'Usuário inválido.')
                  break;
                case 403:
                  Alert.alert('', 'Usuário inativo.')
                  break;

                default:
                  Alert.alert('', 'Falha na solicitação com o código de erro 500.')
                  break;
              }
            }

            resolve({
              user: null
            });

          }, 2000);

        });

    } catch (error) {

      setTimeout(() => {

        Alert.alert('', 'Falha na solicitação com o código de erro 501.')

        resolve({
          user: null
        });
      }, 2000);

    }

  });
}
import { Alert } from 'react-native';
import { CancelToken, api } from '../api';
import base64 from 'react-native-base64';
import { hashApi } from '../hash';

export function salusSave(empresa: number | any, idUser: number | any, idTarget: number | any, officeId: number | any, requestPromax: string | any, data: object | any) {

  interface T {
    data: number | null;
  }

  return new Promise<T>(async (resolve) => {

    try {

      const hashData = await hashApi();
      const source = CancelToken.source();

      const params = new FormData();
      params.append('empresa', base64.encode(String(empresa)));
      params.append('idUser', base64.encode(String(idUser)));
      params.append('idTarget', base64.encode(String(idTarget)));
      params.append('officeId', base64.encode(String(officeId)));
      params.append('requestPromax', base64.encode(String(requestPromax ? requestPromax.replace(/\s/g, "") : null)));
      params.append('data', JSON.stringify(data))
      params.append('token', hashData);

      await api
        .post('/salusSave.php', params, {
          cancelToken: source.token,
          timeout: 30000
        })
        .then((response) => {
          resolve({
            data: response.data
          });
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
                  // Resultado vazio
                  Alert.alert('', 'Falha na solicitação com o código de erro 404.')
                  break;

                default:
                  Alert.alert('', 'Falha na solicitação com o código de erro 500.')
                  break;
              }
            }

            resolve({
              data: null
            });

          }, 2000);

        });

    } catch (error) {

      setTimeout(() => {

        Alert.alert('', 'Falha na solicitação com o código de erro 501.')

        resolve({
          data: null
        });
      }, 2000);

    }

  });
}
import { Alert } from 'react-native';
import { CancelToken, api } from '../api';
import base64 from 'react-native-base64';
import { hashApi } from '../hash';

export function scoreLike(userId: number | any, idPub: number | any, statusInfo: number | any, origem: string | any) {

  interface T {
    data: number | null;
  }

  return new Promise<T>(async (resolve) => {

    try {

      const hashData = await hashApi();
      const source = CancelToken.source();

      const params = new FormData();
      params.append('idUser', base64.encode(String(userId)));
      params.append('idDestaque', base64.encode(String(idPub)));
      params.append('operacao', base64.encode(String(statusInfo)));
      params.append('origem', base64.encode(String(origem)));
      params.append('token', hashData);

      await api
        .post('/score/scoreLike.php', params, {
          cancelToken: source.token,
          timeout: 30000,
          headers: { "Content-Type": "Content-Type: application/json" }
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
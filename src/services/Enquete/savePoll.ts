import { Alert } from 'react-native';
import { CancelToken, api } from '../api';
import base64 from 'react-native-base64';
import { hashApi } from '../hash';

export function savePoll(idEmpresa: number, idUsuario: number, enquete: string, opcoes: object) {

  interface T {
    data: boolean;
  }

  return new Promise<T>(async (resolve) => {

    try {

      const hashData = await hashApi();
      const source = CancelToken.source();

      const params = new FormData();
      params.append('idEmpresa', base64.encode(String(idEmpresa)));
      params.append('idUsuario', base64.encode(String(idUsuario)));
      params.append('enquete', base64.encode(String(enquete)));
      params.append('opcoes', JSON.stringify(opcoes));
      params.append('token', hashData);

      await api
        .post('/enquete/savePoll.php', params, {
          cancelToken: source.token,
          timeout: 30000
        })
        .then(() => {

          resolve({
            data: true
          });

        })
        .catch((error) => {

          const response = error.toJSON();

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
            data: false
          });

        });

    } catch (error) {

      Alert.alert('', 'Falha na solicitação com o código de erro 501.')

      resolve({
        data: false
      });

    }

  });
}
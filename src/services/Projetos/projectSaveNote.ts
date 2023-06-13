import { Alert } from 'react-native';
import { CancelToken, apiProject } from '../api';
import base64 from 'react-native-base64';
import { hashApi } from '../hash';

export function projectSaveNote(idPersona: number | any, idProjeto: number | any, descricao: string | any, tipo: string | any) {

  interface T {
    data: number | null;
  }

  return new Promise<T>(async (resolve) => {

    try {

      const hashData = await hashApi();
      const source = CancelToken.source();

      await apiProject
        .get('/salve_interaction.php', {
          params: {
            idPersona: base64.encode(String(idPersona)),
            idProjeto: base64.encode(String(idProjeto)),
            descricao: descricao,
            tipo: base64.encode(String(tipo)),
            token: hashData,
          },
          cancelToken: source.token,
          timeout: 30000
        })
        .then((response) => {

          resolve({
            data: response.data
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
            data: null
          });

        });

    } catch (error) {

      Alert.alert('', 'Falha na solicitação com o código de erro 501.')

      resolve({
        data: null
      });

    }

  });
}
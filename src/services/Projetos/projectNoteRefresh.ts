import { Alert } from 'react-native';
import { CancelToken, apiProject } from '../api';
import base64 from 'react-native-base64';
import { hashApi } from '../hash';

interface Data {
  Id: number,
  DataHora: string,
  Descricao: string,
  Tipo: string,
  NomeCompleto: string,
  Foto: string,
  length: any,
  forEach: any
}

interface Response {
  data: Data
}

export function projectNoteRefresh(idProjeto: number | any, idUltimaInteracao: number | any): Promise<Response> {
  return new Promise(async (resolve) => {

    try {

      const hashData = await hashApi();
      const source = CancelToken.source();

      await apiProject
        .get('/search_interaction.php', {
          params: {
            idProjeto: base64.encode(String(idProjeto)),
            idUltimaInteracao: base64.encode(String(idUltimaInteracao)),
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
                // sem atualizacao
                break;

              default:
                Alert.alert('', 'Falha na solicitação com o código de erro 500.')
                break;
            }
          }

          resolve({
            data: Object()
          });

        });

    } catch (error) {

      Alert.alert('', 'Falha na solicitação com o código de erro 501.')

      resolve({
        data: Object()
      });

    }

  });
}
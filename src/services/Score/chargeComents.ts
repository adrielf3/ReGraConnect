import { Alert } from 'react-native';
import { CancelToken, api } from '../api';
import { hashApi } from '../hash';
import base64 from 'react-native-base64';

interface Data {
  userName : string,
  cpf : number,
  foto : string,
  id : number,
  userId : number,
  Id_News: string,
  dtComent: string,
  postComent : string,
}

interface Response {
  data: Data
}

export function comentList(idPub: any, origemPost: any): Promise<Response> {
  return new Promise(async (resolve) => {

    try {

      const hashData = await hashApi();
      const source = CancelToken.source();

      await api
        .get('/score/pubComentCharge.php', {
          params: {
            idPub: base64.encode(String(idPub)),
            origemPost: base64.encode(String(origemPost)),
            token: hashData,
          },
          cancelToken: source.token,
          timeout: 30000
        })
        .then((response) => {
          setTimeout(() => {
            resolve({
              data: response.data
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
/*                 case 404:
                  // Resultado vazio
                  Alert.alert('', 'Falha na solicitação com o código de erro 404.')
                  break; */

                default:
                  console.log('normal')
                  break;
              }
            }

            resolve({
              data: Object()
            });

          }, 2000);
        });

    } catch (error) {

      setTimeout(() => {

        Alert.alert('', 'Falha na solicitação com o código de erro 501.')

        resolve({
          data: Object()
        });
      }, 2000);

    }

  });
}
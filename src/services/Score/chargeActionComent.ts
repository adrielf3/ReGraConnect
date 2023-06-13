import { Alert } from 'react-native';
import { CancelToken, api } from '../api';
import { hashApi } from '../hash';
import base64 from 'react-native-base64';

interface Data {
  comentName: string,
  coment_Id : number,
  Sol_Id : number,
  CPF : string,
  CPF_Destino : string,
  foto: string
  del : any,
}

interface Response {
  data: Data
}

export function actionComentList(idSol: any,): Promise<Response> {
  return new Promise(async (resolve) => {

    try {

      const hashData = await hashApi();
      const source = CancelToken.source();

      await api
        .get('/score/acaoComentCharge.php', {
          params: {
            idSol: base64.encode(String(idSol)),
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
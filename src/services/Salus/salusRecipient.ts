import { Alert } from 'react-native';
import { CancelToken, api } from '../api';
import base64 from 'react-native-base64';
import { hashApi } from '../hash';

type Props = {
  data: {
    idUser: number,
    cpf: string,
    userName: string,
    officeId: number,
    itens: object,
    size: object
  } | null
}

export function salusRecipient(empresa: number, cracha: number, officeId: number): Promise<Props> {
  return new Promise(async (resolve) => {

    try {

      const hashData = await hashApi();
      const source = CancelToken.source();

      await api
        .get('/salusRecipient.php', {
          params: {
          empresa: base64.encode(String(empresa)),
            cracha: base64.encode(String(cracha)),
            officeId: base64.encode(String(officeId)),
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
                  Alert.alert('', 'Crachá inválido.')
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
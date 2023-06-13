import { Alert } from 'react-native';
import { CancelToken, api } from '../api';
import { hashApi } from '../hash';
import base64 from 'react-native-base64';

interface Data {
    Solicitacao_id : number,
    CPF_DEMANDADO : string,
    NOME_DEMANDADO : string,
    Apelido	: string,
    DEMANDANTE : string,
    CPF_DEMANDANTE : number,
    Foto_DEMANDANTE	: string,
    Data_Abertura : string,
    Hora_Abertura : string,
    Kpi : string,
    Oque_Acao : string,
    Como : string,
    Prazo : string,
    Meta : string,
    Reuniao_id : string,
    Desc_Reuniao : string,
    Desc_Real : string,
    Foto : string,
    Fase : number,
    Duracao : string,
    Data : string,
    Pontos : number,
    StatusAprovacao	: number,
    DescMotReprovacao : string,
    Validacao_Id : string
}

interface Response {
  data: Data | any
}

export function actionInfo(cpf: any): Promise<Response> {
  return new Promise(async (resolve) => {
        
    try {

      const hashData = await hashApi();
      const source = CancelToken.source();

      await api
        .get('/score/actionsInfo.php', {
          params: {
            CPF: base64.encode(String(cpf)),
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
            console.log(error)
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
                  //Resultado vazio
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
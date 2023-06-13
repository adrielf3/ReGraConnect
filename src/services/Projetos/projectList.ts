import { Alert } from 'react-native';
import base64 from 'react-native-base64';
import { CancelToken, apiProject } from '../api';
import { hashApi } from '../hash';

interface Data {
  Area_Negocio: string,
  Atividade_Negocio: string,
  Data_Cadastro: string,
  Data_Conclusao: string,
  Data_Inicio: string,
  Descricao_Projeto: string,
  Id: number,
  Id_Empresa: number,
  Id_Usuario_Cadastrador: number,
  NomeCompleto: string,
  QtdPersonas: number,
  Titulo_Projeto: string,
}

interface Response {
  data: Data | null
}

export function projectList(idUser: number | any): Promise<Response> {
  return new Promise(async (resolve) => {

    try {

      const hashData = await hashApi();
      const source = CancelToken.source();

      await apiProject
        .get('/projects.php', {
          params: {
            idUser: base64.encode(String(idUser)),
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
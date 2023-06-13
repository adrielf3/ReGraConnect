import { Alert } from 'react-native';
import base64 from 'react-native-base64';
import { CancelToken, apiProject } from '../api';
import { hashApi } from '../hash';


interface Projeto {
  Id: number,
  Id_Empresa: number,
  Id_Usuario_Cadastrador: number,
  Titulo_Projeto: string,
  Descricao_Projeto: string,
  Area_Negocio: string,
  Atividade_Negocio: string,
  Data_Cadastro: string,
  Data_Inicio: string,
  Data_Conclusao: string,
  NomeCompleto: string
};

interface ProjetoUsuarios {
  Id_Persona: number,
  Id_Usuario: number,
  NomeCompleto: string,
  Funcao: string,
  Tipo_Persona: string,
  Foto: string
};

interface Apontamentos {
  Id: number,
  Id_Persona: number,
  Id_Projeto: number,
  DataHora: string,
  Descricao: string,
  Tipo: string,
  Frequencia_Uso: number,
  Importancia: number,
  NomeCompleto: string,
  Foto: string
};

interface Data {
  resultBuscaProjeto: Projeto,
  resultBuscaProjetoUsuarios: ProjetoUsuarios,
  resultApontamentos: Apontamentos,
};

interface Response {
  data: Data
}

export function project(idProject: number): Promise<Response> {
  return new Promise(async (resolve) => {

    try {

      const hashData = await hashApi();
      const source = CancelToken.source();

      await apiProject
        .get('/search_project.php', {
          params: {
            idProjeto: base64.encode(String(idProject)),
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
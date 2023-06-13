import { Alert } from 'react-native';
import { CancelToken, api } from './api';
import base64 from 'react-native-base64';
import { hashApi } from './hash';

interface Data {
  Departamento: string,
  StatusTrab: string,
  DtNascimento: string,
  DtContratacao: string,
  TempoCasa: string,
  NCalca: number,
  TamanhoCamisa: string,
  NCalcado: number,
  Altura: number,
  Peso: number,
  Bebe: string,
  Fuma: string,
  AtvFisica: string,
  QtdAtvFisicaSemana: number,
  DesempenhoColegas: number,
  DesempenhoLideranca: number,
  SeuDesempenho: number,
  QtdFilhos: number,
  RFeedback: string,
  PPoupanca: string,
  MoraCasa: string,
  PossuiVeiculo: string,
  DistEmpresa: number,
  MoraCom: string,
  Bairro: string,
  TempoMesmoEndereco: number,
  TempoUltEmprego: number,
  LivrosLidos: string,
  FilmesGosta: string,
  OquePrefere: string,
  SeConsidera: string,
  GostaMudancas: string,
  ResolverProblemas: string,
  TomadaDecisoes: string,
  GostaDecisoes: string,
  CarreiraEmpresa: string,
  Sobre: string
}

interface Response {
  data: Data | null
}

export function profile(cpf: number | undefined): Promise<Response> {

  return new Promise(async (resolve) => {

    try {

      const hashData = await hashApi()

      const source = CancelToken.source();

      const params = new FormData();
      params.append('cpf', base64.encode(String(cpf)));
      params.append('token', hashData);

      await api
        .post('/profile.php', params, {
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
              // Alert.alert('Não foi possível conectar', 'Verifique se você está conectado ao Wi-Fi ou à sua rede do celular.')
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
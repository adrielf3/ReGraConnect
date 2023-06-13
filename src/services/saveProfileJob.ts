import { Alert } from 'react-native';
import { CancelToken, api } from './api';
import base64 from 'react-native-base64';
import { hashApi } from './hash';

export function saveProfile(cpf: number | any, company: number | any, departmentFunction: string | any, email: string | any, data: object | any) {

  interface T {
    data: number | null;
  }

  return new Promise<T>(async (resolve) => {

    try {

      data.NCalca = data.NCalca == 0 ? null : data.NCalca
      data.NCalcado = data.NCalcado == 0 ? null : data.NCalcado
      data.Altura = data.Altura == 0 ? null : data.Altura
      data.Peso = data.Peso == 0 ? null : data.Peso
      data.QtdAtvFisicaSemana = data.QtdAtvFisicaSemana == 0 ? null : data.QtdAtvFisicaSemana
      data.DesempenhoColegas = data.DesempenhoColegas == 0 ? null : data.DesempenhoColegas
      data.DesempenhoLideranca = data.DesempenhoLideranca == 0 ? null : data.DesempenhoLideranca
      data.SeuDesempenho = data.SeuDesempenho == 0 ? null : data.SeuDesempenho
      data.QtdFilhos = data.QtdFilhos == 0 ? null : data.QtdFilhos
      data.DistEmpresa = data.DistEmpresa == 0 ? null : data.DistEmpresa
      data.TempoMesmoEndereco = data.TempoMesmoEndereco == 0 ? null : data.TempoMesmoEndereco
      data.TempoUltEmprego = data.TempoUltEmprego == 0 ? null : data.TempoUltEmprego

      const hashData = await hashApi();
      const source = CancelToken.source();

      const params = new FormData();
      params.append('cpf', base64.encode(String(cpf)));
      params.append('company', base64.encode(String(company)));
      params.append('departmentFunction', base64.encode(String(departmentFunction)));
      params.append('email', base64.encode(String(email)));
      params.append('data', JSON.stringify(data))
      params.append('token', hashData);

      await api
        .post('/saveProfileJob.php', params, {
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

// import { Alert } from 'react-native';
// import { CancelToken, api } from './api';
// import base64 from 'react-native-base64';
// import { hashApi } from './hash';

// export function saveProfile(cpf: number | any, company: number | any, departmentFunction: string | any, email: string | any, data: object | any) {

//   interface T {
//     data: number | null;
//   }

//   return new Promise<T>(async (resolve) => {

//     try {

//       const hashData = await hashApi();
//       const source = CancelToken.source();

//       const params = new FormData();
//       params.append('cpf', base64.encode(String(cpf)));
//       params.append('company', base64.encode(String(company)));
//       params.append('departmentFunction', base64.encode(String(departmentFunction)));
//       params.append('email', base64.encode(String(email)));
//       params.append('data', JSON.stringify(data))
//       params.append('token', hashData);

//       await api
//         .post('/saveProfileJob.php', params, {
//           cancelToken: source.token,
//           timeout: 30000
//         })
//         .then((response) => {
//           resolve({
//             data: response.data
//           });
//         })
//         .catch((error) => {
//           setTimeout(() => {

//             const response = error.toJSON()
//             if (response.message === 'timeout of 30000ms exceeded') {
//               Alert.alert('Não foi possível conectar', 'Verifique se você está conectado ao Wi-Fi ou à sua rede do celular.')
//             } else {
//               switch (response.status) {
//                 case 400:
//                   // Parametro incorreto.
//                   Alert.alert('', 'Falha na solicitação com o código de erro 400.')
//                   break;
//                 case 401:
//                   // Token invalido.
//                   Alert.alert('', 'Falha na solicitação com o código de erro 401.')
//                   break;
//                 case 404:
//                   // Resultado vazio
//                   Alert.alert('', 'Falha na solicitação com o código de erro 404.')
//                   break;

//                 default:
//                   Alert.alert('', 'Falha na solicitação com o código de erro 500.')
//                   break;
//               }
//             }

//             resolve({
//               data: null
//             });

//           }, 2000);

//         });

//     } catch (error) {

//       setTimeout(() => {

//         Alert.alert('', 'Falha na solicitação com o código de erro 501.')

//         resolve({
//           data: null
//         });
//       }, 2000);

//     }

//   });
// }
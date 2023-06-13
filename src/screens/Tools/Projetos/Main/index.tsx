import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Body,
  Title,
  ContainerItem,
  Item,
  ItemContainerTitle,
  ItemTitle,
  ItemSubTitle,
  ItemNumberTitle,
  ContainerNext
} from './styles';

// contexts
import { useLoading } from '../../../../contexts/loading';
import { useAuth } from '../../../../contexts/auth';
import { useProjetos } from '../../../../contexts/projetos';
// >

// components
import ToolInfo from '../../../../components/ToolInfo';
import CallError from '../../../../components/CallError';
import Skeleton from '../../../../components/Skeleton';
import HeaderStack from '../../../../components/HeaderStack';
import Next from '../../../../components/Projetos/Next';
// >

// services
import { projectList } from '../../../../services/Projetos/projectList';
import { project } from '../../../../services/Projetos/project';
// >

type T = {
  buttonDisable: boolean,
  callErrorScreen: boolean,
  loading: boolean,
  projectData: object | any
}

const ProjectMain: React.FC = () => {

  const navigation = useNavigation();
  const { handleModalLoading } = useLoading();
  const { user } = useAuth();
  const { projectSelected } = useProjetos();

  const [dataLocal, setDataLocal] = useState<T>({
    buttonDisable: false,
    callErrorScreen: false,
    loading: false,
    projectData: []
  })

  async function handleProjets() {

    setDataLocal({
      ...dataLocal,
      buttonDisable: true,
      callErrorScreen: false,
      loading: true
    })

    let res = await projectList(user?.Id);

    if (!res.data) {
      setDataLocal({
        ...dataLocal,
        callErrorScreen: true,
        loading: true,
        buttonDisable: false,
        projectData: []
      })
    } else {
      setDataLocal({
        ...dataLocal,
        callErrorScreen: false,
        loading: false,
        buttonDisable: false,
        projectData: res.data
      })
    }

  }

  useEffect(() => {
    handleProjets();
  }, []);

  async function handleContinue(idProject: number) {

    setDataLocal({ ...dataLocal, buttonDisable: true });
    handleModalLoading(true);

    let res = await project(idProject);

    if (res.data.resultBuscaProjeto) {
      projectSelected(res.data.resultBuscaProjeto, res.data.resultBuscaProjetoUsuarios, res.data.resultApontamentos);
      handleModalLoading(false);
      setDataLocal({ ...dataLocal, buttonDisable: false });
      navigation.navigate('Project');
    } else {
      handleModalLoading(false);
      setDataLocal({ ...dataLocal, buttonDisable: false });
    }

  };

  const dataToolInfo = [
    { label: 'Construir um entendimento compartilhado da necessidade do produto;', value: 1 },
    { label: 'Facilitar a descoberta do produto e a escrita das histórias de usuário;', value: 2 },
    { label: 'Estruturar a granularidade dos itens do backlog;', value: 3 }
  ]

  return (
    <Container>

      <HeaderStack title='Projeto' goBack={() => navigation.goBack()} disabled={false} />

      {dataLocal.callErrorScreen ? (
        <CallError onPress={() => handleProjets()} disabled={dataLocal.buttonDisable} />
      ) : (
        <>
          {dataLocal.loading ? (
            <Body>
              <Skeleton w={'100%'} h={'20px'} r={'10px'} />
              <Skeleton w={'100%'} h={'245px'} r={'10px'} />
              <Skeleton w={'100%'} h={'20px'} r={'10px'} />
              <Skeleton w={'100%'} h={'50px'} r={'10px'} />
              <Skeleton w={'100%'} h={'50px'} r={'10px'} />
              <Skeleton w={'100%'} h={'50px'} r={'10px'} />
              <Skeleton w={'100%'} h={'50px'} r={'10px'} />
              <Skeleton w={'100%'} h={'50px'} r={'10px'} />
              <Skeleton w={'100%'} h={'50px'} r={'10px'} />
            </Body>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>

              <Body>

                <ToolInfo
                  title='Product Backlog Building: criação e refinamento de backlog para produtos'
                  subTitle={dataToolInfo}
                  img={2}
                />

                {/* <Title>Lista de projetos:</Title> */}

                {dataLocal.projectData.length !== 0 ? (
                  <>
                    <Title>Lista de projetos:</Title>
                    {
                      dataLocal.projectData.map((item: { Id: number, Titulo_Projeto: string, QtdPersonas: number | any }, index: number) => (
                        <ContainerItem key={index}>
                          <Item onPress={() => handleContinue(item.Id)} disabled={false}>
                            <ItemContainerTitle>
                              <ItemTitle>{item.Titulo_Projeto}</ItemTitle>
                              <ItemSubTitle><ItemNumberTitle>{item.QtdPersonas}</ItemNumberTitle> {item.QtdPersonas ? item.QtdPersonas.length == 1 ? 'Participante' : 'Participantes' : 's/n'}</ItemSubTitle>
                            </ItemContainerTitle>
                            <ContainerNext>
                              <Next />
                            </ContainerNext>
                          </Item>
                        </ContainerItem>
                      ))
                    }
                  </>
                ) : (
                  <>
                    <Title>Sem projetos:</Title>
                    <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                      <Image style={{ width: 50, height: 50, resizeMode: 'contain' }} source={require('../../../../assets/imgs/conjunto-vazio.png')} />
                    </View>
                  </>
                )}

              </Body>
            </ScrollView>
          )}
        </>
      )}

    </Container >
  )
}

export default ProjectMain;
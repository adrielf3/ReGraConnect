import React, { useState } from 'react';
import { Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Body,
  ItemContainer,
  ItemBody,
  ImgContainer,
  TitleContainer,
  Title,
  SubTitle
} from './styles';

// context
import { useProjetos } from "../../../../contexts/projetos";
// >
// components
import HeaderStack from '../../../../components/HeaderStack';
// >

const ProjectMain: React.FC = () => {

  const navigation = useNavigation();
  const { resultBuscaProjetoUsuarios } = useProjetos();

  return (
    <Container>

      <HeaderStack title='Colaboradores' goBack={() => navigation.goBack()} disabled={false} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Body>
          {resultBuscaProjetoUsuarios.map((item: { NomeCompleto: string, Funcao: string, Foto: string }, index: number) => (
            <ItemContainer key={index}>

              <ItemBody>

                <ImgContainer>
                  {item.Foto ? (
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        resizeMode: 'contain'
                      }}
                      source={{ uri: `http://gruporegra.com.br//integrador/assets/img/imgUser/${item.Foto}` }}
                    />
                  ) : (
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        resizeMode: 'contain'
                      }}
                      source={require('../../../../assets/imgs/user.png')}
                    />
                  )}
                </ImgContainer>
                <TitleContainer>
                  <Title>{item.NomeCompleto}</Title>
                  <SubTitle>{item.Funcao}</SubTitle>
                </TitleContainer>

              </ItemBody>

            </ItemContainer>
          ))}
        </Body>
      </ScrollView>

    </Container >
  )
}

export default ProjectMain;
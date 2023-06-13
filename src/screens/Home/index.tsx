import React from 'react';
import { Alert, ScrollView, View, StatusBar } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';
import {
  Container,
  Head,
  Menu,
  WecomeContainer,
  NickName,
  Message,
  SearchContainer,
  Body,
  TitleContainer,
  Title,
  PlusContainer,
  Plus
} from './styles';

import HeaderDrawer from '../../components/HeaderDrawer';
import Search from '../../components/Search';
import Tool from '../../components/Tool';
import NewsCard from '../../components/NewsCard';

const Home: React.FC = () => {

  const navigation = useNavigation();
  const { user } = useAuth();

  function handleNavigation() {
    navigation.navigate('Notifications');
  };

  function handleSalus() {
    navigation.navigate('SalusMain');
  };

  function handleProjetos() {
    navigation.navigate('ProjetosMain');
  };

  function handleEnquete() {
    navigation.navigate('EnqueteMain');
  };

  function handleScore() {
    navigation.navigate('Score');
  };

  function handleNews() {
    navigation.navigate('News');
  };

  return (
    <Container>
      <StatusBar backgroundColor='#fff' barStyle='dark-content' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Head>

          <Menu>
            <HeaderDrawer
              openDrawer={() => navigation.dispatch(DrawerActions.openDrawer())}
              notifications={handleNavigation}
            />
          </Menu>

          <WecomeContainer>
            <NickName>Olá {user?.Apelido},</NickName>
            <Message>Como você está hoje?</Message>
          </WecomeContainer>

          <SearchContainer>
            <Search />
          </SearchContainer>

        </Head>

        <Body>

          <TitleContainer>
            <Title>Ferramentas</Title>
            <PlusContainer onPress={() => Alert.alert('', 'Carregando...')}>
              <Plus>mais</Plus>
            </PlusContainer>
          </TitleContainer>

          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ width: 35 }}></View>
              <Tool title='Salus' color='#FFF2CF' img={1} accessTool={handleSalus} />
              <Tool title='Projetos' color='#F5FAEB' img={2} accessTool={handleProjetos} />
              <Tool title='Enquete' color='#F0F4F7' img={3} accessTool={handleEnquete} />
              <Tool title='Score' color='#F3F3F3' img={0} accessTool={handleScore} />
              <View style={{ width: 15 }}></View>
            </ScrollView>
          </View>

          <TitleContainer>
            <Title>Principais notícias</Title>
          </TitleContainer>

          <NewsCard accessNews={handleNews} />

        </Body>
      </ScrollView>
    </Container >
  )
}

export default Home;
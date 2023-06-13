import React, { useEffect } from 'react';
import { ScrollView, Image } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  ProfileContainer,
  ProfileBody,
  Title,
  Body
} from './styles';

// contexts
import { useProfile } from '../../../contexts/profile';
import { useAuth } from '../../../contexts/auth';
// >

// components
import CallError from '../../../components/CallError';
import HeaderStackWithDrawer from '../../../components/HeaderStackWithDrawer';
import ListItem from '../../../components/ListItem';
import Skeleton from '../../../components/Skeleton';
// >

const PeopleGestation: React.FC = () => {

  const navigation = useNavigation();
  const { user } = useAuth();
  const { data, buttonDisable, callErrorScreen, loading, profile } = useProfile();

  function handlerNavigation(value: string | any) {
    navigation.navigate(value);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      function handleProfile() {
        profile(user?.CPF);
      }

      handleProfile();
    })

    return unsubscribe
  }, [navigation])

  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#F3F3F3', '#ffffff', '#ffffff']} style={{ flex: 1 }} >

      <HeaderStackWithDrawer title='Perfil' openDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />

      <ScrollView showsVerticalScrollIndicator={false}>

        {callErrorScreen ? (
          <CallError onPress={() => profile(user?.CPF)} disabled={buttonDisable} />
        ) : (
          <>
            {loading ? (
              <Body>
                <Skeleton w={'150px'} h={'150px'} r={'110px'} />
                <Skeleton w={'100%'} h={'20px'} r={'10px'} />
                <Skeleton w={'100%'} h={'20px'} r={'10px'} />
                <Skeleton w={'100%'} h={'50px'} r={'10px'} />
                <Skeleton w={'100%'} h={'50px'} r={'10px'} />
                <Skeleton w={'100%'} h={'50px'} r={'10px'} />
                <Skeleton w={'100%'} h={'50px'} r={'10px'} />
                <Skeleton w={'100%'} h={'50px'} r={'10px'} />
                <Skeleton w={'100%'} h={'50px'} r={'10px'} />
                <Skeleton w={'100%'} h={'50px'} r={'10px'} />
              </Body>
            ) : (
              <Body>

                <ProfileContainer>
                  <ProfileBody>

                    {user?.Foto ? (
                      <Image
                        style={{
                          width: 150,
                          height: 150,
                          borderRadius: 100,
                          resizeMode: 'contain'
                        }}
                        source={{ uri: `http://gruporegra.com.br//integrador/assets/img/imgUser/${user?.Foto}` }}
                      />
                    ) : (
                      <Image
                        style={{
                          width: 150,
                          height: 150,
                          borderRadius: 100,
                          resizeMode: 'contain'
                        }}
                        source={require('../../../assets/imgs/user.png')}
                      />
                    )}

                  </ProfileBody>

                  <Title type={true}>{user?.NomeCompleto}</Title>

                  {data?.TempoCasa &&
                    <Title type={false}>Tempo de casa {data?.TempoCasa}</Title>
                  }

                </ProfileContainer>

                <ListItem icon='briefcase-outline' title='Trabalho' onPress={() => handlerNavigation('ProfileJob')} />
                <ListItem icon='person-outline' title='Comportamento' onPress={() => handlerNavigation('ProfileBehavior')} />
                <ListItem icon='body-outline' title='Medidas' onPress={() => handlerNavigation('ProfileMeasure')} />
                <ListItem icon='fitness-outline' title='Saúde' onPress={() => handlerNavigation('ProfileHealth')} />
                <ListItem icon='analytics-outline' title='Desempenho' onPress={() => handlerNavigation('ProfilePerformance')} />
                <ListItem icon='home-outline' title='Endereço' onPress={() => handlerNavigation('ProfileAddress')} />
                <ListItem icon='man-outline' title='Sobre' onPress={() => handlerNavigation('ProfileAboutMe')} />
              </Body>
            )}
          </>
        )}

      </ScrollView>

    </LinearGradient>
  )
}

export default PeopleGestation;
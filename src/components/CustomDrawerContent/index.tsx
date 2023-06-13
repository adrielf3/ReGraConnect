import React from 'react';
import { Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../contexts/auth';
import {
  Header,
  UserIMG,
  User,
  UserName,
  UserEmail,
  Footer,
  ButtonSignOut,
  TitleSignOut,
  ContainerVersion,
  Version
} from './styles';

function CustomDrawerContent({ ...props }) {

  const { signOut, user } = useAuth();

  function handleSignOut() {
    signOut();
  };

  return (
    <>
      <DrawerContentScrollView {...props}>
        <Header>
          <UserIMG>
            {user?.Foto ? (
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  resizeMode: 'contain'
                }}
                source={{ uri: `http://gruporegra.com.br//integrador/assets/img/imgUser/${user?.Foto}` }}
              />
            ) : (
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  resizeMode: 'contain'
                }}
                source={require('../../assets/imgs/user.png')}
              />
            )}
          </UserIMG>
          <User>
            <UserName>{user?.Apelido}</UserName>
            <UserEmail>{user?.Email}</UserEmail>
          </User>
        </Header>
        <DrawerItem
          icon={() => (<Icon name="home-outline" color='#676F85' size={20} />)}
          focused={true}
          activeTintColor="#404040"
          activeBackgroundColor="#fff"
          label="Home"
          onPress={() => { props.navigation.navigate('Home') }}
        />
        <DrawerItem
          icon={() => (<Icon name="person-outline" color='#676F85' size={20} />)}
          focused={true}
          activeTintColor="#404040"
          activeBackgroundColor="#fff"
          label="Perfil"
          onPress={() => { props.navigation.navigate('Profile') }}
        />

      </DrawerContentScrollView>
      <Footer>
        <ButtonSignOut onPress={handleSignOut}>
          <TitleSignOut>Sair</TitleSignOut>
        </ButtonSignOut>
        <ContainerVersion>
          <Version>Versão: 1.0.0</Version>
        </ContainerVersion>
      </Footer>
    </>
  )
}

export default CustomDrawerContent;
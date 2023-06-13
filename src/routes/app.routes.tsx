import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomDrawerContent from '../components/CustomDrawerContent';

import Home from '../screens/Home';
import Profile from './profile.routes';
import Notifications from '../screens/Notifications';

import News from '../screens/News';

// Ferramentas
import Salus from './salus.routes';
import Projetos from './projetos.routes';
import Enquete from './enquete.routes';
import ScoreMain from './score.routes'
// >

type RootDrawerParamList = {
  Home: undefined,
  Profile: undefined,
}

type RootStackParamList = {
  Drawer: undefined,
  Notifications: undefined,
  SalusMain: undefined,
  ProjetosMain: undefined,
  EnqueteMain: undefined,
  News: undefined,
  Score: undefined
}

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const AppStack = createNativeStackNavigator<RootStackParamList>();

const Menu: React.FC = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{ headerShown: false }}>
      <Drawer.Screen name='Home' component={Home} />
      <Drawer.Screen name='Profile' component={Profile} />
    </Drawer.Navigator>
  )
}

const AppRoutes: React.FC = () => {
  return (
    <AppStack.Navigator initialRouteName='Drawer' screenOptions={{ headerShown: false }}>
      <AppStack.Screen name='Drawer' component={Menu} />
      <AppStack.Screen name='Notifications' component={Notifications} />
      <AppStack.Screen name='SalusMain' component={Salus} />
      <AppStack.Screen name='ProjetosMain' component={Projetos} />
      <AppStack.Screen name='EnqueteMain' component={Enquete} />
      <AppStack.Screen name='News' component={News} />
      <AppStack.Screen name='Score' component={ScoreMain} />
    </AppStack.Navigator>
  )
}

export default AppRoutes;
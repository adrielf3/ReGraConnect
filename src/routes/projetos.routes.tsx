import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// contexts
import { ProjetosProvider } from '../contexts/projetos';
// >

// screens
import Projetos from '../screens/Tools/Projetos/Main';
import Project from '../screens/Tools/Projetos/Project';
import Collaborator from '../screens/Tools/Projetos/Collaborator';
// >

type RootStackParamList = {
  Projetos: undefined,
  Project: undefined,
  Collaborator: undefined
}

const ProjetosStack = createNativeStackNavigator<RootStackParamList>();

const ProjetosRoutes: React.FC = () => {
  return (
    <ProjetosProvider>
      <ProjetosStack.Navigator initialRouteName='Projetos' screenOptions={{ headerShown: false }}>
        <ProjetosStack.Screen name='Projetos' component={Projetos} options={{ title: 'Projetos' }} />
        <ProjetosStack.Screen name='Project' component={Project} options={{ title: 'Project' }} />
        <ProjetosStack.Screen name='Collaborator' component={Collaborator} options={{ title: 'Collaborator' }} />
      </ProjetosStack.Navigator>
    </ProjetosProvider>
  )
}

export default ProjetosRoutes;
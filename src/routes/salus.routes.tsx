import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// contexts
import { SalusProvider } from '../contexts/salus';
// >

import Salus from '../screens/Tools/Salus/Main';
import SalusItens from '../screens/Tools/Salus/Itens';
import SalusResume from '../screens/Tools/Salus/Resume';

type RootStackParamList = {
  Salus: undefined,
  SalusItens: undefined,
  SalusResume: undefined
}

const SalusStack = createNativeStackNavigator<RootStackParamList>();

const SalusRoutes: React.FC = () => {
  return (
    <SalusProvider>
      <SalusStack.Navigator initialRouteName='Salus' screenOptions={{ headerShown: false }}>
        <SalusStack.Screen name='Salus' component={Salus} options={{ title: 'Salus' }} />
        <SalusStack.Screen name='SalusItens' component={SalusItens} options={{ title: 'Itens' }} />
        <SalusStack.Screen name='SalusResume' component={SalusResume} options={{ title: 'Resumo' }} />
      </SalusStack.Navigator>
    </SalusProvider>
  )
}

export default SalusRoutes;
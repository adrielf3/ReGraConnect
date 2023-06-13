import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// contexts
import { EnqueteProvider } from '../contexts/enquete';
// >

// screens
import Enquete from '../screens/Tools/Enquete/Main';
import CreatePoll from '../screens/Tools/Enquete/CreatePoll';
import AccessPoll from '../screens/Tools/Enquete/AccessPoll';
// >

type RootStackParamList = {
  Enquete: undefined,
  CreatePoll: undefined,
  AccessPoll: undefined
}

const EnqueteStack = createNativeStackNavigator<RootStackParamList>();

const EnqueteRoutes: React.FC = () => {
  return (
    <EnqueteProvider>
      <EnqueteStack.Navigator initialRouteName='Enquete' screenOptions={{ headerShown: false }}>
        <EnqueteStack.Screen name='Enquete' component={Enquete} options={{ title: 'Enquete' }} />
        <EnqueteStack.Screen name='CreatePoll' component={CreatePoll} options={{ title: 'CreatePoll' }} />
        <EnqueteStack.Screen name='AccessPoll' component={AccessPoll} options={{ title: 'AccessPoll' }} />
      </EnqueteStack.Navigator>
    </EnqueteProvider>
  )
}

export default EnqueteRoutes;
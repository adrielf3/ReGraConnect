import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import ScoreMain from '../screens/Tools/Score/Main';
import AFazer from '../screens/Tools/Score/minhasAcoes/bottomTabs/aFazer/aFazer';

type RootStackParamList = {
  Score: undefined,
  ScoreAFazer: undefined
}

const ScoreStack = createNativeStackNavigator<RootStackParamList>();

const ScoreRoutes: React.FC = () => {
  return (
      <ScoreStack.Navigator initialRouteName='Score' screenOptions={{ headerShown: false }}>
        <ScoreStack.Screen name='Score' component={ScoreMain} options={{ title: 'Score' }} />
        <ScoreStack.Screen name="ScoreAFazer" component={AFazer} options={{ title: 'AFazer' }} />
      </ScoreStack.Navigator>
  )
}

export default ScoreRoutes;
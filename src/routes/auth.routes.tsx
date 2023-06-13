import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../screens/SignIn';
import ForgotUser from '../screens/ForgotUser';

const AuthStack = createNativeStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator initialRouteName='SignIn'>
    <AuthStack.Screen name='SignIn' component={SignIn} options={{
      headerShown: false
    }} />
    <AuthStack.Screen name='ForgotUser' component={ForgotUser} options={{ title: 'Recuperar senha' }} />
  </AuthStack.Navigator>
)

export default AuthRoutes;
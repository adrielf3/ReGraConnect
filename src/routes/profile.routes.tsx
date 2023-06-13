import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import ProfileMain from '../screens/Profile/ProfileMain';
import ProfileJob from '../screens/Profile/ProfileJob';
import ProfileBehavior from '../screens/Profile/ProfileBehavior';
import ProfileMeasure from '../screens/Profile/ProfileMeasure';
import ProfileHealth from '../screens/Profile/ProfileHealth';
import ProfilePerformance from '../screens/Profile/ProfilePerformance';
import ProfileAddress from '../screens/Profile/ProfileAddress';
import ProfileAboutMe from '../screens/Profile/ProfileAboutMe';
// >

type RootStackParamList = {
  ProfileMain: undefined,
  ProfileJob: undefined,
  ProfileBehavior: undefined,
  ProfileMeasure: undefined,
  ProfileHealth: undefined,
  ProfilePerformance: undefined,
  ProfileAddress: undefined,
  ProfileAboutMe: undefined
}

const ProfileMainStack = createNativeStackNavigator<RootStackParamList>();

const ProfileMainRoutes: React.FC = () => {
  return (
    <ProfileMainStack.Navigator initialRouteName='ProfileMain' screenOptions={{ headerShown: false }}>
      <ProfileMainStack.Screen name='ProfileMain' component={ProfileMain} />
      <ProfileMainStack.Screen name='ProfileJob' component={ProfileJob} />
      <ProfileMainStack.Screen name='ProfileBehavior' component={ProfileBehavior} />
      <ProfileMainStack.Screen name='ProfileMeasure' component={ProfileMeasure} />
      <ProfileMainStack.Screen name='ProfileHealth' component={ProfileHealth} />
      <ProfileMainStack.Screen name='ProfilePerformance' component={ProfilePerformance} />
      <ProfileMainStack.Screen name='ProfileAddress' component={ProfileAddress} />
      <ProfileMainStack.Screen name='ProfileAboutMe' component={ProfileAboutMe} />
    </ProfileMainStack.Navigator>
  )
}

export default ProfileMainRoutes;
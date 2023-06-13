import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import AFazer from '../screens/Tools/Score/minhasAcoes/bottomTabs/aFazer/aFazer';
import Fazendo from '../screens/Tools/Score/minhasAcoes/bottomTabs/fazendo';
import Concluidas from '../screens/Tools/Score/minhasAcoes/bottomTabs/concluidas';

type RootStackParamList = {
  Pendentes: undefined,
  Fazendo: undefined,
  Concluidas: undefined
}

const Tab = createBottomTabNavigator<RootStackParamList>();



const BottomTabsScore = () => {
 
    return (
    <Tab.Navigator initialRouteName='Pendentes' screenOptions={{ tabBarHideOnKeyboard: true }} >
      <Tab.Screen name="Pendentes" component={AFazer} options={{ headerShown: false }} />
      <Tab.Screen name="Fazendo" component={Fazendo} options={{ headerShown: false }} />
      <Tab.Screen name="Concluidas" component={Concluidas} options={{ headerShown: false }} />
    </Tab.Navigator>
  );

}

export default BottomTabsScore
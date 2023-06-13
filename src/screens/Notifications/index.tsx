import React from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Container,
  Array
} from './styles';

import HeaderStack from '../../components/HeaderStack';

import Dev from '../../components/Dev';

const DATA = [
  { id: '1', avatar: "https://github.com/aprCentral.png", name: 'João Maria', speciality: 'React Native' },
  { id: '2', avatar: "https://github.com/aprCentral.png", name: 'João Maria', speciality: 'React Native' },
  { id: '3', avatar: "https://github.com/aprCentral.png", name: 'João Maria', speciality: 'React Native' },
  { id: '4', avatar: "https://github.com/aprCentral.png", name: 'João Maria', speciality: 'React Native' },
  { id: '5', avatar: "https://github.com/aprCentral.png", name: 'João Maria', speciality: 'React Native' },
  { id: '6', avatar: "https://github.com/aprCentral.png", name: 'João Maria', speciality: 'React Native' },
  { id: '7', avatar: "https://github.com/aprCentral.png", name: 'João Maria', speciality: 'React Native' },
  { id: '8', avatar: "https://github.com/aprCentral.png", name: 'João Maria', speciality: 'React Native' },
  { id: '9', avatar: "https://github.com/aprCentral.png", name: 'João Maria', speciality: 'React Native' },
]

const List: React.FC = () => {

  const navigation = useNavigation();

  return (

    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#F3F3F3', '#ffffff', '#ffffff']} style={{ flex: 1 }} >
      <HeaderStack title='Notificaçōes' goBack={() => navigation.goBack()} disabled={false} />
      {/* <Array
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Dev type='primary' data={item} />}
        numColumns={2}
      /> */}
    </LinearGradient>

    // <Container>
      
    //   <Array
    //     data={DATA}
    //     keyExtractor={item => item.id}
    //     renderItem={({ item }) => <Dev type='primary' data={item} />}
    //     numColumns={2}
    //   />
    // </Container>
  )
}

export default List;
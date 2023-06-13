import React from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderStack from '../../components/HeaderStack';
import LinearGradient from 'react-native-linear-gradient';
import {
  Body
} from './styles';

const PeopleGestation: React.FC = () => {

  const navigation = useNavigation();

  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#F3F3F3', '#ffffff', '#ffffff']} style={{ flex: 1 }} >
      <HeaderStack title='Gente e Gestão' goBack={() => navigation.goBack()} disabled={false} />
      
      <Body>
        <Image style={{ width: 200, height: 200 }} source={require('../../assets/imgs/ferramenta.png')} />
      </Body>

    </LinearGradient>
  )
}

export default PeopleGestation;
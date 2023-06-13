import React from 'react';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderStack from '../../components/HeaderStack';
import LinearGradient from 'react-native-linear-gradient';
import {
  Body,
  Title,
  Paragraph
} from './styles';

const PeopleGestation: React.FC = () => {

  const navigation = useNavigation();

  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#F3F3F3', '#ffffff', '#ffffff']} style={{ flex: 1 }} >
      <HeaderStack title='Lançamento' goBack={() => navigation.goBack()} disabled={false} />

      <ScrollView>
        <Body>
          <Image style={{ width: 300, height: 300, resizeMode: 'contain' }} source={require('../../assets/imgs/bud-zero-ln.png')} />
          <Title></Title>
          <Paragraph>
            A dupla Rodrigo Carioca e Leonardo Filho trouxe desta vez para o canal uma grande novidade no mercado nacional! A BUDWEISER ZERO, cerveja que já foi lançada há mais de 2 anos nos EUA e que chega com força ao mercado brasileiro! Mas, será que tem sabor de cerveja? Dá uma olhada no vídeo da semana!
          </Paragraph>
        </Body>
      </ScrollView>

    </LinearGradient>
  )
}

export default PeopleGestation;
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, useWindowDimensions,TouchableOpacity, ActivityIndicator } from 'react-native';
import RenderHtml from 'react-native-render-html';

import {
  Card,
  CardHeader,
  UserIMG,
} from './style'

type CardItens = {
  userName: string,
  description: any,
  image: ImageSourcePropType,
}

interface Props {
  data: CardItens
}

const InterCard = ({ userName, description, image }: CardItens) => {
  const [showFullText, setShowFullText] = useState<Boolean>(false);

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };


  const { width } = useWindowDimensions();

  return (
      <Card>
        <CardHeader>
          <UserIMG>
            {image ? (
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  resizeMode: 'contain'
                }}
                source={{ uri: `http://gruporegra.com.br//integrador/assets/img/imgUser/${image}` }}
              />
            ) : (
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  resizeMode: 'contain'
                }}
                source={require('../../assets/imgs/user.png')}
              />
            )}
          </UserIMG>
          <Text style={{color: '#666', fontWeight: 'bold'}} >{userName}</Text>
        </CardHeader>
        <View style={{flex: 1}}>
        <RenderHtml contentWidth={width} source={description} />
        </View>
      </Card>
  );
};

const styles = StyleSheet.create({
  link: {
    color: '#218afc',
    fontWeight: '700',
  },
  badge: {
    backgroundColor: 'red',
    borderRadius: 10,
    marginLeft: 5,
    width:15,
    alignItems:'center',
    justifyContent:'center',
    height:15
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default InterCard;
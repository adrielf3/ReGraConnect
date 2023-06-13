import React, { useState } from 'react';
import {View, Text, Image, StyleSheet, ImageSourcePropType, TouchableOpacity, useWindowDimensions, Linking} from 'react-native';



import {
  Card,
  CardHeader,
  UserIMG,
  InterView
} from './style'

type CardItens = {
  userName: string | undefined,
  pubTitle: string,
  acao: string,
  como: string,
  meta: string,
  prazo: any,
  image: ImageSourcePropType | undefined
  buttonComent: any,
  anyButton: any
}

interface Props {
  data: CardItens
}

const CardAcoes = ({ userName, pubTitle, acao, como, meta, prazo, image, buttonComent, anyButton }: CardItens) => {
  const [showFullText, setShowFullText] = useState<Boolean>(false);

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  const openUrl = (url: any) => {
    Linking.openURL(url)
  }

  const { width } = useWindowDimensions();

  return (
    <View style={{ alignItems:'center'}}>
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
          <Text>{userName}</Text>
        </CardHeader>
        <View style={styles.viewAcaoInfo} >
          <Text style={{ paddingTop: 10, color: '#454746', fontWeight: 'bold' }} > {pubTitle}</Text>
          <Text> <Text style={styles.textAcaoInfo} >Ação: </Text> {acao} </Text>
          <Text> <Text style={styles.textAcaoInfo}>Como: </Text> {como} </Text>
          <Text> <Text style={styles.textAcaoInfo}>Meta: </Text> {meta} </Text>
          <Text> <Text style={styles.textAcaoInfo}>Prazo: </Text> {prazo} </Text>
          {anyButton !== null && anyButton}
        </View>
        <InterView>
          <TouchableOpacity onPress={buttonComent}  >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain'
                }}
                source={require('../../assets/imgs/comentar.png')}
              />
              <Text style={{ paddingLeft: 5 }}>Comentar</Text>
            </View>
          </TouchableOpacity>
        </InterView>
      </Card>
    </View>
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
    width: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 15
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  viewAcaoInfo: {
    marginVertical: 10,
    width:'90%'
  },
  textAcaoInfo : {
    color: '#454746',
    fontWeight: 'bold'
  }
});

export default CardAcoes;
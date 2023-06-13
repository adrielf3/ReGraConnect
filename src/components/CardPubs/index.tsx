import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, TouchableOpacity, ActivityIndicator, useWindowDimensions, Linking, Button } from 'react-native';
import RenderHtml from 'react-native-render-html';
import ParsedText from 'react-native-parsed-text';
import Icon from 'react-native-vector-icons/Ionicons'


import {
  Card,
  CardHeader,
  UserIMG,
  InterView
} from './style'

type CardItens = {
  userName: string,
  nameRec: string,
  pubTitle: string,
  description: any,
  image: ImageSourcePropType,
  imageRec: ImageSourcePropType,
  buttonLike: any,
  buttonUnLike: any,
  buttonComent: any,
  badgeCountLikes: number,
  badgeCountUnLike: number,
  likeColor: string,
  unLikeColor: string,
  loadingLike: boolean,
  loadingUnLike: boolean,
}

interface Props {
  data: CardItens
}

const PostCard = ({ userName, pubTitle, description, image, buttonLike, buttonUnLike, buttonComent, badgeCountLikes, badgeCountUnLike, likeColor, unLikeColor, loadingLike, loadingUnLike, nameRec, imageRec }: CardItens) => {
  const [showFullText, setShowFullText] = useState<Boolean>(false);

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  const openUrl = (url: any) => {
    Linking.openURL(url)
  }






  const { width } = useWindowDimensions();

  return (
    <View>
      <Card>
      {nameRec !== '' && (<Text style={{ fontWeight: 'bold', alignSelf: 'center' }} > Recomendação </Text>)}
        <CardHeader>
          <UserIMG>
            {image ? (
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  resizeMode: 'contain'
                }}
                source={{ uri: `http://gruporegra.com.br//integrador/assets/img/imgUser/${image}` }}
              />
            ) : (
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  resizeMode: 'contain'
                }}
                source={require('../../assets/imgs/user.png')}
              />
            )}
          </UserIMG>
          <Text>{userName}</Text>
          {nameRec !== '' && (
            <View style={{ flexDirection : 'row', alignItems: 'center' }}>
              <Icon name='arrow-forward-outline' size={25} color={'black'} style={{ marginHorizontal: 5 }}/>
              <UserIMG>
                {image ? (
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      resizeMode: 'contain'
                    }}
                    source={{ uri: `http://gruporegra.com.br//integrador/assets/img/imgUser/${imageRec}` }}
                  />
                ) : (
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      resizeMode: 'contain'
                    }}
                    source={require('../../assets/imgs/user.png')}
                  />
                )}
              </UserIMG>
              <Text>{nameRec}</Text>
            </View>
          )}
        </CardHeader>
        {pubTitle !== null && <Text style={{ color: '#454746', fontWeight: 'bold' }} >{pubTitle}</Text>}

        <RenderHtml contentWidth={width} source={description} />

        <InterView>
          {loadingLike ?
            <ActivityIndicator size={'small'} color='#666' style={{ alignSelf: 'center' }} />
            :
            <TouchableOpacity onPress={buttonLike}>
              <View style={{ flexDirection: 'row' }} >
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'contain'
                  }}
                  source={require('../../assets/imgs/gostar.png')}
                />
                <Text style={{ paddingLeft: 5, color: likeColor }}>Gostei</Text>
                {badgeCountLikes > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{badgeCountLikes}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          }

          <TouchableOpacity onPress={buttonComent}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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

          {loadingUnLike ?
            <ActivityIndicator size={'small'} color='#666' style={{ alignSelf: 'center' }} />
            :
            <TouchableOpacity onPress={buttonUnLike}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                  }}
                  source={require('../../assets/imgs/nao-gostar.png')}
                />
                <Text style={{ paddingLeft: 5, color: unLikeColor }}>Não gostei</Text>
                {badgeCountUnLike > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{badgeCountUnLike}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          }
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
});

export default PostCard;
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, ActivityIndicator, Alert, FlatList, Linking } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Modal from 'react-native-modalbox';


/* Contexts */
import { useAuth } from '../../../../contexts/auth';

/* Services */
import { feedList } from '../../../../services/Score/feedList';
import { scoreLike } from '../../../../services/Score/like';
import { feedItenracaoList } from '../../../../services/Score/interacaoFeed';
import { comentList } from '../../../../services/Score/chargeComents';
import { addFeedComent } from '../../../../services/Score/addComent';

/* Styles */
import {
    Container,
    Body,
    InterView
} from './styles'

import style from './styles';


/* Components */
import Skeleton from '../../../../components/Skeleton';
import PostCard from '../../../../components/CardPubs';
import InterCard from '../../../../components/Card';
import HeaderStack from '../../../../components/HeaderStack';
import MyFAB from '../../../../components/FabButton';



const ScoreMain: React.FC = () => {

    const { user } = useAuth();
    const navigation = useNavigation();

    const [feedItens, setFeedItens] = useState(Object())
    const [feedItensLikes, setFeedItensLikes] = useState(Object())
    const [feedComents, setFeedComents] = useState(Object())


    const [idPostComentario, setIdPostComentario] = useState<number>()
    const [origemPost, setOrigemPost] = useState<string>('')
    const [inputComentario, onChangeInput] = useState<string>('')

    const [loadingLike, onLoadingLike] = useState<boolean>(false)
    const [loadingUnLike, onLoadingUnLike] = useState<boolean>(false)

    const [loadingModal, onLoadingModal] = useState<boolean>(false)

    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const modalRef = useRef<Modal>(null)

    const openModal = () => {
       modalRef.current?.open()
    }

    const closeModal = () => {
        setFeedComents({})
        onChangeInput('')
    }


    const postsComents = async (itemId: any, itemOrigem: any) => {
        openModal()
        onLoadingModal(true)
        const res = await comentList(itemId, itemOrigem)
        if (!res) {
            Alert.alert('Atenção', 'Erro ao carregar os comentarios, por favor, tente novamente')
        } else {
            setIdPostComentario(itemId)
            setOrigemPost(itemOrigem)
            setFeedComents((await res).data)
        }
        onLoadingModal(false)
    }

    async function renderPubList() {
        const res = await feedList(user?.Id)
        setFeedItens(res.data)
    }

    useEffect(() => {
        renderPubList()
        teste()
    }, [])

    function getLikesByPostId(postId: any, like: any, type: any) {

        return feedItensLikes.filter((likeInfo: any) => likeInfo.Id_Destaque == postId && likeInfo.Likes == like && likeInfo.Origem == type).reduce((total: any) => total + 1, 0);
    }

    function getUnLikesByPostId(postId: any, like: any, type: any) {
        return feedItensLikes.filter((likeInfo: any) => likeInfo.Id_Destaque == postId && likeInfo.N_Likes == like && likeInfo.Origem == type).reduce((total: any) => total + 1, 0);
    }

    function getLikesByUser(postId: any, userId: any, type: any) {
        return feedItensLikes.filter((likeInfo: any) => likeInfo.Id_Destaque == postId && likeInfo.Id_Usuario == userId && likeInfo.Likes == 1 && likeInfo.Origem == type)
    }

    function getUnLikesByUser(postId: any, userId: any, type: any) {
        return feedItensLikes.filter((likeInfo: any) => likeInfo.Id_Destaque == postId && likeInfo.Id_Usuario == userId && likeInfo.N_Likes == 1 && likeInfo.Origem == type)
    }

    async function teste() {
        const res = await feedItenracaoList(1)
        setFeedItensLikes(res.data)

    }

    async function addComentario(userId: any, idDestaque: any, comentario: string, origem: string) {
        
        
        onLoadingModal(true)
        const res = await addFeedComent(userId, idDestaque, comentario, origem)


        if (!res) {
            Alert.alert('Atenção', 'Erro ao tentar publicar o comentario, favor tentar novamente mais tarde.')
        } else {
            await postsComents(idDestaque, origem)
            onChangeInput('')
        }
        onLoadingModal(false)
    }

    async function handleLike(userId: any, itemId: any, itemSelect: number, itemOrigem: string) {
        

        if (itemSelect == 1) {
            onLoadingLike(true)
        } else if (itemSelect == 0) {
            onLoadingUnLike(true)
        }

        const res = await scoreLike(userId, itemId, itemSelect, itemOrigem)
        if (!res) {
            Alert.alert('', 'Erro ao efetuar a ação, por favor, tente novamente.')
        } else {
            await teste()
        }
        if (itemSelect == 1) {
            onLoadingLike(false)
        } else if (itemSelect == 0) {
            onLoadingUnLike(false)
        }
    }


    const renderList = ({ item }: any) => {
        const likeInfo = getLikesByPostId(item.id, 1, item.type);
        const unLikeInfo = getUnLikesByPostId(item.id, 1, item.type)

        const userLikes = getLikesByUser(item.id, user?.Id, item.type)
        const userUnLikes = getUnLikesByUser(item.id, user?.Id, item.type)
        const convertTagHtml = { html: item.body.replace(/\/\/gruporegra\.com\.br/g, "http://gruporegra.com.br") }
        const getName = item.nameCad.split(" ")
        const getNameRec = item.nameRec != null ? item.nameRec.split(" ") : ''

        return (
            <PostCard
                image={item.ftCad}
                imageRec={item.ftRec}
                userName={getName[0] + ' ' + getName[1]}
                nameRec={ item.nameRec !== null ? getNameRec[0] + ' ' + getNameRec[1] : '' }
                pubTitle={item.title}
                description={convertTagHtml}
                buttonLike={() => handleLike(user?.Id, item.id, 1, item.type)}
                likeColor={userLikes.length > 0 ? '#218afc' : '#666666'}
                badgeCountLikes={likeInfo}
                buttonComent={() => postsComents(item.id, item.type)}
                buttonUnLike={() => handleLike(user?.Id, item.id, 0, item.type)}
                unLikeColor={userUnLikes.length > 0 ? 'red' : '#666666'}
                badgeCountUnLike={unLikeInfo}
                loadingLike={loadingLike}
                loadingUnLike={loadingUnLike}
            />
        )
    }

    const renderComentList = ({ item }: any) => {
        
        const convertTexto = item.userName.toLowerCase()

        const convertTagHtml = { html: item.postComent.replace('href="', 'href="http://gruporegra.com.br') }

        return (
               <InterCard
                image={item.foto}
                userName={convertTexto.charAt(0).toUpperCase() + convertTexto.slice(1)}
                description={convertTagHtml}
                />
        )
    }



    return (
        <GestureHandlerRootView style={{flex: 1}}>
        <Container>

            <HeaderStack title='Score' goBack={() => navigation.goBack()} disabled={false} />

            <Body>

                {feedItens.length > 0 && feedItensLikes.length > 0 ?
                    <FlatList
                        data={feedItens}
                        renderItem={renderList}
                        keyExtractor={(item) => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                    />
                    :
                    <View>
                        <Skeleton w={'100%'} h={'200px'} r={'10px'} />
                        <Skeleton w={'100%'} h={'200px'} r={'10px'} />
                        <Skeleton w={'100%'} h={'200px'} r={'10px'} />
                    </View>
                }
                <MyFAB 
                    onPressOp1={() => navigation.navigate('ScoreAFazer')}
                />
                    <Modal ref={modalRef} onOpened={openModal} onClosed={closeModal} style={style.modalCss} swipeToClose={true} swipeArea={250} swipeThreshold={50} >
                        
                        {loadingModal ?
                            <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                                <ActivityIndicator size={'large'} color='#666' />
                            </View>
                            :
                            <View style={{flex: 1, width: '100%'}}>
                            {feedComents.length > 0 ?
                            <FlatList 
                            data={feedComents}
                            renderItem={renderComentList}
                            keyExtractor={(item) => item.id.toString()}
                            />
                            :
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{color: "#666", fontWeight: 'bold'}} >Sem comentarios...</Text>
                            </View>
                            }
                            <View style={{ justifyContent:'space-evenly', flexDirection:'row', alignItems: 'center', marginBottom: 15 }} >
                            <TextInput
                            placeholder='Comentar...'
                            style={style.inputModal}
                            value={inputComentario}
                            onChangeText={(text : string) => onChangeInput(text)}
                            />
                            <TouchableOpacity onPress={() =>  addComentario(user?.Id, idPostComentario, inputComentario, origemPost)}>
                            <Icon name='send-outline' size={25} color='#666' />
                            </TouchableOpacity>
                            </View>
                        </View>
                        }
                    </Modal>
            </Body>
        </Container>
        </GestureHandlerRootView>
    )
}

export default ScoreMain
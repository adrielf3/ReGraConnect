import React, { useState, useEffect, useRef } from "react";
import { Text, TextInput, Button, View, FlatList, Alert, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/Ionicons'


import { actionInfo } from "../../../../../../services/Score/actionInfo";
import { actionComentList } from "../../../../../../services/Score/chargeActionComent";

import { useAuth } from '../../../../../../contexts/auth';

import HeaderStack from '../../../../../../components/HeaderStack';
import CardAcoes from "../../../../../../components/CardAcoes";
import InterCard from '../../../../../../components/Card';
import style from "./styles";

import { BottomTabs } from "./styles";

const AFazer: React.FC = () => {

    const modalRef = useRef<Modal>(null)
    const inputModalRef = useRef<TextInput>(null)

    const { user } = useAuth();
    const navigation = useNavigation();

    const [data, setData] = useState(Object())
    const [filterData, onFilter] = useState(Object())
    const [fase, setFase] = useState<Number>(1)
    const [loadingData, onLoadingData] = useState(Boolean)

    
    const [loadingModal, onLoadingModal] = useState<boolean>(false)
    const [actionComents, setActionComents] = useState(Object())
    const [inputComentario, onChangeInput] = useState<string>('')


    const openModal = () => {
        modalRef.current?.open()
        /* inputModalRef.current?.focus() */
    }

    const closeModal = () => {
        setActionComents({})
        onChangeInput('')
    }

    const itens = async () => {
        onLoadingData(true)
        const res = await actionInfo(user?.CPF)
        if (!res) {
            Alert.alert('', 'Erro ao carregar as informações, tente novamente mais tarde.')
        } else {
            setData(res.data)
        }
        onLoadingData(false)
    }

    const filterItens = async (fase : number = 1) => {
        const filteredItems = data.filter((item : any) => item.Fase == fase);
        onFilter(filteredItems);
    }

    const comentsCharge = async (itemId: any) => {
        openModal()
        onLoadingModal(true)
        const res = await actionComentList(itemId)
        if (!res) {
            Alert.alert('Atenção', 'Erro ao carregar os comentarios, por favor, tente novamente')
        } else {
            setActionComents(res.data)
        }
        onLoadingModal(false)
    }


    useEffect(() => {
        itens()
    }, [])

    useEffect(() => {
        filterItens()
    }, [data])

    const buttonIniciar = (
        <View style={style.buttonView} >
            <TouchableOpacity style={style.button} onPress={openModal}>
                <Text style={{ fontWeight: 'bold', color: '#ececec' }}>Iniciar</Text>
            </TouchableOpacity>
        </View>
    )


    const renderList = ({ item }: any) => {
        const dataOriginal = item.Prazo;
        const partes = dataOriginal.split('-');
        const dataFormatada = partes[2] + '-' + partes[1] + '-' + partes[0];


        return (
            <CardAcoes
                userName={item.DEMANDANTE}
                image={item.Foto_DEMANDANTE}
                pubTitle={item.Kpi}
                acao={item.Oque_Acao}
                como={item.Como}
                meta={item.Meta}
                prazo={dataFormatada}
                buttonComent={() => comentsCharge(item.Solicitacao_id)}
                anyButton={buttonIniciar}
            />
        )
    }

    const renderComentList = ({ item }: any) => {

        const convertTexto = item.comentName.toLowerCase()

        const convertTagHtml = { html: item.msg.replace('href="', 'href="http://gruporegra.com.br') }

        return (
            <InterCard
                image={item.foto}
                userName={convertTexto.charAt(0).toUpperCase() + convertTexto.slice(1)}
                description={convertTagHtml}
            />
        )
    }

    async function addComentario() {
        onLoadingModal(true)

        onLoadingModal(false)
    }

    return (
        <View style={{ flex: 1 }}>
            <HeaderStack title='Score' goBack={() => navigation.goBack()} disabled={false} />
            {loadingData == false ?
                <View style={{ flex: 1 }}>
                    {filterData.length > 0 ?
                        <FlatList
                            data={filterData}
                            renderItem={renderList}
                            keyExtractor={(item) => item.Solicitacao_id.toString()}
                            contentInset={{ bottom: 100 }}
                            contentContainerStyle={{ paddingBottom: 100 }}
                        />
                        :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: '#666' }} >Não existem ações pendentes...</Text>
                        </View>
                    }
                </View>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={'large'} color={'#6ac7ef'} />
                </View>
            }



            <Modal ref={modalRef} onOpened={openModal} onClosed={closeModal} style={style.modalCss} swipeToClose={true} swipeArea={250} swipeThreshold={50} >

                {loadingModal ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={'large'} color='#666' />
                    </View>
                    :
                    <View style={{ flex: 1, width: '100%' }}>
                        {actionComents.length > 0 ?
                            <FlatList
                                data={actionComents}
                                renderItem={renderComentList}
                                keyExtractor={(item) => item.coment_Id.toString()}
                            />
                            :
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: "#666", fontWeight: 'bold' }} >Sem comentarios...</Text>
                            </View>
                        }
                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center', marginBottom: 15 }} >
                            <TextInput
                                placeholder='Comentar...'
                                ref={inputModalRef}
                                style={style.inputModal}
                                value={inputComentario}
                                onChangeText={(text: string) => onChangeInput(text)}
                            />
                            <TouchableOpacity onPress={() => addComentario()}>
                                <Icon name='send-outline' size={25} color='#666' />
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </Modal>
            <View style={{ position: 'relative', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                <View style={style.tabBottom}>
                    <TouchableOpacity onPress={() => filterItens(1)} style={{ alignItems: 'center' }}>
                        <Icon name="warning-outline" size={25} />
                        <Text>A Fazer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => filterItens(2)} style={{ alignItems: 'center' }}>
                        <Icon name="warning-outline" size={25} />
                        <Text>Fazendo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => filterItens(3)} style={{ alignItems: 'center' }}>
                        <Icon name="warning-outline" size={25} />
                        <Text>Feitos</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


export default AFazer

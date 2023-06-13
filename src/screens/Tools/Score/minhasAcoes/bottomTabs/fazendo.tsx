import React from "react";
import {Text, View} from 'react-native'
import { useNavigation } from '@react-navigation/native';



import HeaderStack from '../../../../../components/HeaderStack';

const Fazendo : React.FC = () => {

    const navigation = useNavigation();

    return(
        <View>
            <HeaderStack title='Score' goBack={() => navigation.goBack()} disabled={false} />
        </View>
    )
}


export default Fazendo
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  AddAction,
  AddBody,
  AddButton,
  AddTitle,
  AddNumberPeople
} from './styles';

type Props = {
  collaborators: number;
  onPressLeft: any;
  onPressRight: any;
  disabled: boolean;
}

function HeaderButtons({ collaborators, onPressLeft, onPressRight, disabled }: Props) {

  return (
    <AddAction>
      <AddBody direction={0}>
        <AddButton onPress={onPressLeft} disabled={disabled}>
          <View style={{ width: '30%' }}>
            <Icon name='add-circle' size={35} color='#676F85' />
          </View>
          <View style={{ width: '70%' }}>
            <AddTitle>Adicionar ações</AddTitle>
          </View>
        </AddButton>
      </AddBody>
      <AddBody direction={1}>
        <AddButton onPress={onPressRight} disabled={disabled}>
          <View style={{ width: '30%', alignItems: 'center' }}>
            <AddNumberPeople>{collaborators}</AddNumberPeople>
          </View>
          <View style={{ width: '70%' }}>
            <AddTitle>Colaboradores{'\n'}envolvidos</AddTitle>
          </View>
        </AddButton>
      </AddBody>
    </AddAction>
  )
}

export default HeaderButtons;
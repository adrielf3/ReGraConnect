import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import styles, {
  Container,
  TitleBody,
  Title,
  Body
} from './styles';

type Props = {
  title: string;
  value: string | any;
  onChange: any;
}

function InputMask({ title, value, onChange }: Props) {

  return (
    <Container>
      <TitleBody>
        <Title>{title}</Title>
      </TitleBody>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={value}
        maxLength={100}
        numberOfLines={4}
        multiline={true}
        textAlignVertical='top'
        placeholder='...'
        placeholderTextColor='#404040'
      />
    </Container >
  )
}

export default InputMask;
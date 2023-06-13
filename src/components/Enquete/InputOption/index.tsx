import React, { useState } from 'react';
import { TextInput } from 'react-native';
import styles, {
  Container
} from './styles';

type Props = {
  value: string | any;
  onChange: any;
  maxLength: number;
}

function InputMask({ value, onChange, maxLength }: Props) {

  return (
    <Container>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={value}
        maxLength={maxLength}
        placeholder='Adicionar'
        placeholderTextColor='#aaaaaa'
      />
    </Container >
  )
}

export default InputMask;
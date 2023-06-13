import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInputMask } from 'react-native-masked-text'
import styles, {
  Container,
  TextInput,
  Body,
  BodyIcon
} from './styles';

type Props = {
  type: string;
  onChangeText: any;
  value: string;
  placeholder: string;
  secureTextEntry: boolean;
  iconNameLeft: string;
  iconLeft: boolean;
  iconNameRight: string;
  iconRight: boolean;
  onPress: any;
}

function Input({
  type,
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
  iconNameLeft,
  iconLeft,
  iconNameRight,
  iconRight,
  onPress
}: Props) {

  return (
    <Container>
      <Body>
        {iconLeft &&
          <Icon name={iconNameLeft} size={24} color='#676F85' />
        }

        {type === 'cpf' ? (
          <TextInputMask
            style={styles.input}
            type={'cpf'}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor='#676F85'
            secureTextEntry={secureTextEntry}
          />
        ) : (
          <TextInput
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
          />
        )}
      </Body>
      <BodyIcon onPress={onPress}>
        {iconRight &&
          <Icon name={iconNameRight} size={24} color='#676F85' />
        }
      </BodyIcon>
    </Container >
  )
}

export default Input;
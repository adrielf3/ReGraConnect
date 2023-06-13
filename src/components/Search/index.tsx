import React from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Container,
  TextInputContainer,
  TextInput,
  SearchContainer,
  Search
} from './styles';

function Button() {

  return (
    <Container>
      <TextInputContainer>
        <TextInput style={{ color: '#404040' }} />
      </TextInputContainer>
      <SearchContainer>
        <Search onPress={() => Alert.alert('', 'Buscando...')}>
          <Icon name='search-outline' size={25} color='#676F85' />
        </Search>
      </SearchContainer>
    </Container>
  )
}

export default Button;
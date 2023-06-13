import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Container,
  Body,
  DescContainer,
  Title
} from './styles';

type Props = {
  icon: string,
  title: string,
  onPress: any
}

function ListItem({ icon, title, onPress }: Props) {

  return (
    <Container>
      <Body onPress={onPress}>
        <DescContainer>
          <Icon style={{ marginRight: 10 }} name={icon} size={30} color='#676F85' />
          <Title>{title}</Title>
        </DescContainer>
        <Icon name='chevron-forward-outline' size={30} color='#C8C8C8' />
      </Body>
    </Container>
  )
}

export default ListItem;
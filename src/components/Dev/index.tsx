import React from 'react';
import {
  Container,
  Item,
  Avatar,
  Name,
  Speciality,
  DevProps
} from './styles';

export type DevDataProps = {
  id: string;
  name: string;
  avatar: string;
  speciality: string;
}

type Props = DevProps & {
  data: DevDataProps;
}

function Dev({ type, data, ...rest }: Props) {

  return (
    <Container>
      <Item type={type} {...rest}>
        <Avatar source={{ uri: data.avatar }} />
        <Name>{data.name}</Name>
        <Speciality>{data.speciality}</Speciality>
      </Item>
    </Container>
  )
}

export default Dev;
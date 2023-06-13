import React from 'react';
import { Image } from 'react-native';
import {
  Container,
  Card,
  TitleTool
} from './styles';

type Props = {
  title: string;
  color: string;
  img: number;
  accessTool: any;
}

function Tool({ title, color, img, accessTool }: Props) {

  function Img() {
    switch (img) {
      case 1:
        return (
          <Card color={color}>
            <Image style={{ width: 50, height: 50 }} source={require('../../assets/imgs/trabalhador-da-construcao.png')} />
          </Card>
        );

      case 2:
        return (
          <Card color={color}>
            <Image style={{ width: 50, height: 50 }} source={require('../../assets/imgs/project.png')} />
          </Card>
        );

      case 3:
        return (
          <Card color={color}>
            <Image style={{ width: 50, height: 50 }} source={require('../../assets/imgs/enquete.png')} />
          </Card>
        );

      default:
        return (
          <Card color={color}>
            <Image style={{ width: 50, height: 50 }} source={require('../../assets/imgs/cloud-computing.png')} />
          </Card>
        );
    }
  }

  return (
    <Container onPress={accessTool} >
      <Img />
      <TitleTool>{title}</TitleTool>
    </Container>
  )
}

export default Tool;
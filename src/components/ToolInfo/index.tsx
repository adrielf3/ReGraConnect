import React from 'react';
import { Image } from 'react-native';
import {
  AboutTool,
  HeaderAbout,
  ContainerTitle,
  Title,
  ImgContainer,
  SubTitle,
  P
} from './styles';

type Props = {
  title: string;
  subTitle: object | any;
  img: number
}


function Button({ title, subTitle, img }: Props) {

  function Img() {
    switch (img) {
      case 1:
        return (
          <ImgContainer>
            <Image style={{ width: 90, height: 90, resizeMode: 'contain' }} source={require('../../assets/imgs/epi.png')} />
          </ImgContainer>
        );

      case 2:
        return (
          <ImgContainer>
            <Image style={{ width: 90, height: 90, resizeMode: 'contain' }} source={require('../../assets/imgs/project-management.png')} />
          </ImgContainer>
        );

      case 3:
        return (
          <ImgContainer>
            <Image style={{ width: 90, height: 90, resizeMode: 'contain' }} source={require('../../assets/imgs/enquete2.png')} />
          </ImgContainer>
        );

      default:
        return (
          <ImgContainer>
            <Image style={{ width: 90, height: 90, resizeMode: 'contain' }} source={require('../../assets/imgs/cloud-computing.png')} />
          </ImgContainer>
        );
    }
  }

  return (
    <>
      <Title>Objetivo:</Title>
      <AboutTool>
        <HeaderAbout>
          <ContainerTitle>
            <Title>{title}</Title>
          </ContainerTitle>
          <Img />
        </HeaderAbout>
        <SubTitle>Aplicação:</SubTitle>
        {subTitle.map((item: { label: string, value: number }, index: number) => (
          <P key={index}>&#10687; {item.label}</P>
        ))}
      </AboutTool>
    </>
  )
}

export default Button;
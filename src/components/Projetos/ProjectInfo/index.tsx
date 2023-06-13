import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ProjectHeader,
  ProjectBody,
  ProjectName
} from './styles';

type Props = {
  title: string;
  onPress: any;
}

function HeaderButtons({ title, onPress }: Props) {

  return (
    <ProjectHeader onPress={onPress}>
      <ProjectBody>
        <View style={{ width: '90%' }}>
          <ProjectName>{title}</ProjectName>
        </View>
        <View style={{ width: '10%' }}>
          <Icon name='information-circle' size={30} color='#676F85' />
        </View>
      </ProjectBody>
    </ProjectHeader>
  )
}

export default HeaderButtons;
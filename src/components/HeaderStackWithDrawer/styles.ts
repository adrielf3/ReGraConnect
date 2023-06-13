import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0px 35px;
  padding-top: ${Platform.OS == 'ios' ? '80px' : '35px'};
`;
export const IconBody = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  padding: 5px;
  border-radius: 10px;
`;
export const TitleContainer = styled.View`
  /* border-width: 1px; */
  width: 100%;
  padding-right: 80px;
`;
export const Title = styled.Text`
  font-size: 21px;
  color: ${({ theme }) => theme.COLORS.TEXT_800};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
  text-align: center;
`;
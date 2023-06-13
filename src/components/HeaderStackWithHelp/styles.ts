import styled from 'styled-components/native';
import { Platform } from 'react-native';

export type ColorProps = {
  color: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 35px;
  padding-top: ${Platform.OS == 'ios' ? '80px' : '35px'};
`;
export const IconBody = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
}) <ColorProps>`
  background-color: ${props => props.color ? ({ theme }) => theme.COLORS.BACKGROUND : ({ theme }) => theme.COLORS.PRIMARY_800};
  padding: 5px;
  border-radius: 10px;
`;
export const Title = styled.Text`
  font-size: 21px;
  color: ${({ theme }) => theme.COLORS.TEXT_800};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
  text-align: center;
`;
import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Body = styled.View`  
  justify-content: center;
  align-items: center;
  padding: 0px 35px;
  margin-bottom: ${Platform.OS === 'ios' ? '40px' : '0px'};
`;
export const Title = styled.Text`
  font-size: 14px;
  text-align: justify;
  color: ${({ theme }) => theme.COLORS.TEXT_800};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`
export const Paragraph = styled.Text`
  font-size: 18px;
  text-align: justify;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`
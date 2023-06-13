import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_800};
`;

export const Body = styled.View`
  padding: 20px 35px 0px 35px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const Title = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.TEXT_800};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;

export const ButtonContainer = styled.View`
  margin: ${Platform.OS === 'ios' ? '10px 35px 30px 35px' : '10px 35px 20px 35px'};
`;
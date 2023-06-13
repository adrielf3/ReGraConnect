import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_800};
`;

export const Body = styled.View`
  padding: 20px 35px 0px 35px;
`;

export const ItemContainer = styled.View`
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const ItemBody = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ImgContainer = styled.View`
  width: 20%;
`;

export const TitleContainer = styled.View`
  width: 80%;
  padding-left: 10px;
`;

export const Title = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const SubTitle = styled.Text`
  font-size: 10px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;
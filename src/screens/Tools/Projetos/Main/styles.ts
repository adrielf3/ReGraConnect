import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_800};
`;

export const Body = styled.View`
  padding: 20px 35px 0px 35px;
`;

export const Title = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.TEXT_800};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;

export const ContainerItem = styled.View`
  padding: 10px 0px;
`;

export const Item = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const ItemContainerTitle = styled.View`
  width: 80%;
`;

export const ItemTitle = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const ItemSubTitle = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.TEXT_800};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;

export const ItemNumberTitle = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const ContainerNext = styled.View`
  width: 20%;
  align-items: flex-end;
`;
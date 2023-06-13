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
  padding: 5px 0px;
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

export const ModalAddActionContainer = styled.View`
  flex: 1px;
  justify-content: flex-start;
  padding-top: ${Platform.OS === 'ios' ? '60px' : '20px'};
  background-color: rgba(000,000,000,0.3);
`;

export const ModalBody = styled.View`
  justify-content: center;
  height: 215px;
  border-radius: 10px;
  padding: 10px 20px;
  margin: ${Platform.OS === 'ios' ? '0px 20px 30px 20px' : '0px 20px 20px 20px'};
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const ModalTitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  margin-bottom: 5px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.PRIMARY_900};
`;

export const ModalTitleBody = styled.View`
  width: 80%;
`;

export const ModalTitle = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const ModalIconBody = styled.View`
  width: 20%;
`;

export const ModalIcon = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  padding: 5px;
  border-radius: 10px;
  align-items: flex-end;
`;

export const ModalInfoContainer = styled.View`
`;

export const ModalButton = styled.View`
  margin-bottom: 10px;
`;
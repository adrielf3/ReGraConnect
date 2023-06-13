import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_800};
`;

export const Body = styled.View`
  flex: 1;
  padding: 20px 35px 0px 35px;
`;

export const ButtonContainer = styled.View`
  margin: ${Platform.OS === 'ios' ? '10px 0px 30px 0px' : '10px 0px 20px 0px'};
`;

export const BodyInfo = styled.View`
  border-bottom-width: 1px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-color: ${({ theme }) => theme.COLORS.PRIMARY_900};
`;

export const HeaderInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const TitleSub = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.TEXT_800};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;

export const ContainerType = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BodyItem = styled.View`
  flex: 1;
  border-radius: 10px;
  padding: 0px 10px;
  margin: 10px 0px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Item = styled.TouchableOpacity`
  border-bottom-width: 1px;
  padding: 10px 0px;
  border-color: ${({ theme }) => theme.COLORS.PRIMARY_800};
`;

export const RowItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ContainerModal = styled.View`
  flex: 1px;
  justify-content: flex-end;
  background-color: rgba(000,000,000,0.3);
`;

export const BodyModal = styled.View`
  /* height: 300px; */
  border-radius: 10px;
  padding: 10px 20px;
  margin: ${Platform.OS === 'ios' ? '0px 20px 30px 20px' : '0px 20px 20px 20px'};
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const ContainerTitleModal = styled.View`
  width: 80%;
`;

export const ContainerIconModal = styled.View`
  width: 20%;
`;

export const TitleModal = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  margin-bottom: 20px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.PRIMARY_900};
`;

export const ItemModal = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const QtdModal = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 120px;
`;

export const IconModalClose = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  padding: 5px;
  border-radius: 10px;
  align-items: flex-end;
`;

export const IconBody = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_800};
  padding: 5px;
  border-radius: 10px;
`;

export const ContainerTitleAlert = styled.View`
  margin-top: 5px;
  align-items: flex-end;
`;

export const TitleAlert = styled.Text`
  font-size: 10px;
  color: ${({ theme }) => theme.COLORS.TEXT_500};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;
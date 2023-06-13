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

export const ModalContainer = styled.View`
  flex: 1px;
  justify-content: flex-end;
  background-color: rgba(000,000,000,0.3);
`;

export const ModalBody = styled.View`
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

export const Title = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const SubTitle = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const SubTitleSmall = styled.Text`
  font-size: 10px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
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

export const ModalInfoBody = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Note = styled.View`
  /* margin-top: 15px; */
`;

export const NoteTitle = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const NoteContainer = styled.View`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  border-radius: 10px;
  padding: 5px 10px;
  margin: 5px 0px;
`;

export const NoteBody = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const NoteBodyName = styled.View`
  width: 70%;
`;

export type ColorProps = {
  color: boolean;
}

export const NoteName = styled.Text<ColorProps>`
  font-size: 14px;
  color: ${props => props.color ? ({ theme }) => theme.COLORS.SECONDARY_800 : ({ theme }) => theme.COLORS.TEXT_500};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;

export const NoteBodyTime = styled.View`
  width: 30%;
  align-items: flex-end;
`;

export const NoteTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.TEXT_800};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;

export const NoteUser = styled.Text`
  font-size: 10px;
  color: ${({ theme }) => theme.COLORS.TEXT_800};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;

export const ModalAddActionContainer = styled.View`
  flex: 1px;
  justify-content: flex-start;
  padding-top: ${Platform.OS === 'ios' ? '60px' : '20px'};
  background-color: rgba(000,000,000,0.3);
`;

export const ModalTypeSwitch = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
`;

export const ModalButton = styled.View`
  margin-bottom: 10px;
`;

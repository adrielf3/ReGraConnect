import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Header = styled.View`
  height: 100px;
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
`;
export const UserIMG = styled.View`
  padding: 10px;
`;
export const User = styled.View`
`;
export const UserName = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONTS.BOLD};
  color: ${({ theme }) => theme.COLORS.TEXT_900};
`;
export const UserEmail = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.TEXT_800};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;
export const Footer = styled.View`
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.TEXT_700};
`;
export const ButtonSignOut = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  justify-content: center;
  align-items: center;
  height: 50px;
  margin: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY_900};
  margin-bottom: 40px;
`;
export const TitleSignOut = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BOLD};
  color: ${({ theme }) => theme.COLORS.TEXT_500};
`;
export const ContainerVersion = styled.View`
  justify-content: center;
  align-items: center;
  height: ${Platform.OS == 'ios' ? '80px': '40px'};
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_800};
`;
export const Version = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
  color: ${({ theme }) => theme.COLORS.TEXT_800};
`;

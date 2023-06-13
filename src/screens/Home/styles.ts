import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;
export const Head = styled.View`
  width: 100%;
  padding: 0px 35px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_800};
`;
export const Menu = styled.View`
  padding-top: ${Platform.OS == 'ios' ? '80px' : '35px'};
`;
export const WecomeContainer = styled.View`
  padding: 15px 0px;
`;
export const NickName = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
  font-size: 21px;
`;
export const Message = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
  font-size: 14px;
`;
export const SearchContainer = styled.View`
  padding-bottom: 25px;
`;
export const Body = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;
export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 35px;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
  font-size: 18px;
`;
export const PlusContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  border-radius: 50px;
  padding: 5px 15px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_800};
`;
export const Plus = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT_800};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
  font-size: 14px;
`;
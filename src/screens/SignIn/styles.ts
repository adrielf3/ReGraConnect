import styled from 'styled-components/native';
import { Platform } from 'react-native';

export type FlexProps = {
  type: boolean;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`
export const Body = styled.View<FlexProps>`
  width: 75%;
  width: ${Platform.OS == 'ios' ? '75%': '80%'};
  height: 100%;
  flex-direction: column;
  justify-content: ${({ type }) => type ? 'space-evenly': 'flex-start'};
`

export const ContainerLogo = styled.View`
  justify-content: center;
  align-items: center;
`
export const Logo = styled.Image`
  width: 150px;
  height: 150px;
`
export const LogoTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
  font-size: 30px;
  text-align: center;
`
export const ContainerInput = styled.View`
  margin-top: 30px;
  height: 200px;
  flex-direction: column;
  justify-content: space-between;
`
export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
  font-size: 16px;
`
export const ButtonForgotUse = styled.TouchableOpacity`
  padding: 20px 0px;
`
export const ForgotUseTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
  font-size: 16px;
  text-align: right;
`
export const Version = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
  font-size: 14px;
  text-align: center;
`
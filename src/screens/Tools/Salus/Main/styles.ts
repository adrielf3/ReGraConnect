import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_800};
`;

export const Body = styled.View`
  padding: 20px 35px 0px 35px;
  /* padding: ${Platform.OS === 'ios' ? '20px 35px 0px 35px' : '40px 35px 0px 35px'}; */
`;

export const ButtonContainer = styled.View`
  margin: ${Platform.OS === 'ios' ? '10px 0px 30px 0px' : '10px 0px 20px 0px'};
`;

export const AboutTool = styled.View`
  padding: 10px;
  border-radius: 10px;
  margin: 15px 0px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const HeaderAbout = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ContainerTitle = styled.View`
  width: 70%;
`;

export const Title = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const Img = styled.View`
  width: 30%;
  align-items: flex-end;
`;

export const SubTitle = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const P = styled.Text`
margin: 4px 0px;
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.TEXT_800};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;

export const ContainerTitleAlert = styled.View`
  align-items: flex-end;
`;

export const TitleAlert = styled.Text`
  font-size: 10px;
  color: ${({ theme }) => theme.COLORS.TEXT_500};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;
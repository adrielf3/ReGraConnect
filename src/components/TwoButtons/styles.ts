import styled from 'styled-components/native';

export const Container = styled.View`
height: 100px;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 35px 0px 35px;
`;
export const Body = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const ContainerButton = styled.View`
  width: 48%;
`;
export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  justify-content: center;
  align-items: center;
  height: 50px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.TEXT_900};
`;
export const ButtonTitle = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.BACKGROUND};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;
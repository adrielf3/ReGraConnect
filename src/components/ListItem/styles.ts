import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 10px 0px;
`;
export const Body = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border-radius: 10px;
`;
export const DescContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const Title = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;
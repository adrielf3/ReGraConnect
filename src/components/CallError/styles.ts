import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const Body = styled.View`
  padding: 0px 35px;
`;
export const Img = styled.View`
  align-items: center;
`;
export const Msg = styled.View`
  align-items: center;
  margin: 20px 0px;
`;
export const Title = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;
export const SubTitle = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;
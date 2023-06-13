import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TitleContainer = styled.View`
  padding-top: 2px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.COLORS.TEXT_800};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;

export const IconBodyGreen = styled.View`
  background-color: #F5FAEB;
  padding: 5px;
  border-radius: 10px;
  margin-left: 10px;
`;

export const IconBody = styled.View`
  background-color: #F3F3F3;
  padding: 5px;
  border-radius: 10px;
  margin-left: 10px;
`;
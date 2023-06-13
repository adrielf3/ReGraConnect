import styled from 'styled-components/native';

type Color = {
  color: string
}

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  width: 80px;
  margin-right: 20px;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
`;
export const Card = styled.View<Color>`
  width: 80px;
  height: 80px;
  padding: 10px;
  border-radius: 30px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color};
`;
export const TitleTool = styled.Text`
  font-size: 12px;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.TEXT_800};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;

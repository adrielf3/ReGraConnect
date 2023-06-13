import styled, { css } from 'styled-components/native';

export type ColorProps = {
  color: boolean;
}

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})<ColorProps>`
  justify-content: center;
  align-items: center;
  height: 50px;
  border-radius: 10px;
  background-color: ${props => props.color ? ({ theme }) => theme.COLORS.TEXT_900 : ({ theme }) => theme.COLORS.PRIMARY_800}
`;
export const Title = styled.Text<ColorProps>`
  font-size: 16px;
  color: ${props => props.color ? ({ theme }) => theme.COLORS.TEXT_600 : ({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;
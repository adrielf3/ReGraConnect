import styled, { css } from 'styled-components/native';

export type DevProps = {
  type: 'primary' | 'secondary'
}

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  width: 50%;
  height: 120%;
  padding: 10px;
`
export const Item = styled.View<DevProps>`
  background-color: ${({ theme, type }) => type === 'primary' ? theme.COLORS.PRIMARY_800 : theme.COLORS.BACKGROUND};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  ${({ type, theme }) =>  type === 'primary' && css`
    border-width: 1px;
    border-color: ${theme.COLORS.TEXT_700};
  `}
`
export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  margin: 15px 0px;
`;
export const Name = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;
export const Speciality = styled.Text`
  color: ${({ theme }) => theme.COLORS.TEXT_800};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;
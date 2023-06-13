import styled, { css } from 'styled-components/native';

export type Props = {
  type: boolean;
}

export const Body = styled.View`
  padding: 20px 35px 0px 35px;
`;

export const ProfileContainer = styled.View`
  margin-bottom: 20px;
`;

export const ProfileBody = styled.View`
  align-items: center;
  margin: 0px 0px 20px 0px;
`;

export const Title = styled.Text<Props>`
  text-align: center;
  color: ${({ theme }) => theme.COLORS.TEXT_800};
  ${({ type }) => type ? css`  
    font-size: 16px;
    font-family: ${({ theme }) => theme.FONTS.BOLD};
  ` : css`
    font-size: 14px;
    font-family: ${({ theme }) => theme.FONTS.REGULAR}
  `}
`;
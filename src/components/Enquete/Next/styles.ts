import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconBody = styled.View`
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_800};
  padding: 5px;
  border-radius: 10px;
`;
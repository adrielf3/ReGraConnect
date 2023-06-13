import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
`;
export const ActivityIndicator = styled.ActivityIndicator.attrs(({ theme }) => ({
  size: 'large',
  color: theme.COLORS.PRIMARY_900
}))``;
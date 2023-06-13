import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_800};
`;
export const Body = styled.View`
  padding: 20px 35px 0px 35px;
`;
export const ButtonContainer = styled.View`
  margin: ${Platform.OS === 'ios' ? '10px 0px 30px 0px' : '10px 0px 20px 0px'};
`;

import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
import { DevDataProps } from '../../components/Dev';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Array = styled(FlatList as new (props: FlatListProps<DevDataProps>) => FlatList<DevDataProps>)``;
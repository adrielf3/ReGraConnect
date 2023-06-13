import styled from 'styled-components/native';

export const AddAction = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export type DirectionProps = {
  direction: number;
}

export const AddBody = styled.View<DirectionProps>`
  width: 50%;
  align-items: ${props => props.direction == 0 ? 'flex-start' : 'flex-end'};
`;

export const AddButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  padding: 0px 10px;
  height: 60px;
  width: 95%;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const AddTitle = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;

export const AddNumberPeople = styled.Text`
  text-align: center;
  font-size: 28px;
  color: ${({ theme }) => theme.COLORS.TEXT_800};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;
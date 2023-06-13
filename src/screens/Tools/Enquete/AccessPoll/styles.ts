import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_800};
`;

export const Body = styled.View`
  padding: 20px 35px 0px 35px;
`;

export const Title = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.TEXT_800};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;

export const QuestionContainer = styled.View`
  padding: 10px 10px;
`;

export const Question = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;

export const PollCreatedBy = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-color: #aaaaaa;
`;

export const OptionContainer = styled.View`
  padding: 10px 0px;
`;

export const OptionBody = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  padding: 10px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const OptionTitleContainer = styled.View`
  width: 70%;
`;

export const OptionTitle = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const OptionIcon = styled.View`
  width: 30%;
  align-items: flex-end;
`;
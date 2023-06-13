import styled from 'styled-components/native';

export const ProjectHeader = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  margin-bottom: 10px;
`;

export const ProjectBody = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProjectName = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const ProjectCreator = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.BOLD};
`;

export const ProjectTitle = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;
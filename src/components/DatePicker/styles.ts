import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 10px;
`;
export const TitleBody = styled.View`
  margin-bottom: 5px;
`;
export const Title = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.TEXT_800};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;
export const Body = styled.TouchableOpacity`
  justify-content: center;
  height: 50px;
  border-radius: 10px;
  padding: 0px 10px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;
export const BodyIOS = styled.View`
  justify-content: center;
  height: 50px;
  border-radius: 10px;
  padding: 0px 10px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;
export const ContainerIOS = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const TextInput = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;
export const ContainerAndroid = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const TitleAndroid = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`
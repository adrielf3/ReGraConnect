import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 100,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    fontFamily: 'IstokWeb-Regular',
    color: '#404040',
    fontSize: 16
  }
});

export default styles;

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

export const Body = styled.View`
  height: 50px;
  border-radius: 10px;
  padding: 0px 10px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;
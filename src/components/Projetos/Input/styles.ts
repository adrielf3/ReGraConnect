import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#F3F3F3',
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
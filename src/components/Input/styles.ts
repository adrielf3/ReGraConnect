import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.TEXT_800};
`;
export const Body = styled.View`
  flex-direction: row;
  align-items: center;
  width: 90%;
`;
export const BodyIcon = styled.TouchableOpacity`
  width: 10%;
`;
export const TextInput = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor: theme.COLORS.TEXT_800
}))`
  height: 50px;
  font-size: 18px;
  width: 90%;
  padding-left: 10px;
`;

const styles = StyleSheet.create({
  input: {
    color: '#404040',
    height: 50,
    fontSize: 18,
    width: '90%',
    paddingLeft: 10
  }
})

export default styles
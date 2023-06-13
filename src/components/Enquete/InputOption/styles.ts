import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    fontFamily: 'IstokWeb-Regular',
    color: '#404040',
    fontSize: 16
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#404040'
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#404040'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    borderRadius: 10,
    fontSize: 16,
    color: '#404040'
  },
});

export default styles;

export const Container = styled.View`
  margin-bottom: 10px;
`;
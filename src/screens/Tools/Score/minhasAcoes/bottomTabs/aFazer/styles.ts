import { StyleSheet } from "react-native";
import styled from "styled-components/native";

const style = StyleSheet.create({
  button: {
    borderRadius: 9,
    width: '100%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6ac7ef'
},
buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
},
  modalCss: {
    flex: 1,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems:'center'
  },
  inputModal: {
    backgroundColor: '#d9d7d2',
    width: '70%',
    borderRadius: 9,
    textAlign:'left',
    paddingLeft: 15
  },
  tabBottom: {
    width: '80%',
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf:'center',
    elevation: 5,
    flexDirection: 'row'


  }
})
export default style

export const BottomTabs = styled.View`
    position: absolute;
    background-color: blue;

`
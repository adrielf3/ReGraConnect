import styled from "styled-components/native";
import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  badge: {
    backgroundColor: 'red',
    borderRadius: 10,
    marginLeft: 5,
    width:15,
    alignItems:'center',
    justifyContent:'center',
    height:15
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
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
    textAlign:'center'
  }
})
export default style


export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_800};
`;

export const Body = styled.View`
  flex: 1;
  padding: 20px 20px 0px 20px;
`;

export const Card = styled.View`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  height: 50%;
  border-radius: 10px;
`

export const CardHeader = styled.View`
  padding: 8px;
  border-width: 1px;
  height: 30%
`

export const InterView = styled.View`
  border-top-width: 1px;
  flex-direction: row;
  border-color: #d9d7d2;
  justify-content: space-between;
  align-items: center;
`
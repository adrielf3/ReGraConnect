import styled from 'styled-components/native';
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  img: {
    borderBottomWidth: 0,
    shadowColor: Platform.OS === 'ios' ? '#000' : '#888',
    shadowOffset: { width: 2, height: 7 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 9,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  }
})

export const Container = styled.View`
  padding: 0px 35px;
`;
export const Body = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  height: 90px;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 30px;
  border-color: ${({ theme}) => theme.COLORS.PRIMARY_800};
  background-color: ${({ theme}) => theme.COLORS.BACKGROUND};
`;
export const TitleContainer = styled.View`
  width: 65%;
`;
export const Title = styled.Text`
  font-size: 21px;
  color: ${({ theme }) => theme.COLORS.TEXT_900};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;
export const SubTitle = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.TEXT_800};
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;
export const ImageContainer = styled.View`
  justify-content: center;
  align-items: flex-start;
  width: 35%;
  height: 100px;
`;

export default styles;
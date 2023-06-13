import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;
export const TextInputContainer = styled.View`
  width: 85%;
`;
export const TextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholder: 'O que esta procurando?',
  placeholderTextColor: theme.COLORS.TEXT_700
}))`
  height: 50px;
  font-size: 16px;
  padding-left: 15px;
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
`;
export const SearchContainer = styled.View`
  width: 15%;
  align-items: center;
`;
export const Search = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  padding: 5px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_800};
`;

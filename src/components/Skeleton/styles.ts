import styled from 'styled-components/native';

type T = {
  wSize: string;
  hSize: string;
  radius: string;
}

export const Container = styled.View`
  padding: 10px 0px;
  align-items: center;
`;

export const Body = styled.View<T>`
  width: ${props => props.wSize};
  height: ${props => props.hSize};
  border-radius: ${props => props.radius};
  overflow: hidden;
  background-color: #FFFFFF;
`;
import styled from "styled-components/native";


export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_800};
`;

export const Body = styled.View`
  flex: 1;
  padding: 20px 35px 0px 35px;
`;

export const Card = styled.View`
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_800};
  border-radius: 10px;
  padding: 15px;
  margin: 10px;

`

export const CardHeader = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: #d9d7d2;
  padding-bottom: 4px;
  align-items: center;
`
export const UserIMG = styled.View`
  padding: 4px;
`
export const InterView = styled.View`
  border-top-width: 1px;
  flex-direction: row;
  border-color: #d9d7d2;
  justify-content: space-between;
  padding-top: 10px;
  align-items: center;
`;
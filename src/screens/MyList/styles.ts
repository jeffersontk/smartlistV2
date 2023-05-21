import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
  justify-content: space-between;
`;

export const Content = styled.View`
  flex: 1;
  padding: 32px;
`;

export const Footer = styled.View`
  padding: 32px;
`;

import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
  padding: 32px;
`;

export const Content = styled.View`
  flex: 1;
  gap: 16px;
`;

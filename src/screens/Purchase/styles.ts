import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const Content = styled.View`
  padding: 32px;
  flex: 1;
  justify-content: space-between;
  gap: 16px;
`;

export const Box = styled.View`
  flex: 1;
  gap: 16px;
`;

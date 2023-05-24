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

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

export const List = styled.FlatList`
  width: 100%;
  gap: 16px;
`;

export const Center = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_400};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};

  margin-bottom: 32px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_400};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

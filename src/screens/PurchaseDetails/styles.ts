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

export const ItemCart = styled.View`
  width: 100%;
  border-radius: 6px;
  padding: 16px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;
export const Quantity = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;
export const Price = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

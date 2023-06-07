import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  height: 60px;
  border-radius: 6px;
  padding: 16px;

  background-color: ${({ theme }) => theme.COLORS.CARD};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.COLORS.FONT_PRIMARY};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  width: 50%;
`;

export const Quantity = styled.Text`
  color: ${({ theme }) => theme.COLORS.FONT_PRIMARY};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  width: 25%;
`;
export const Price = styled.Text`
  color: ${({ theme }) => theme.COLORS.FONT_PRIMARY};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  width: 25%;
`;

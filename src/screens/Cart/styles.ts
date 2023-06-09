import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Content = styled.View`
  padding: 32px;
  flex: 1;
  justify-content: space-between;
  gap: 16px;
`;

export const TotalInCart = styled.View`
  width: 100%;
  padding: 32px 16px;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.COLORS.BRAND_MID};

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const TotalPrice = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

export const Box = styled.View`
  flex: 1;
  gap: 16px;
`;

export const Row = styled.View`
  /*   flex-direction: row;
  justify-content: space-between;
  align-items: center; */
  gap: 16px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

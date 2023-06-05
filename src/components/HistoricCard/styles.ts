import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 100%;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700}

  
  border-radius: 6px;
  
  padding: 16px;
  margin-bottom: 12px;
`;

export const Header = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 12px;
`;

export const MarketName = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_100};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;
export const ContentDate = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
export const PurchaseDay = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

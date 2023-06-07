import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Content = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 32px;
`;
export const Box = styled.View`
  flex: 1;
  margin-bottom: 16px;
`;
export const Label = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_400};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};

  margin-top: 32px;
  text-align: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.TITLE_PRIMARY};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};

  margin-bottom: 16px;
`;
export const Text = styled.Text`
  color: ${({ theme }) => theme.COLORS.TITLE_SECONDARY};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const NavigationButton = styled.TouchableOpacity`
  width: 100%;
  max-height: 70px;
  padding: 16px;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.COLORS.PRIMARY};

  flex-direction: row;
  align-items: center;
  gap: 8px;

  margin-bottom: 16px;
`;

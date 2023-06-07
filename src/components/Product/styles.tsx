import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 16px;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.COLORS.CARD};

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 16px;
`;

interface labelProps {
  isDisabled: boolean;
}

export const Label = styled.Text<labelProps>`
  color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.COLORS.GRAY_300 : theme.COLORS.FONT_PRIMARY};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};

  text-decoration: ${({ isDisabled }) =>
    isDisabled ? "line-through" : "none"};
`;

export const Info = styled.View`
  gap: 8px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.COLORS.TITLE_PRIMARY};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

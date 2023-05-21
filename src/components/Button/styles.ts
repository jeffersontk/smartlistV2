import styled from "styled-components/native";

interface Props {
  type?: "google" | null;
}

export const Container = styled.TouchableOpacity<Props>`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  border-radius: 6px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme, type }) =>
    type == "google" ? theme.COLORS.WHITE : theme.COLORS.BRAND_MID};
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const Title = styled.Text<Props>`
  color: ${({ theme, type }) =>
    type == "google" ? theme.COLORS.BRAND_MID : theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.WHITE,
}))``;

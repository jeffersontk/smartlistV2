import styled from "styled-components/native";

export const Container = styled.FlatList`
  width: 100%;
  max-height: 56px;
  gap: 16px;
`;

type ItemProps = {
  active?: boolean;
};

export const Item = styled.TouchableOpacity<ItemProps>`
  padding: 16px;
  border-radius: 6px;
  background-color: ${({ theme, active = false }) =>
    active ? theme.COLORS.BRAND_MID : theme.COLORS.BACKGROUND};
`;

export const Label = styled.Text<ItemProps>`
  color: ${({ theme, active = false }) =>
    active ? theme.COLORS.WHITE : theme.COLORS.GRAY_400};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

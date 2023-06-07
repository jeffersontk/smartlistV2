import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 100%;

  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

export const Circle = styled.View`
  width: 26px;
  height: 26px;
  border-radius: 40px;
  border-color: ${({ theme }) => theme.COLORS.GRAY_300};
  border-width: 2px;
`;

export const CircleSelected = styled.View`
  width: 26px;
  height: 26px;
  border-radius: 40px;
  border-color: ${({ theme }) => theme.COLORS.BRAND_MID};
  border-width: 2px;

  align-items: center;
  justify-content: center;
`;

export const InternalCircle = styled.View`
  width: 13px;
  height: 13px;

  border-radius: 40px;

  background-color: ${({ theme }) => theme.COLORS.BRAND_MID};
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.COLORS.TITLE_PRIMARY};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

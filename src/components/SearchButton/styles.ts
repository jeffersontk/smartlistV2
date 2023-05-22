import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  height: 56px;
  width: 56px;
  border-radius: 100px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  align-items: center;
  justify-content: center;
`;

export const Search = styled.View`
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  padding: 16px;
  border-radius: 40px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Input = styled.TextInput`
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};

  text-align: center;
  max-width: 250px;
`;

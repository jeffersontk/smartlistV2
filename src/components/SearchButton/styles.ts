import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  height: 56px;
  width: 56px;
  border-radius: 100px;

  background-color: ${({ theme }) => theme.COLORS.CARD};
  align-items: center;
  justify-content: center;
`;

export const Search = styled.View`
  background-color: ${({ theme }) => theme.COLORS.CARD};
  padding: 16px;
  border-radius: 40px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Input = styled.TextInput`
  color: ${({ theme }) => theme.COLORS.TITLE_PRIMARY};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};

  text-align: center;
  width: 100%;
  max-width: 250px;
`;

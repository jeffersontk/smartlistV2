import darkTheme from "./darkTheme";
import lightTheme from "./lightTheme";

export const getTheme = (isDarkMode: boolean) => {
  return isDarkMode ? darkTheme : lightTheme;
};

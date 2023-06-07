import styled from "styled-components/native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

export const Container = styled.View`
  flex: 1;

  background: ${({ theme }) => theme.COLORS.BACKGROUND};
  padding: 32px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
export const Content = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 16px;
`;

export const Avatar = styled(Image)`
  width: 150px;
  height: 150px;
  border-radius: 100px;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.COLORS.BRAND_MID};
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;
interface SwitchButtonProps {
  isActive: boolean;
}
export const SwitchButton = styled.TouchableOpacity<SwitchButtonProps>`
  width: 100px;
  height: 50px;
  background: ${({ theme }) => theme.COLORS.BRAND_MID};
  border-radius: 100px;
  justify-content: center;
  align-items: ${(props) => (props.isActive ? "flex-end" : "flex-start")};
  padding: 2px;
`;

interface CircleProps {
  isActive: boolean;
}

export const AnimatedCircle = styled(Animated.View)<CircleProps>`
  width: 40px;
  height: 40px;
  border-radius: 50px;

  justify-content: center;
  align-items: center;
`;

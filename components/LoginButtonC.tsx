import { Pressable, Text, StyleSheet, useWindowDimensions } from "react-native";
import COLORS from "../assets/data/theme";

interface Props {
  text: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "disabled";
}

const LoginButtonC = ({ text, onPress, variant = "primary" }: Props) => {
  const { width } = useWindowDimensions();
  const isDisabled = variant === "disabled";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { width: width * 0.88, opacity: pressed && !isDisabled ? 0.7 : 1 },
        variant === "secondary" && styles.secondaryButton,
        isDisabled && styles.disabledButton,
      ]}
      disabled={isDisabled}
    >
      <Text
        style={[
          styles.text,
          variant === "secondary" && styles.secondaryText,
          isDisabled && styles.disabledText,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.darkGray,
  },
  disabledButton: {
    backgroundColor: COLORS.darkGray,
    opacity: 0.5,
  },
  text: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryText: {
    color: COLORS.primary,
  },
  disabledText: {
    color: COLORS.lightGray,
  },
});

export default LoginButtonC;

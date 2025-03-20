import { Pressable, Text, StyleSheet, useWindowDimensions } from "react-native";
import COLORS from "../theme";

interface Props {
  text: string;
  onPress: () => void;
  variant?: "primary" | "secondary"; // 👈 New prop
}

const LoginButtonC = ({ text, onPress, variant = "primary" }: Props) => {
  const { width } = useWindowDimensions();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { width: width * 0.88, opacity: pressed ? 0.7 : 1 },
        variant === "secondary" && styles.secondaryButton, // 👈 Apply different styles
      ]}
    >
      <Text
        style={[
          styles.text,
          variant === "secondary" && styles.secondaryText, // 👈 Different text color
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
  text: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryText: {
    color: COLORS.primary,
  },
});

export default LoginButtonC;

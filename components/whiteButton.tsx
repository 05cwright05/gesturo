import { Pressable, Text, StyleSheet } from "react-native";

interface LoginButtonProps {
  text: string;
  onPress: () => void;
}
const loginButton = ({ text, onPress }: LoginButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <Text>{text}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 12,
  },
});
export default loginButton;

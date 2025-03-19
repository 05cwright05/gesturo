import { Text, View, Button } from "react-native";

const main_color = "red";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Button
        onPress={() => console.log("hi")}
        title="Learn More"
        color={main_color}
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={() => console.log("hi")}
        title="Learn More"
        style={{
          backgroundColor: "blue",
        }}
        color={main_color}
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

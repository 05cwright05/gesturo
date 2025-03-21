import { Text, View, Image, StyleSheet } from "react-native";
import LoginButtonC from "@/components/LoginButtonC";
import COLORS from "../assets/data/theme";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <Image
        source={require("../assets/images/sealTransparent.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>gesturo</Text>
      <Text style={styles.tagline}>Learn. Sign. Connect</Text>
      <View style={styles.buttonContainer}>
        <LoginButtonC
          text="Get Started!"
          onPress={() => router.push("/collectingInfo")}
        ></LoginButtonC>
        <View style={{ height: 10 }}></View>
        <LoginButtonC
          text="I already have an account"
          onPress={() => console.log("already have an account")}
          variant="secondary"
        ></LoginButtonC>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take full screen
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    backgroundColor: COLORS.background,
    paddingHorizontal: 20, // Add padding to avoid edge clipping
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
    marginTop: 100,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 24,
    fontWeight: "semibold",
    color: COLORS.gray,
    marginBottom: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    alignItems: "center",
  },
});

export default index;

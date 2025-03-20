import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Button,
  Pressable,
  Text,
} from "react-native";
import COLORS from "@/theme";
import { useState } from "react";
import { Link, router } from "expo-router";

const BackArrowHeader = () => {
  //num pages that we gather info
  const numTasks = 5;

  // begin at 1 progress
  const [progress, setProgress] = useState(1);

  //reduce progress by 1, if we are at no progress, return to the index page
  const handleBackArrow = () => {
    console.log("back arrow clicked");
    const new_progress = progress - 1;
    if (new_progress <= 0) {
      router.push("/");
      return;
    }
    setProgress(new_progress);
  };
  const renderSurveyContent = () => {
    switch (progress) {
      case 1:
        return <Text>Contnet Number 1!</Text>;
      case 2:
        return (
          <>
            <Text>Second Content!</Text>
            <Button title="i am button"></Button>
          </>
        );
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Pressable onPress={handleBackArrow}>
          <Image
            source={require("../assets/images/backArrow.png")}
            style={styles.arrow}
          ></Image>
        </Pressable>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.currentProgress,
              { width: `${(progress / numTasks) * 100}%` },
            ]}
          ></View>
        </View>
      </View>
      <Button
        onPress={() => setProgress(progress + 1)}
        title="See that bar climb ;)"
      ></Button>
      {renderSurveyContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: COLORS.background,
    display: "flex",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 20,
    flexDirection: "row",
    overflow: "hidden",
  },
  arrow: {
    marginLeft: 10,
  },
  progressBar: {
    backgroundColor: COLORS.darkGray,
    height: 12,
    marginLeft: 20,
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  currentProgress: {
    width: 80,
    height: 12,
    backgroundColor: COLORS.primary,
    zIndex: 99,
    borderRadius: 8,
  },
});
export default BackArrowHeader;

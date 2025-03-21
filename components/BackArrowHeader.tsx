import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Button,
  Pressable,
  Text,
} from "react-native";
import COLORS from "@/assets/data/theme";
import { useState } from "react";
import { Link, router } from "expo-router";
import Table from "./Table";
import {
  whyStudyingData,
  minuteGoalData,
  streakGoalData,
} from "@/assets/data/data";
import LoginButtonC from "./LoginButtonC";

const BackArrowHeader = () => {
  /*
   * Task 1: Why are you learning ASL?
   * Task 2: Commit to a goal
   * Task 3: Set a Streak Goal
   * Task 4: What is your name?
   * Task 5: What is your email?
   * Task 6: Set a password
   * Task 7: Get Started!
   */

  interface Props {
    data: [];
    type: "words" | "images";
    onSelect: () => void;
  }
  //num pages that we gather info
  const numTasks = 7;

  // begin at 1 progress
  const [progress, setProgress] = useState(1);

  //button to continue begins hidden
  const [showButton, setShowButton] = useState(false);

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
        return (
          <>
            <Text style={styles.taskTitle}>Why are you studying ASL?</Text>
            <Table
              data={whyStudyingData}
              type="images"
              onSelect={() => setShowButton(true)}
            ></Table>
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.taskTitle}>Commit to a daily goal</Text>
            <Table
              data={minuteGoalData}
              type="words"
              onSelect={() => setShowButton(true)}
            ></Table>
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.taskTitle}>Set a streak goal</Text>
            <Table
              data={streakGoalData}
              type="words"
              onSelect={() => setShowButton(true)}
            ></Table>
          </>
        );
      case 4:
        return (
          <>
            <Text>Collecting name</Text>
          </>
        );
      case 5:
        return (
          <>
            <Text>Collecting email</Text>
          </>
        );
      case 6:
        return (
          <>
            <Text>Collecting password</Text>
          </>
        );
    }
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.background, height: "100%" }}
    >
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
      {renderSurveyContent()}
      {showButton && (
        <View style={{ alignItems: "center" }}>
          <LoginButtonC
            text="Continue"
            onPress={() => {
              setProgress(progress + 1);
              // Optionally set showButton to false if you want to hide the button after pressing
              setShowButton(false); // Hide the button after pressing
            }}
          ></LoginButtonC>
        </View>
      )}
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
  taskTitle: {
    fontSize: 32,
    color: COLORS.gray,
    marginLeft: 10,
    marginTop: 10,
  },
});
export default BackArrowHeader;

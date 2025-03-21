import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Button,
  Pressable,
  Text,
  TextInput,
  Keyboard,
} from "react-native";
import COLORS from "@/assets/data/theme";
import { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import Table from "../components/Table";
import {
  whyStudyingData,
  minuteGoalData,
  streakGoalData,
} from "@/assets/data/data";
import LoginButtonC from "../components/LoginButtonC";
import {
  validateAge,
  validateEmail,
  validatePassword,
} from "@/assets/utils/formValidation";

const collectingInfo = () => {
  /*
   * Task 1: Why are you learning ASL?
   * Task 2: Commit to a goal
   * Task 3: Set a Streak Goal
   * Task 4: What is your name?
   * Task 5: What is your email?
   * Task 6: Set a password
   * Task 7: Get Started!
   */

  //num pages that we gather info
  const numTasks = 8;

  // begin at 1 progress
  const [progress, setProgress] = useState(1);

  //button to continue begins hidden
  const [showButton, setShowButton] = useState(false);

  //remember age
  const [age, setAge] = useState("");

  //remember firstname
  const [firstName, setFirstName] = useState("");

  //remeber lastname
  const [lastName, setLastName] = useState("");

  //remember email
  const [email, setEmail] = useState("");

  //remember password
  const [password, setPassword] = useState("");

  //reduce progress by 1, if we are at no progress, return to the index page
  const handleBackArrow = () => {
    console.log("back arrow clicked");
    setShowButton(false);
    const new_progress = progress - 1;
    if (new_progress <= 0) {
      router.push("/");
      return;
    }
    setProgress(new_progress);
  };
  //determine if the continue button should be shown or not
  useEffect(() => {
    // Determine if button should be shown based on current progress
    switch (progress) {
      case 1:
      case 2:
      case 3:
        // These are handled by the Table component's onSelect
        break;
      case 4:
        setShowButton(validateAge(age));
        break;
      case 5:
        setShowButton(firstName !== "" && lastName !== "");
        break;
      case 6:
        setShowButton(validateEmail(email));
        break;
      case 7:
        setShowButton(validatePassword(password));
        break;
    }
  }, [progress, age, firstName, lastName, email, password]);
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
            <Text style={styles.taskTitle}>How old are you?</Text>
            <View style={styles.nameContainer}>
              <TextInput
                autoFocus={true}
                placeholder="Age"
                placeholderTextColor={"#aaa"}
                keyboardType="numeric"
                textContentType="none"
                autoComplete="off"
                autoCapitalize="none"
                value={age}
                style={styles.textInput}
                onChangeText={(text) => {
                  // Only allow numeric input
                  const numericText = text.replace(/[^0-9]/g, "");
                  setAge(numericText);

                  // Validate age is between 0 and 120
                  if (validateAge(numericText)) {
                    setShowButton(true);
                  } else {
                    setShowButton(false);
                  }
                }}
                maxLength={3} // Prevent more than 3 digits
              />
            </View>
          </>
        );
      case 5:
        return (
          <>
            <Text style={styles.taskTitle}>What is your name?</Text>
            <View style={styles.nameContainer}>
              <TextInput
                autoFocus={true}
                placeholder="First name"
                placeholderTextColor={"#aaa"}
                value={firstName}
                keyboardType="default"
                style={[
                  styles.textInput,
                  { borderBottomWidth: 2, borderBottomColor: COLORS.darkGray },
                ]}
                onChangeText={(text) => {
                  setFirstName(text);
                  if (firstName != "" && lastName != "") {
                    setShowButton(true);
                  }
                }}
              ></TextInput>
              <TextInput
                placeholder="Last name"
                value={lastName}
                placeholderTextColor={"#aaa"}
                style={styles.textInput}
                onChangeText={(text) => {
                  setLastName(text);
                  if (firstName != "" && lastName != "") {
                    setShowButton(true);
                  }
                }}
              ></TextInput>
            </View>
          </>
        );
      case 6:
        return (
          <>
            <Text style={styles.taskTitle}>What is your email?</Text>
            <View style={styles.nameContainer}>
              <TextInput
                autoFocus={true}
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor={"#aaa"}
                autoComplete="email"
                textContentType="emailAddress"
                autoCapitalize="none"
                value={email}
                style={styles.textInput}
                onChangeText={(text) => {
                  setEmail(text);
                  if (validateEmail(text)) {
                    setShowButton(true);
                  } else {
                    setShowButton(false);
                  }
                }}
              ></TextInput>
            </View>
          </>
        );
      case 7:
        return (
          <>
            <Text style={styles.taskTitle}>What is your password?</Text>
            <View style={styles.nameContainer}>
              <TextInput
                autoFocus={true}
                placeholder="Password"
                placeholderTextColor={"#aaa"}
                autoComplete="password"
                textContentType="password"
                secureTextEntry={true}
                autoCapitalize="none"
                value={password}
                style={styles.textInput}
                onChangeText={(text) => {
                  setPassword(text);
                  if (validatePassword(text)) {
                    setShowButton(true);
                  } else {
                    setShowButton(false);
                  }
                }}
              />
            </View>
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
      {!showButton && (
        <View style={{ alignItems: "center" }}>
          <LoginButtonC
            text="Continue"
            onPress={() => {
              setProgress(progress + 1);
              setShowButton(true); // Show the button after pressing
            }}
            variant="disabled" // Set variant to primary when !showButton
          />
        </View>
      )}
      {showButton && (
        <View style={{ alignItems: "center" }}>
          <LoginButtonC
            text="Continue"
            onPress={() => {
              setProgress(progress + 1);
              Keyboard.dismiss();
              // Optionally set showButton to false if you want to hide the button after pressing
              setShowButton(false); // Hide the button after pressing
            }}
            variant="primary"
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
  nameContainer: {
    margin: 20,
    borderWidth: 2,
    borderColor: COLORS.darkGray,
    borderRadius: 14,
  },
  textInput: {
    width: "100%",
    height: "auto",
    fontSize: 24,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});
export default collectingInfo;

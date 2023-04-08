import React, { useState, useEffect } from "react";
import AppStyles from "./AppStyles.js";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import app, { auth } from "./FirebaseConfig.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import MainPage from "./components/mainPage.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const LandingPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [signInFormVisible, setSignInFormVisible] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [stateUser, setUser] = useState(null);
  const [btnState, setBtnState] = useState(false);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  const handleSignUp = async () => {
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser(user);
          Alert.alert("Signed Up");
        })
        .catch((error) => {
          Alert.alert("Error Signing Up Check Console");
          console.log(email);
          console.log(password);
          console.log(error);
        });
    } catch (error) {
      Alert.alert(`Error Signing Up.\n${error}`);
      console.log(error);
    }
  };
  const handleSignIn = async () => {
    if (!auth.currentUser) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          if (user) {
            setBtnState(true);
            Alert.alert("Signed In");
            LogInNav(userCredential);
          } else {
            setBtnState(false);
            console.log("No user signed in");
          }
        })
        .catch((error) => {
          Alert.alert("Error Signing In");
          console.log(error);
        });
    } else {
      Alert.alert("Already signed in");
    }
  };

  const handleSignOut = async () => {
    try {
      if (auth.currentUser) {
        await auth.signOut();
        Alert.alert("Signed Out");
      } else {
        Alert.alert("No user signed in");
      }
    } catch (error) {
      Alert.alert(`Error Signing Out.\n${error}`);
      console.log(error);
    } finally {
      setBtnState(false);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setFormVisible(false);
  };

  const LogInNav = (userCredential) => {
    try {
      if (userCredential.user) {
        navigation.navigate("MainPage", { userCredential });
      } else {
        Alert.alert("No user signed in");
      }
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };

  const handleOnClick = () => {
    navigation.navigate("MainPage");
  };

  return (
    <View style={AppStyles.container}>
      <ImageBackground
        source={require("./assets/Background.png")}
        resizeMode="cover"
        style={AppStyles.background}
      >
        <Image
          source={require("./assets/The_Emperor_Protects.png")}
          style={AppStyles.logo}
        />

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={require("./assets/AdMech.png")}
            resizeMode="contain"
            style={AppStyles.signIn}
          />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleModalClose}
        >
          <View style={AppStyles.modal}>
            <View style={AppStyles.modalContent}>
              <View style={AppStyles.button}>
                <Button
                  icon={<Icon name="envelope-o" size={15} color="white" />}
                  buttonStyle={{
                    backgroundColor: "#922722",
                    borderWidth: 2,
                    borderColor: "transparent",
                  }}
                  title="  Sign Up With Email"
                  raised={true}
                  onPress={() => setFormVisible(true)}
                  disabled={btnState}
                />
              </View>
              <View style={AppStyles.button}>
                <Button
                  icon={<Icon name="envelope-o" size={15} color="white" />}
                  buttonStyle={{
                    backgroundColor: "#922722",
                    borderWidth: 2,
                    borderColor: "transparent",
                  }}
                  title="  Sign In With Email"
                  loading={false}
                  raised={true}
                  onPress={() => setSignInFormVisible(true)}
                  disabled={btnState}
                />
              </View>
              <View style={AppStyles.button}>
                <Button
                  onPress={() => handleSignOut()}
                  buttonStyle={{
                    backgroundColor: "#922722",
                    borderWidth: 2,
                    borderColor: "transparent",
                  }}
                  icon={<Icon name="sign-out" size={15} color="white" />}
                  title="  Sign Out"
                  disabled={!btnState}
                  raised={true}
                />
              </View>
              <View style={AppStyles.button}>
                <Button
                  onPress={() => {
                    handleOnClick();
                  }}
                  buttonStyle={{
                    backgroundColor: "#922722",
                    borderWidth: 2,
                    borderColor: "transparent",
                  }}
                  icon={<Icon name="sign-out" size={15} color="white" />}
                  title="  Continue As Guest"
                  raised={true}
                />
              </View>

              {formVisible && (
                <View style={AppStyles.form}>
                  <Text style={AppStyles.label}>Email:</Text>
                  <TextInput
                    style={AppStyles.input}
                    value={email}
                    onChangeText={setEmail}
                  />
                  <Text style={AppStyles.label}>Password:</Text>
                  <TextInput
                    style={AppStyles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                  />
                  <View style={AppStyles.button}>
                    <Button
                      title="Submit"
                      buttonStyle={{ backgroundColor: "#922722" }}
                      onPress={() => {
                        handleSignUp();
                        setModalVisible(false);
                        setFormVisible(false);
                      }}
                    />
                  </View>
                </View>
              )}
              {signInFormVisible && (
                <View style={AppStyles.form}>
                  <Text style={AppStyles.label}>Email:</Text>
                  <TextInput
                    style={AppStyles.input}
                    value={email}
                    onChangeText={setEmail}
                  />
                  <Text style={AppStyles.label}>Password:</Text>
                  <TextInput
                    style={AppStyles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                  />
                  <View style={AppStyles.button}>
                    <Button
                      title="Submit"
                      buttonStyle={{
                        backgroundColor: "#922722",
                        borderWidth: 2,
                        borderColor: "transparent",
                      }}
                      onPress={() => {
                        handleSignIn();
                        setModalVisible(false);
                        setSignInFormVisible(false);
                      }}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
};

export default LandingPage;

import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  Modal,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Header, Icon } from "react-native-elements";
import Font from "expo-font";
import * as SMS from "expo-sms";
import * as MailComposer from "expo-mail-composer";
import AppStyles from "../AppStyles.js";
import TakePictureScreen from "../screens/TakePictureScreen.js";
import { Button } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const MainPage = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    MestizoFont: require("../assets/fonts/MestizoFont.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleTakePictureError = (error) => {
    setErrorMessage(error.message);
    Alert.alert("Error", error.message, [
      { text: "OK", onPress: () => setErrorMessage("") },
    ]);
  };

  onChangeHandler = (value) => {
    setMessage(value);
  };

  sendMessageWithSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        ["3213213214", "1231231234"],
        message
      );
      console.log(result);
    } else {
      console.log("SMS is not available on this device");
    }
  };

  sendMessageWithEmail = async () => {
    const isAvailable = await MailComposer.isAvailableAsync();

    if (isAvailable) {
      var options = {
        // recipients (array) -- An array of e-mail addressess of the recipients.
        recipients: ["m_daly137979@fanshaweonline.ca"],
        // ccRecipients (array) -- An array of e-mail addressess of the CC recipients.
        // bccRecipients (array) -- An array of e-mail addressess of the BCC recipients.
        // subject (string) -- Subject of the mail.
        subject: "My Subject Line",
        // body (string) -- Body of the mail.
        body: message,
        // isHtml (boolean) -- Whether the body contains HTML tags so it could be formatted properly. Not working perfectly on Android.
        // attachments (array) -- An array of app's internal file uris to attach.
      };

      MailComposer.composeAsync(options).then((result) => {
        console.log(result.status);
      });
    } else {
      console.log("Email is not available on this device");
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={AppStyles.container} onLayout={onLayoutRootView}>
      <ImageBackground
        source={require("../assets/Background.png")}
        resizeMode="cover"
        style={AppStyles.background}
      >
        <Header
          containerStyle={{
            backgroundColor: "transparent",
            position: "absolute",
            left: 0,
            top: 0,
          }}
          leftComponent={
            <Icon
              name="reply"
              color="#922722"
              size={60}
              onPress={() => navigation.navigate("LandingPage")}
            />
          }
        />
        <Image
          source={require("../assets/The_Emperor_Protects.png")}
          style={AppStyles.logo}
        />
        <TouchableOpacity
          style={AppStyles.begin}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ fontFamily: "MestizoFont", fontSize: 78 }}>BEGIN</Text>
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
                  icon={<Icon name="send-to-mobile" size={15} color="white" />}
                  buttonStyle={{
                    backgroundColor: "#922722",
                    borderWidth: 2,
                    borderColor: "transparent",
                  }}
                  title="  Send with SMS"
                  onPress={sendMessageWithSMS}
                />
              </View>
              <View style={AppStyles.button}>
                <Button
                  icon={<Icon name="email" size={15} color="white" />}
                  buttonStyle={{
                    backgroundColor: "#922722",
                    borderWidth: 2,
                    borderColor: "transparent",
                  }}
                  raised={true}
                  title="  Send with Email"
                  onPress={sendMessageWithEmail}
                />
              </View>
              <View style={AppStyles.button}>
                <Button
                  icon={<Icon name="camera-alt" size={15} color="white" />}
                  buttonStyle={{
                    backgroundColor: "#922722",
                    borderWidth: 2,
                    borderColor: "transparent",
                  }}
                  raised={true}
                  title="   Picture Manager"
                  onPress={() => navigation.navigate("ImageSelector")}
                />
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
};

export default MainPage;

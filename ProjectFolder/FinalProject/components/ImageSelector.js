import React, { useCallback } from "react";
import {
  View,
  Alert,
  CameraRoll,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { Header, Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { useFonts } from "expo-font";
import AppStyles from "../AppStyles.js";
import * as SplashScreen from "expo-splash-screen";

// The following are required for access to the camera:
// expo install expo-image-picker
// expo install expo-permissions

const ImageSelector = ({ navigation, props }) => {
  const [fontsLoaded] = useFonts({
    MestizoFont: require("../assets/fonts/MestizoFont.ttf"),
  });

  const verifyPermissions = async () => {
    const cameraResult = await ImagePicker.requestCameraPermissionsAsync();
    const libraryResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (
      cameraResult.status !== "granted" &&
      libraryResult.status !== "granted"
    ) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const testPrint = () => {
    console.log(navigation);
    console.log(props);
  };

  const retrieveImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return false;
    }

    let image = null;
    try {
      image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
    } catch (error) {
      console.log("Error in retrieveImageHandler");
      console.log(error);
    }

    if (!image.canceled) {
      try {
        console.log(`props: ${props}`);
        //print out the props object
        console.log(props);
        console.log(`props.onImageSelected: ${props.onImageSelected}`);
        console.log(`image: ${image}`);
        props.onImageSelected(image.uri);
      } catch (error) {
        console.log("Error in if (!image.canceled)");
        console.log(error);
      }
    }
  };

  const takeImageHandler = async () => {
    console.log("takeImageHandler");
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      console.log("No permission");
      return false;
    }
    console.log("Permission granted");

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log("Image taken");

    if (!image.canceled) {
      props.onImageSelected(image.uri);
    }
  };

  const onLayoutRootView = useCallback(async () => {
    try {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    } catch (error) {
      console.log(error);
      console.log("Error in onLayoutRootView");
    }
  }, [fontsLoaded]);

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
            <TouchableOpacity onPress={() => navigation.navigate("MainPage")}>
              <Icon
                name="reply"
                color="#922722"
                size={60}
                onPress={() => navigation.navigate("MainPage")}
              />
            </TouchableOpacity>
          }
        />
        <Image
          source={require("../assets/The_Emperor_Protects.png")}
          style={AppStyles.logo}
        />
        <View style={AppStyles.pictContainer}>
          <TouchableOpacity style={AppStyles.begin} onPress={takeImageHandler}>
            <Image
              source={require("../assets/ServoSkull.png")}
              style={AppStyles.servoSkull}
            />
          </TouchableOpacity>
          <TouchableOpacity style={AppStyles.begin} onPress={testPrint}>
            <Image
              source={require("../assets/AdAdmin.png")}
              style={AppStyles.servoSkull}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ImageSelector;

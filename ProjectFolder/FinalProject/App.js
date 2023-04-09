import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./LandingPage";
import MainPage from "./components/mainPage";
import TakePictureScreen from "./screens/TakePictureScreen";
import ImageSelector from "./components/ImageSelector";
import CameraPage from "./components/cameraPage";
import * as SplashScreen from "expo-splash-screen";
import { Alert, Platform, Linking, PermissionsAndroid } from "react-native";
//import * as Permissions from "expo-permissions";
import MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";

export default function App() {
  const Stack = createNativeStackNavigator();

  const requestCameraPermissionAsync = async () => {
    try {
      if (Platform.OS === "ios") {
        Alert.alert(
          "HERESY DETECTED!",
          "Begone iPhone user! This app is not compatible with your device! Get a real phone!"
        );
      } else {
        const permissionOptions = [
          "never_ask_again",
          "request_when_in_use",
          "request_always",
        ];
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message:
              "This app needs access to your camera, WE PROMISE it definetly won't be used to bring about the age of the machines!",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
            permissionOptions: permissionOptions,
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the camera");
        } else {
          Alert.alert(
            "Some features of this app will not work without camera access!"
          );
          console.log("Camera permission denied");
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestMediaPermissionAsync = async () => {
    try {
      if (Platform.OS === "ios") {
        Alert.alert(
          "HERESY DETECTED!",
          "Begone iPhone user! This app is not compatible with your device! Get a real phone!"
        );
      } else {
        const permissionOptions = [
          "never_ask_again",
          "request_when_in_use",
          "request_always",
        ];
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Gallery Permission",
            message:
              "This app needs access to your gallery, It probably won't allow the app to engage in thermo nuclear war.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
            permissionOptions: permissionOptions,
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the gallery");
        } else {
          Alert.alert(
            "Some features of this app will not work without gallery access!"
          );
          console.log("Gallery permission denied");
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  SplashScreen.preventAutoHideAsync();
  useEffect(() => {
    requestCameraPermissionAsync();
    requestMediaPermissionAsync();
    const hideSplashScreen = async () => {
      try {
        await SplashScreen.hideAsync();
      } catch (error) {
        console.log(error);
      }
    };
    hideSplashScreen();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="ImageSelector" component={ImageSelector} />
        <Stack.Screen name="TakePictureScreen" component={TakePictureScreen} />
        <Stack.Screen name="CameraPage" component={CameraPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

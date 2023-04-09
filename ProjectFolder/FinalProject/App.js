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
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";

export default function App() {
  const Stack = createNativeStackNavigator();
  SplashScreen.preventAutoHideAsync();
  useEffect(() => {
    const hideSplashScreen = async () => {
      try {
        await SplashScreen.hideAsync();
      } catch (error) {
        console.log(error);
      }
    };
    hideSplashScreen();
  }, []);

  useEffect(() => {
    const getPermissionsAsync = async () => {
      const { status } = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.MEDIA_LIBRARY // Add this line to request media library access
      );
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please allow camera and media library access in your device settings to use this app.",
          [
            {
              text: "Open Settings",
              onPress: () =>
                Platform.OS === "ios"
                  ? Linking.openURL("app-settings:")
                  : Linking.openSettings(),
            },
            { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
          ],
          { cancelable: false }
        );
      }
    };
    getPermissionsAsync();
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

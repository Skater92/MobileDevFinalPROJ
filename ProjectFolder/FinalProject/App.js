import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./LandingPage";
import MainPage from "./components/mainPage";
import TakePictureScreen from "./screens/TakePictureScreen";
import ImageSelector from "./components/ImageSelector";
import * as SplashScreen from "expo-splash-screen";

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
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="ImageSelector" component={ImageSelector} />
        <Stack.Screen name="TakePictureScreen" component={TakePictureScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

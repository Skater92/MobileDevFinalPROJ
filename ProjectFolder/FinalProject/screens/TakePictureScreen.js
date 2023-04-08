import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Alert,
} from "react-native";

import AppStyles from "../AppStyles.js";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import ImageSelector from "../components/ImageSelector";

const TakePictureScreen = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [fontsLoaded] = useFonts({
    MestizoFont: require("../assets/fonts/MestizoFont.ttf"),
  });

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

  const [modalVisible, setModalVisible] = useState(false);

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

  const imageSelectedHandler = (imagePath) => {
    try {
      setSelectedImage(imagePath);
    } catch (error) {
      console.log(error);
      console.log("Error in imageSelectedHandler");
    }
  };
  try {
    return (
      <View>
        <View style={AppStyles.form}>
          <Text style={AppStyles.label}>Lets Take a picture!</Text>
          {!selectedImage && (
            <ImageSelector onImageSelected={imageSelectedHandler} />
          )}
          {selectedImage && (
            <View>
              <Image style={AppStyles.image} source={{ uri: selectedImage }} />
              <Button
                title="Reset"
                onPress={() => {
                  setSelectedImage(null);
                }}
              />
            </View>
          )}
        </View>
      </View>
    );
  } catch (error) {
    console.log(error);
    console.log("Error in TakePictureScreen");
  }
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
  },
  image: {
    width: 400,
    height: 400,
  },
});

export default TakePictureScreen;

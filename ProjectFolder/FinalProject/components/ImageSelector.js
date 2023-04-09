import React, { useState } from "react";
import {
  View,
  Alert,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import * as Permissions from "expo-permissions";
import AppStyles from "../AppStyles.js";
import * as SplashScreen from "expo-splash-screen";

// The following are required for access to the camera:
// expo install expo-image-picker
// expo install expo-permissions

const ImageSelector = (props) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const verifyPermissions = async () => {
    const cameraResult = await ImagePicker.requestCameraPermissionsAsync();
    const libraryResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (libraryResult.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant Media Library permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }

    if (cameraResult.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant Camera Permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }

    return true;
  };

  const retrieveImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return false;
    }

    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!image.cancelled) {
      props.onImageSelected(image.uri);
    }
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={AppStyles.container}>
      <ImageBackground
        source={require("../assets/Background.png")}
        resizeMode="cover"
        style={AppStyles.background}
      >
        <Image
          source={require("../assets/The_Emperor_Protects.png")}
          style={{
            position: "absolute",
            top: 100,
            left: 0,
            width: 210,
            height: 84,
          }}
        />

        <TouchableOpacity
          // style={AppStyles.begin}
          onPress={retrieveImageHandler}
        >
          <Image
            source={require("../assets/AdAdmin.png")}
            style={AppStyles.servoSkull}
          />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default ImageSelector;

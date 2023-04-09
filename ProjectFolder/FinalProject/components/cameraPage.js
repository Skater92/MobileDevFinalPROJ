import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Image,
  Modal,
  Platform,
  Alert,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as Permissions from "expo-permissions";
import AppStyles from "../AppStyles.js";
import { Button, Icon } from "react-native-elements";
import * as MediaLibrary from "expo-media-library";

const CameraPage = ({ navigation }) => {
  const [type, setType] = useState(CameraType.back);
  const [showModal, setShowModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [mediaPermissions, requestMediaPermissions] =
    Permissions.usePermissions(Permissions.MEDIA_LIBRARY, { ask: true });

  const onPictureSaved = async (photo) => {
    setCapturedImage(photo.uri);
    setShowModal(true);
  };

  const toggleCameraType = async () => {
    if (permission) {
      if (type === CameraType.back) {
        setType(CameraType.front);
      } else {
        setType(CameraType.back);
      }
    }
  };

  const handleCameraShutter = async () => {
    if (permission) {
      const photo = await this.camera.takePictureAsync();
      onPictureSaved(photo);
    }
  };

  const savePhoto = async () => {
    if (Platform.OS === "ios") {
      Alert.alert(
        "HERESY DETECTED!",
        "Begone iPhone user! You are not worthy of saving this photo! Get a real phone!"
      );
    } else {
      if (mediaPermissions.status !== "granted") {
        await MediaLibrary.saveToLibraryAsync(capturedImage);
        Alert.alert("Photo saved to gallery!");
        setShowModal(false);
      } else {
        Alert.alert(
          "You need to grant permission to save photos to your gallery!"
        );
      }
    }
  };

  return (
    <View style={AppStyles.container}>
      <ImageBackground
        source={require("../assets/Background.png")}
        resizeMode="cover"
        style={AppStyles.background}
      >
        <Image
          source={require("../assets/The_Emperor_Protects.png")}
          style={AppStyles.logo}
        />
        {showModal && (
          <Modal>
            <View style={AppStyles.modal}>
              <View style={AppStyles.modalContent}>
                <Image
                  style={AppStyles.photo}
                  source={{ uri: capturedImage }}
                />
                <View style={AppStyles.buttonRow}>
                  <Button
                    icon={<Icon name="save" color="#ffffff" size={35} />}
                    title=" Save Photo"
                    onPress={() => {
                      savePhoto();
                    }}
                  />
                  <Button
                    icon={<Icon name="close" color="#ffffff" size={35} />}
                    title="Close Photo"
                    onPress={() => {
                      setShowModal(false);
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        )}
        <View style={AppStyles.cameraContainer}>
          <Camera
            style={AppStyles.camera}
            type={type}
            ref={(ref) => {
              this.camera = ref;
            }}
          />
          <View style={AppStyles.buttonRow}>
            <Button
              icon={<Icon name="camera-alt" color="#ffffff" size={35} />}
              buttonStyle={{
                backgroundColor: "#922722",
                borderWidth: 2,
                borderColor: "transparent",
                marginTop: 20,
                width: 100,
                height: 60,
              }}
              title=""
              onPress={() => {
                handleCameraShutter();
              }}
            />
            <Button
              icon={<Icon name="camera-front" color="#ffffff" size={35} />}
              buttonStyle={{
                backgroundColor: "#922722",
                borderWidth: 2,
                borderColor: "transparent",
                marginTop: 20,
                width: 100,
                height: 60,
              }}
              title=""
              onPress={() => {
                toggleCameraType();
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CameraPage;

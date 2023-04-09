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

import AppStyles from "../AppStyles.js";
import { Button, Icon } from "react-native-elements";
import * as MediaLibrary from "expo-media-library";

const CameraPage = ({ navigation }) => {
  const [type, setType] = useState(CameraType.back);
  const [showModal, setShowModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

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

  const requestMediaPermissionAsync = async () => {
    try {
      if (Platform.OS === "ios") {
        Alert.alert(
          "HERESY DETECTED!",
          "Begone iPhone user! This app is not compatible with your device! Get a real phone!"
        );
      } else {
        const status = await MediaLibrary.requestPermissionsAsync();
        if (status.granted) {
          console.log("Permissions already granted");
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
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const savePhoto = async () => {
    await requestMediaPermissionAsync();
    const asset = await MediaLibrary.createAssetAsync(capturedImage);
    await MediaLibrary.createAlbumAsync("The Emperor Protects", asset, false);
    Alert.alert("Photo Saved!");
    setShowModal(false);
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

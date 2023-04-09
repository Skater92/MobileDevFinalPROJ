import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";

import AppStyles from "../AppStyles";
import * as ImagePicker from "expo-image-picker";
import { Header, Icon, Button } from "react-native-elements";
import * as SplashScreen from "expo-splash-screen";
import ImageSelector from "../components/ImageSelector";

const TakePictureScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState();

  const imageSelectedHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const onPressHandler = () => {
    setSelectedImage(null);
    Alert.alert("Image has been cleared!");
  };

  try {
    return (
      <View style={AppStyles.container}>
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
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="reply" color="#922722" size={60} />
              </TouchableOpacity>
            }
          />
          <View>
            <Text style={{ fontFamily: "MestizoFont", fontSize: 30 }}>
              SELECTED PICT
            </Text>
          </View>
          <View>
            {!selectedImage && (
              <View>
                <ImageSelector onImageSelected={imageSelectedHandler} />
              </View>
            )}
            {selectedImage && (
              <View style={AppStyles.modalContent}>
                <Image
                  source={{ uri: selectedImage }}
                  style={AppStyles.image}
                />
                <Button
                  icon={<Icon name="loop" size={15} color="white" />}
                  buttonStyle={{
                    backgroundColor: "#922722",
                    borderWidth: 2,
                    borderColor: "transparent",
                  }}
                  title="  Reset"
                  onPress={() => onPressHandler()}
                />
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    );
  } catch (error) {
    console.log(error);
    console.log("Error in TakePictureScreen");
  }
};

export default TakePictureScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  Pressable,
  Image,
  Alert,
  TextInput,
  StatusBar,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Camera from "expo-camera";
import ImageSubmit from "./components/ImageSubmit";

const App = () => {
  const [imageUri, setImageUri] = useState(null);
  useEffect(() => {
    getPermissionAsync();
  }, []);

  const getPermissionAsync = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Sorry, we need camera and camera roll permissions to make this work!"
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      quality: 0.5,
      allowsEditing: true,
      aspect: [1, 1],
      resolution: { width: 224, height: 224 },
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <StatusBar style="auto" />
      <TextInput placeholder="Enter Text" />
      <Pressable className="bg-blue-500 p-2 rounded-md" onPress={takePhoto}>
        <Text className="text-white">Take Photo</Text>
      </Pressable>
      {imageUri && <ImageSubmit imageUri={imageUri} />}
    </View>
  );
};

export default App;

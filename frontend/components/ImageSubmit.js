import React from "react";
import { Image,View,Pressable,Text } from "react-native";
import axios from "axios";

const ImageSubmit = ({imageUri}) => {
  const submitPhoto = async (props) => {
    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg",
      name: "test1.jpeg",
    });
    console.log(formData);
    try{
      
      const res = await axios.post(
        "https://f59a-2409-40f0-119e-13d8-b8a0-11be-af3d-9c76.ngrok-free.app/webhook",
        formData,{
          headers:{
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      props.setFoodNutrients(res.data.foods[0])
    }catch(e){
      console.log(e)
    }
  };
  
  return (
    <View className="flex justify-center items-center space-y-2">
      <Image source={{ uri: imageUri }} width={250} height={250} />
      <Pressable
        className="bg-blue-500 p-2 rounded-md w-16"
        onPress={submitPhoto}
      >
        <Text className="text-white">Submit</Text>
      </Pressable>
    </View>
  );
};

export default ImageSubmit;

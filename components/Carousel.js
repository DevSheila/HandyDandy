import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
  "https://img.freepik.com/premium-photo/close-up-young-afro-woman-cleaning-new-home-housekeeping-cleaning-concept_58466-13254.jpg",
  "https://img.freepik.com/premium-photo/middle-age-african-american-woman-doing-laundry-isolated-impressed-holding-copy-space-palm_1187-91804.jpg",
  "https://media.istockphoto.com/id/1361116682/photo/plumber-fixing-a-leaking-bathroom-faucet.jpg?s=612x612&w=0&k=20&c=THa1uoYgW4gGz0C8YMqenM58UFY-uD1X79dP3obYLLI=",
  
  ];
  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        dotColor={"#13274F"}
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{
          borderRadius: 6,
          width: "94%",
        }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});

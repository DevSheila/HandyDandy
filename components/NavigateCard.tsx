import { StyleSheet, Text, ScrollView,TouchableOpacity, View } from "react-native";

import { GOOGLE_MAPS_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Icon } from "react-native-elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import NavFavorites from "./NavFavorites";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackList } from "./MapScreenNavigation";
import { setDestination } from "../app/slices/navigationSlice";
import tailwind from "tailwind-react-native-classnames";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import BookingSteps from "./BookingSteps";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigateCardProp>();

  return (
    <SafeAreaView style={tailwind`bg-white flex-1 justify-between`}>
     

          <ScrollView>
              <BookingSteps/>
          </ScrollView>
      
    </SafeAreaView>
  );
};

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});

type NavigateCardProp = NativeStackNavigationProp<StackList, "NavigateCard">;

export default NavigateCard;

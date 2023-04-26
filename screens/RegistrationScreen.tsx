import { Image, Text, View } from "react-native";

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { navData } from "../components/NavOptions";
import 'react-native-url-polyfill/auto'
import RegistrationForm from "../components/RegistrationForm";

const RegistrationScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
     
     <RegistrationForm/>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

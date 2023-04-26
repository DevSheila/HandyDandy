import { Image, View ,Text,FlatList,  TextInput,TouchableOpacity,ScrollView} from "react-native";
import { setDestination, setOrigin } from "../app/slices/navigationSlice";

import { GOOGLE_MAPS_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import NavFavorites from "../components/NavFavorites";
import { HomeScreenProp } from "../components/NavOptions";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";

import tailwind from "tailwind-react-native-classnames";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import Categories from "../components/Categories";
import 'react-native-url-polyfill/auto'
import React, { useState } from "react";
import { DateCard } from "../components/DateCard";
import { useNavigation } from "@react-navigation/native";
import MapScreen from "./MapScreen";
import { StackList } from "../components/MapScreenNavigation";
import HomeScreen from "../screens2/HomeScreen";
// import { StackList } from "./MapScreenNavigation";
// import { useNavigation } from "@react-navigation/native";
import BookingSteps from '../components/BookingSteps';






const LocationScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [selected, setSelected] = useState<RidesData[0] | null>(null);
  const [location, setLocation] = useState([]);

   const [elementVisible, setElementVisible] = useState(false);

  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* <View style={tailwind`p-5 `}> */}
        <View
          style={{
            // padding: 10,
            margin: 10,
            // flexDirection: "row",
            // alignItems: "center",
            // justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "#C0C0C0",
            borderRadius: 7,
          }}
        >
      
     
        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          placeholder="Choose an Address?"
          enablePoweredByContainer={false}
          minLength={2}
          fetchDetails={true}
          onPress={(data, details = null) => {
            dispatch(
               setOrigin({
                location: details?.geometry.location,
                description: data.description,
              }),
            );
            // setLocation(data.description)
           
            // setElementVisible(!elementVisible)
            dispatch(setDestination(null));
          }}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "en",
          }}
          styles={{
            container: {
              flex: 0,
            },
        }}
        />

   
         
        {/* <NavOptions /> */}
        {/* <NavFavorites shouldSetOrigin /> */}
  
      </View>

  

      {/* <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <Categories />
        
      </ScrollView>
      <DateCard/> */}
      {elementVisible ? (
      <View>
                <FlatList
              data={ridesData}
              keyExtractor={(item) => item.id}
              renderItem={({ item: { id, title, multiplier, price,services,image }, item }) => (
                <TouchableOpacity
                  onPress={() => setSelected(item)}
                  style={tailwind.style(
                    `flex-row justify-between items-center px-6 m-2 `,
                    id === selected?.id && "bg-gray-200"
                  )}
                >
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: "contain",
                      borderRadius: 50
                    }}

                    source={{
                      uri: image,
                    }}
                  />
                  <View style={tailwind`-ml-8`}>
                    <Text style={tailwind`text-lg font-bold`}>{title}</Text>
                    <Text>{services}</Text>
                  </View>
                  <Text style={tailwind`text-lg`}>
                {price}/h
                  </Text>
                </TouchableOpacity>
              )}
            />
            <View style={tailwind`mt-auto border-t border-gray-200`}>
              <TouchableOpacity
                disabled={!selected}
                style={tailwind.style(
                  `bg-sky py-3 m-3`,
                  !selected && "bg-gray-200"
                )}
              >
                <Text style={tailwind`text-center text-white text-lg `} onPress={() => {
                  navigation.navigate("Home")
                  }}>
                  Choose {selected?.title}
                </Text>
              </TouchableOpacity>
            </View>
      </View>
      ) : 
      <View></View>
      }


    </SafeAreaView>
  );
};


type RidesData = {
  id: string;
  title: string;
  multiplier: number;
  price:number,
  services: string;
  image: string;
}[];

const ridesData: RidesData = [
  {
    id: "Uber-X-123",
    title: "Diana Kerubo",
    multiplier: 1,
    price:30,
    services:"Laundry,House Cleaning",
    image: "https://images.unsplash.com/photo-1512361436605-a484bdb34b5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: "Uber-XL-456",
    title: "Shirylne Otieno",
    multiplier: 1.2,
    price:40,
    services:"Laundry,House Cleaning",

    image: "https://images.unsplash.com/photo-1561406636-b80293969660?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    id: "Uber-LUX-789",
    title: "Mandi Kariuki",
    multiplier: 1.75,
    price:45,
    services:"Laundry,House Cleaning",

    image: "https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHdvbWVuJTIwYmxhY2t8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
];


const SURGE_CHARGE_RATE = 1.5;

export default LocationScreen;

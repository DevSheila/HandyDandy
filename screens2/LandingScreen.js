import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItem from "../components/DressItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import FeaturedService from "../components/FeaturedServices";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInfo,
} from "../app/slices/navigationSlice";


const LandingScreen = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const cleaning = [
    {
      id: "0",
      image: require("../assets/services/house.png"),
      name: "house"
    },
     {
      id: "1",
      image: require("../assets/services/laundry-machine.png"),
      name: "laundry"
    },
    {
      id: "2",
      image: require("../assets/services/ironing-board.png"),
      name: "ironing"
    },
    {
      id: "3",
      image: require("../assets/services/roof.png"),
      name: "outdoors"
    },
  ];
  const repair = [
    {
      id: "0",
      image: require("../assets/services/plumbing.png"),
      name: "Plumbing"
    },
     {
      id: "1",
      image: require("../assets/services/electrical-service.png"),
      name: "Electrical"
    },
    {
      id: "2",
      image: require("../assets/services/pc-tower.png"),
      name: "Applicances"
    },
    {
      id: "3",
      image: require("../assets/services/chimney.png"),
      name: "Chimney"
    },
    {
      id: "4",
      image: require("../assets/services/renovation.png"),
      name: "Renovation"
    },
  ];
  const installation = [
    {
      id: "0",
      image: require("../assets/services/cctv.png"),
      name: "Security"
    },
     {
      id: "1",
      image: require("../assets/services/stove.png"),
      name: "Appliances"
    },
    {
      id: "2",
      image: require("../assets/services/idea.png"),
      name: "Lighting"
    },
  
  ];
  const serviceCategories = [
      {
        id: "0",
        name: "Home cleaning",
        items:cleaning
      },
      {
        id: "1",
        name: "Home repair",
        items:repair
      },
      {
        id: "2",
        name: "Home installation",
        items:installation
      },
  ];

    const products = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "dresses",
      quantity: 0,
      price: 10,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "jeans",
      quantity: 0,
      price: 10,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 10,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "shorts",
      quantity: 0,
      price: 10,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 10,
    },
  ];
  
  const cart = useSelector((state) => state.cart.cart);
  const [items,setItems] = useState([]);
  const total = cart.map((item) => item.quantity * item.price).reduce((curr,prev) => curr + prev,0);
  const navigation = useNavigation();
  console.log(cart);
  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "we are loading your location"
  );
  const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location services not enabled",
        "Please enable the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      setlocationServicesEnabled(enabled);
    }
  };
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();
    // console.log(coords)
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      // console.log(response)

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setdisplayCurrentAddress(address);
      }
    }
  };
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;

    const fetchProducts = async () => {
      const colRef = collection(db,"types");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
      items?.map((service) => dispatch(getProducts(service)));
    };
    fetchProducts();
  }, []);
  console.log(product);

  const searchFilterFunction = (text) => {
      if(text){  
          const newData = cleaning.filter(item => {
              const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
              const textData = text.toUpperCase();
              // return itemData;
              return itemData.indexOf(textData) > -1;
          })
              console.log(newData)

          setFilteredData(newData);
      } else {
          setFilteredData(data);
      }
  }


  return (
    <>
     {filteredData ? (
      <ScrollView
        style={{ backgroundColor: "#F0F0F0", flex: 1, marginTop: 50 }}
      >
        {/* Location and Profile */}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <MaterialIcons name="location-on" size={30} color="#fd5c63" />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>

          <Pressable onPress={() => navigation.navigate("Profile")} style={{ marginLeft: "auto", marginRight: 7 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://lh3.googleusercontent.com/ogw/AAEL6sh_yqHq38z35QMy5Fnb8ZIxicdxCIVM9PeBD2j-=s64-c-mo",
              }}
            />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "#C0C0C0",
            borderRadius: 7,
          }}
        >
          <TextInput placeholder="Search for items or More"  
          
              onChangeText={(text) =>  searchFilterFunction(text)}

          />
          <Feather name="search" size={24} color="#fd5c63" />
        </View>

        {/* Image Carousel */}
        <Carousel />

       {/* Render all the types of services (home cleaning,repair,installation) */}
        {/* {serviceCategories.map((category, index) => (
          <FeaturedService item={category} key={index} />
        ))} */}
        
        {serviceCategories.map((item, index) => (
          <FeaturedService item={item} key={index} />
        ))}



     
      </ScrollView>

       ) : 
     
       <View>Hello</View>
      }
    </>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({});

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
import { useNavigation ,useRoute} from "@react-navigation/native";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const HomeScreen = () => {

  const route = useRoute();
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
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
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

  const products = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "shirt",
      quantity: 0,
      price: 100,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 100,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "dresses",
      quantity: 0,
      price: 100,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "jeans",
      quantity: 0,
      price: 100,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 100,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "shorts",
      quantity: 0,
      price: 100,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 100,
    },
  ];

  const housecleaning = [
    {
      id: "21",
      image: require("../assets/house/bath.png"),
      name: "Bathroom",
      quantity: 0,
      price: 200,
    },
    {
      id: "22",
      image: require("../assets/house/bed.png"), 
      name: "Bedroom",
      quantity: 0,
      price: 100,
    },
    {
      id: "23",
      image: require("../assets/house/dinner-table.png"),
      name: "Dinner Room",
      quantity: 0,
      price: 100,
    },
    {
      id: "24",
      image: require("../assets/house/kitchen-set.png"),
      name: "Kitchen",
      quantity: 0,
      price: 100,
    },
    {
      id: "25",
      image: require("../assets/house/sofa.png"),
      name: "Sitting Room",
      quantity: 0,
      price: 100,
    },
    {
      id: "26",
      image: require("../assets/house/toilet.png"),
      name: "Restroom",
      quantity: 0,
      price: 100,
    }
  ];
  return (
    <>
      <ScrollView
        style={{ backgroundColor: "#F0F0F0", flex: 1, marginTop: 50 }}
      >
        {/* Location and Profile */}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <MaterialIcons name="location-on" size={30} color="#fd5c63" />
          <View>
            {/* <Text style={{ fontSize: 18, fontWeight: "600" }}>Laundry</Text>
            <Text>{displayCurrentAddress}</Text> */}
          </View>
        </View>

        {/* Render all the Products */}
        {housecleaning.map((product, index) => (
          <DressItem item={product} key={index} />
        ))}
      </ScrollView>

          {total === 0 ? (
            null
          ) : (
            <Pressable
            style={{
              backgroundColor: "#088F8F",
              padding: 10,
              marginBottom: 40,
              margin: 15,
              borderRadius: 7,
              flexDirection: "row",
              alignItems: "center",
              justifyContent:"space-between",
            }}
          >

            <View>
              <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>{cart.length} items |  $ {total}</Text>
              <Text style={{fontSize:15,fontWeight:"400",color:"white",marginVertical:6}}>extra charges might apply</Text>
            </View>
    
            <Pressable onPress={() => navigation.replace("PickUp",{category:route.params.category, handyman:route.params.handyman,userLocation:route.params.userLocation})}>
              <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>Proceed to pickup</Text>
            </Pressable>
          </Pressable>
          )}
     
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

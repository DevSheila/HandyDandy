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
import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
  } from 'react';
import { DateCard } from "../components/DateCard";
import { useNavigation } from "@react-navigation/native";
import { StackList } from "../components/MapScreenNavigation";
import HomeScreen from "./HomeScreen";
// import { StackList } from "./MapScreenNavigation";
// import { useNavigation } from "@react-navigation/native";
import BookingSteps from '../components/BookingSteps';
 import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
  } from 'firebase/firestore';
  import { auth, database } from '../config/firebase';
  


const RequestsScreen2 = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();
  const [selected, setSelected] = useState([]);


  // const [selected, setSelected] = useState<orders[0] | null>(null);
 useLayoutEffect(() => {

        const collectionRef = collection(database, 'orders');
        // const q = query(collectionRef, orderBy('createdAt', 'desc'));
        const q = query(collectionRef);

    const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('querySnapshot unsusbscribe');
          setOrders(
            querySnapshot.docs.map(doc => ({
              _id:doc.data()._id,
              items:doc.data().items,
              pickUpDetails: doc.data().pickUpDetails,
              user: doc.data().user
            }))
          );
        });
    return unsubscribe;
   
      }, []);
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>


        <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item: { _id, items, pickUpDetails, user }, item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelected(item) 
            }}
            
            style={tailwind.style(
              `flex-row justify-between items-center px-6`,
              _id === selected?._id && "bg-gray-200"
            )}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{
                uri: user.avatar,
              }}
            />
            <View style={tailwind`-ml-8`}>
              <Text style={tailwind`text-lg font-bold`}>something</Text>
              <Text>20 min</Text>
            </View>
            <Text style={tailwind`text-lg`}>
           KSH.80
            </Text>
          </TouchableOpacity>
        )}
      />



    </SafeAreaView>
  );
};

const SURGE_CHARGE_RATE = 1.5;

export default RequestsScreen2;

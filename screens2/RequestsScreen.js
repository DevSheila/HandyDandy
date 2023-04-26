import { Image, View ,Text,FlatList,StyleSheet,ImageBackground,  TextInput,TouchableOpacity,ScrollView} from "react-native";
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
import Icon from 'react-native-vector-icons/Ionicons';

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
import BookingSteps from '../components/BookingSteps';
 import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
  } from 'firebase/firestore';
  import { auth, database } from '../config/firebase';
import StarRating from "../components/StarRating";
import colors from "../colors";
import { MaterialIcons } from "@expo/vector-icons";

  
const RequestsScreen = () => {

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
  

  useEffect(() => {
      navigation.setOptions({
          headerLeft: () => (
              <FontAwesome name="search" size={24} color={colors.gray} style={{marginLeft: 15}}/>
          ),
          headerRight: () => (
              <Image
                  source={{ uri: catImageUrl }}
                  style={{
                      width: 40,
                      height: 40,
                      marginRight: 15,
                  }}
              />
          ),
      });
  }, [navigation]);
    

    return (

 
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <Icon name="albums-outline" size={30}  />
          <View>
            <Text style={{ fontSize: 22, fontWeight: "600" }}>Requests</Text>
          </View>
        </View>
  
      
      <View>
                <FlatList
                  data={orders}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item: { _id, items, pickUpDetails, user }, item }) => (
                <TouchableOpacity
                  // onPress={() => setSelected(item)}
                  onPress={() => navigation.navigate("Chat",{handyman:pickUpDetails.handyman})}
                  style={tailwind.style(
                    `flex-row justify-between items-center p-3 px-6 m-2 bg-white mr-3 shadow`
                  )}
                >
                  
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      // resizeMode: "contain",
                      borderRadius: 50
                    }}

                   source={{uri:pickUpDetails.handyman.image}}
                  />
                <View style={tailwind`-ml-8 m-2`}>
                     <Text style={tailwind`text-lg font-bold`}>{pickUpDetails.category.name}</Text>
                     <Text>{pickUpDetails.handyman.title}</Text>

                     <StarRating ratings={pickUpDetails.handyman.rating} reviews={pickUpDetails.handyman.reviews} />
                    <Text >
                     {pickUpDetails.pickUpDate}
                   </Text>
              </View>
                
                </TouchableOpacity>
              )}
            />
           
      </View>
  


    </SafeAreaView>
    )};

    export default RequestsScreen;

    const styles = StyleSheet.create({
         container: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            backgroundColor: "#fff",
        },
        chatButton: {
            backgroundColor: colors.primary,
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: colors.primary,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: .9,
            shadowRadius: 8,
            marginRight: 20,
            marginBottom: 50,
        }
    });



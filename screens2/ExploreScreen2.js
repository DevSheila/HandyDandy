import React, { useEffect, useState,useRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  FlatList,
  SafeAreaView
} from "react-native";

import { useNavigation,useRoute } from "@react-navigation/native";
import tailwind from "tailwind-react-native-classnames";
import { useDispatch } from "react-redux";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { setDestination, setOrigin } from "../app/slices/navigationSlice";
import MapView, {PROVIDER_GOOGLE,Marker} from "react-native-maps";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useTheme } from '@react-navigation/native';
import { markers, mapDarkStyle, mapStandardStyle } from '../data/mapData';
import StarRating from '../components/StarRating';
import PropTypes from "prop-types";
import Icon from 'react-native-vector-icons/Ionicons';


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

function ExploreScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  // const [selected, setSelected] = useState<RidesData[0] | null>(null);
  const [userLocation, setUserLocation] = useState([]);
  const [elementVisible, setElementVisible] = useState(false);
  const [handyman, setHandyman] = useState([]);


  const initialMapState = {
    markers,
    categories: [
      { 
        name: 'Fastfood Center', 
        icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
      },
      {
        name: 'Restaurant',
        icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />,
      },
      {
        name: 'Dineouts',
        icon: <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />,
      },
      {
        name: 'Snacks Corner',
        icon: <MaterialCommunityIcons name="food" style={styles.chipsIcon} size={18} />,
      },
      {
        name: 'Hotel',
        icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
      },
  ],
    region: {
      latitude: 22.62938671242907,
      longitude: 88.4354486029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  // Set your initialRegion
  const [region, setRegion] = useState({
      latitude: 22.62938671242907,
      longitude: 88.4354486029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
  });
  const mapRef = useRef();

  // Call fitToSuppliedMarkers() method on the MapView after markers get updated
  useEffect(() => {
    if (mapRef.current) {
      // list of _id's must same that has been provided to the identifier props of the Marker
      mapRef.current.fitToSuppliedMarkers(markers.map(({ _id }) => _id));
    }
  }, [markers]);

  const [state, setState] = useState(initialMapState);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if( mapIndex !== index ) {
          mapIndex = index;
          const { coordinate } = state.markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });


  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      // outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20); 
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  }

  

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
        <View style={styles.container}>
          <MapView
            // ref={_map}
            // initialRegion={region}
            ref={mapRef} 
            initialRegion={region} 
            region={region}
            style={styles.container}
            provider={PROVIDER_GOOGLE}
            customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
            showsUserLocation={true}
            followUserLocation={true}
            zoomEnabled={true}
          >
            {state.markers.map((marker, index) => {
              const scaleStyle = {
                transform: [
                  {
                    // scale: interpolations[index].scale,
                    scale: 1,
                  },
                ],
              };
              return (
          //  {elementVisible ? (
                
                <Marker key={index} coordinate={marker.coordinate} onPress={(e)=>onMarkerPress(e)}>
                  <View style={[styles.markerWrap]}>
                    {/* <Image
                      source={require('../assets/map_marker.png')}
                      style={[styles.marker, scaleStyle]}
                      resizeMode="cover"
                    /> */}

                    <Icon name="location-outline" size={40} color={'#008080'} />
                  </View>
                </Marker>

                // ) : null} 
              );
            })}


              

          </MapView>
          <View style={styles.searchBox}>
            {/* <TextInput 
              placeholder="Search here"
              placeholderTextColor="#000"
              autoCapitalize="none"
              style={{flex:1,padding:0}}
            /> */}

              <GooglePlacesAutocomplete
              
              nearbyPlacesAPI="GooglePlacesSearch"
              placeholderTextColor="#000"
              autoCapitalize="none"
              debounce={400}
              placeholder="Choose an Address"
              enablePoweredByContainer={false}
              minLength={2}
              fetchDetails={true}
              onPress={(data, details = null) => {
                dispatch(
                  setOrigin({
                    location: details?.geometry.location,
                    description: data.description,
                  }),
                  setUserLocation( {
                    location: details?.geometry.location,
                    description: data.description,
                  })

                );
                // setLocation(data.description)
              
                setElementVisible(true)
                setRegion({
                    latitude: 22.62938671242907,
                    longitude: 88.4354486029795,
                    latitudeDelta: 0.04864195044303443,
                    longitudeDelta: 0.040142817690068,
                })
                dispatch(setDestination(null));
              }}
              query={{
                key: GOOGLE_MAPS_API_KEY,
                language: "en",
             
              }}
            style={styles.googlePlacesAutocomplete}

            />
            <Ionicons name="ios-search" size={20} />
          </View>
          {/* <ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            height={50}
            style={styles.chipsScrollView}
            contentInset={{ // iOS only
              top:0,
              left:0,
              bottom:0,
              right:20
            }}
            contentContainerStyle={{
              paddingRight: Platform.OS === 'android' ? 20 : 0
            }}
          >
            {state.categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.chipsItem}>
                {category.icon}
                <Text>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView> */}
      {elementVisible ? (

          <ScrollView
            ref={_scrollView}
            horizontal
            pagingEnabled
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 20}
            snapToAlignment="center"
            style={styles.scrollView}
            // contentInset={{
            //   top: 0,
            //   left: SPACING_FOR_CARD_INSET,
            //   bottom: 0,
            //   right: SPACING_FOR_CARD_INSET
            // }}
            // contentContainerStyle={{
            //   paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
            // }}
            // onScroll={(
            //   [
            //     {
            //       nativeEvent: {
            //         contentOffset: {
            //           x: mapAnimation,
            //         }
            //       },
            //     },
            //   ],
            //   {useNativeDriver: false}
            // )}
          >
            {state.markers.map((marker, index) =>(
              <TouchableOpacity
              key={index}
               onPress={() => {
                      setHandyman(marker)
                      // navigation.navigate("HomeScreen")
                       navigation.replace("HomeScreen",{
                            category:route.params.category,
                            handyman:marker,
                            userLocation:userLocation
                        })
                      }}
              >
              <View style={styles.card} key={index}>

                
                    <Image 
                      source={{ uri: marker.image,}}
                      // source={marker.image}
                      style={styles.cardImage}
                      resizeMode="cover"
                    />
                    <View style={styles.textContent}>
                      <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                      <StarRating ratings={marker.rating} reviews={marker.reviews} />
                      <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
                      <View style={styles.button}>
                        <TouchableOpacity
                          onPress={() => {}}
                          style={[styles.signIn, {
                            borderColor: '#008080',
                            borderWidth: 1
                          }]}
                        >
                          <Text style={[styles.textSign, {
                            color: '#008080'
                          }]}>SELECT</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

              </View>
              </TouchableOpacity>

            ))}
          </ScrollView>
      ) : null}

        </View>
     
  );
};

export default ExploreScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:10
  },
  googlePlacesAutocomplete:{
   flex:1,
  //  padding:10
  },
  searchBox: {
    position:'absolute', 
    marginTop: Platform.OS === 'ios' ? 40 : 20, 
    flexDirection:"row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf:'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position:'absolute', 
    top:Platform.OS === 'ios' ? 90 : 80, 
    paddingHorizontal:10
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection:"row",
    backgroundColor:'#fff', 
    borderRadius:20,
    padding:8,
    paddingHorizontal:20, 
    marginHorizontal:10,
    height:35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
      width: '100%',
      padding:5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3
  },
  textSign: {
      fontSize: 14,
      fontWeight: 'bold'
  }
});
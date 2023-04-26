import { StyleSheet, Text, View ,ScrollView,Pressable,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import MapScreen from '../screens/MapScreen';
import LocationScreen from '../screens/LocationScreen';
import ExploreScreen from '../screens2/ExploreScreen2';




const Services = ({item}) => {
  const navigation = useNavigation();

  return (

    <Pressable  
      onPress={() => navigation.navigate("Explore",{category:item})}
      style={{margin:10,backgroundColor:"white",padding:20,borderRadius:7}} 
    >
        <View>
          <Image source={item.image} style={{width:70,height:70}}/>
          <Text style={{textAlign:"center",marginTop:10}}>{item.name}</Text>
        </View>

    </Pressable>
  )
}

export default Services

const styles = StyleSheet.create({})
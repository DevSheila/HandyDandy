import { StyleSheet, Text, View, Pressable, Image, Touchable,ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";
import Services from "./Services";
import { useNavigation } from "@react-navigation/native";

const FeaturedService = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let categories=item.items;

  return (
  
  <View 
    style={{
      backgroundColor: "#F8F8F8",
      borderRadius: 8,
      margin: 14,
    }}
  >
      <Text style={{fontSize:16,fontWeight:"500",marginBottom:7,paddingLeft : 10}}>{item.name}</Text>
      <ScrollView
          horizontal
          contentContainerStyle={{}}
          showsHorizontalScrollIndicator={false}
      >
          {categories.map((item, index) => (
              <Services item={item} key={index} 

              />
          ))}
          

      </ScrollView>
  </View>

  );
};

export default FeaturedService;

const styles = StyleSheet.create({});

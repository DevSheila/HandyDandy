import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens2/HomeScreen';
import PickUpScreen from './screens2/PickUpScreen';
import CartScreen from './screens2/CartScreen';
import LoginScreen from './screens2/LoginScreen';
import RegisterScreen from './screens2/RegisterScreen';
import ProfileScreen from './screens2/ProfileScreen';
import OrderScreen from './screens2/OrderScreen';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/> */}
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="PickUp" component={PickUpScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Cart" component={CartScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Order" component={OrderScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
     </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})
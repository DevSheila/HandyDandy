import React from 'react'
import { StyleSheet, Text, View,StatusBar,Image } from 'react-native'
import Colors from '../constants/Colors'



const Splash = ({navigation}) => {

    setTimeout(()=>{
        navigation.navigate('Login')
    },4000)
    return (
        <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'white'}} >
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#465bd8" />
            <Image source={require('../assets/images/HandyDandy-removebg-preview.png')} style={{width:200,height:200}}  />    
            {/* <Text style={{fontSize:30,color:Colors.white}} >Nuntium</Text> */}
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({})
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Dimensions,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Colors from '../constants/Colors';


const {width} = Dimensions.get('screen');

const CustomDrawer = props => {
  return (
    <DrawerContentScrollView {...props}>
      <ImageBackground source={{uri:'https://wallpaperaccess.com/full/2708887.jpg'}} style={{height: 140}}>
        <Image source={{uri:'https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/8394f798931623.5ee79b6a909ea.jpg'}} style={styles.userImg} />
      </ImageBackground>
      <View style={styles.drawerListWrapper}>
        <DrawerItemList {...props} />
      </View>
      
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  userImg: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    position: 'absolute',
    left: width / 2 - 110,
    bottom: -110 / 2,
    borderWidth: 4,
    borderColor: Colors.white,
  },
  drawerListWrapper: {
    marginTop: 65,
  },
});

import React from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Pressable 
} from 'react-native';
import ProfileItem from '../components/ProfileItem';
import Icon from '../components/Icon';
import Demo from '../assets/data/demo.js';
import styles from '../assets/styles';

const ProfileScreen = () => {
    const user = auth.currentUser;
    const navigation = useNavigation();
    const signOutUser = () => {
        signOut(auth).then(() => {
            navigation.replace("Login");
        }).catch(err => {
            console.log(err);
        })
    }

      const {
        age,
        image,
        info1,
        info2,
        info3,
        info4,
        location,
        match,
        name
      } = Demo[7];

  return (
    <SafeAreaView style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Pressable style={{marginVertical:10}}>
        <Text>welcome {user.email}</Text>
      </Pressable>

      <Pressable onPress={signOutUser}>
          <Text>Sign Out</Text>
      </Pressable>

    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile}>
        <ImageBackground source={image} style={styles.photo}>
          <View style={styles.top}>
            <TouchableOpacity>
              <Text style={styles.topIconLeft}>
                <Icon name="chevronLeft" />
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.topIconRight}>
                <Icon name="optionsV" />
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <ProfileItem
          matches={match}
          name={name}
          age={age}
          location={location}
          info1={info1}
          info2={info2}
          info3={info3}
          info4={info4}
        />

        <View style={styles.actionsProfile}>
          <TouchableOpacity style={styles.circledButton}>
            <Text style={styles.iconButton}>
              <Icon name="optionsH" />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundedButton}>
            <Text style={styles.iconButton}>
              <Icon name="chat" />
            </Text>
            <Text style={styles.textButton}>CHAT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
    </SafeAreaView>

  
  )
}

export default ProfileScreen





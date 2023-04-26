import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet,
 ScrollView,
  ImageBackground,
  FlatList
} from "react-native";
import { useNavigation,useRoute } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';
import { Entypo } from '@expo/vector-icons';
import demo from "../assets/data/demo";
// markers
const catImageUrl = "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

import Message from '../components/Message';
import Icon from '../components/Icon';
import Demo from '../assets/data/demo.js';
import styles from '../assets/styles';
import { markers } from "../data/mapData";

const MessagesScreen = () => {

  const navigation = useNavigation();
  const route = useRoute();


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

    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.bg}
    >
      <View style={styles.containerMessages}>
          <View style={styles.top}>
            <Text style={styles.title}>Messages</Text>
            <TouchableOpacity>
              <Text style={styles.icon}>
                {/* <Icon name="optionsV" /> */}

              </Text>
            </TouchableOpacity>
          </View>


          <FlatList
            data={markers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Chat",{handyman:item})}
              >
                <Message
                  image={item.image}
                  name={item.title}
                  // lastMessage={item.message}
                  lastMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                />
              </TouchableOpacity>

            )}
          />
        <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
                style={customStyles.chatButton}
            >
                <Entypo name="chat" size={24} color={colors.lightGray} />
            </TouchableOpacity>
      </View>
    </ImageBackground>

    )};

    export default MessagesScreen;

    const customStyles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            backgroundColor: "#fff",
        },
        chatButton: {
            backgroundColor: "#66b2b2",
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: "#66b2b2",
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



import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
  } from 'react';
  import { TouchableOpacity, Text } from 'react-native';
  import { GiftedChat } from 'react-native-gifted-chat';
  import {
    collection,
    addDoc,
    updateDoc ,
    orderBy,
    query,
    onSnapshot,
    where,
    whereEqualTo
    // WhereEqualTo
    
  } from 'firebase/firestore';
  import { signOut } from 'firebase/auth';
  import { auth, database } from '../config/firebase';
  import { useNavigation,useRoute } from '@react-navigation/native';
  import { AntDesign } from '@expo/vector-icons';
  import colors from '../colors';


  export default function Chat() {

    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();


    const onSignOut = () => {
      signOut(auth).catch(error => console.log('Error logging out: ', error));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginRight: 10
              }}
              onPress={onSignOut}
            >
              <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 10}}/>
            </TouchableOpacity>
          )
        });
      }, [navigation]);


    useLayoutEffect(() => {

    console.log(route.params.handyman.id)
    const collectionRef = collection(database, 'chats');
    // const q =collectionRef.whereEqualTo("handyman_id" ,"==",route.params.handyman.id);
    // const q = query(collectionRef,whereEqualTo("handyman_id", route.params.handyman.id),orderBy('createdAt', 'desc'))
    // .WhereEqualTo("handyman_id", route.params.handyman.id)

    console.log("handyman_id"+route.params.handyman.id)
    const q = query(collectionRef,where("handyman_id" ,"==",route.params.handyman.id))


    const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('querySnapshot unsusbscribe');
          setMessages(
            querySnapshot.docs.map(doc => ({
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user,
              handyman:doc.data().handyman,
              handyman_id:doc.data().handyman_id,

            }))
          );
        });
    return unsubscribe;
      }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages)
        );
        // setMessages([...messages, ...messages]);
        const { _id, createdAt, text, user } = messages[0];    
        addDoc(collection(database, 'chats'), {
          _id,
          // user_id:user.user_id,
          user,
          handyman_id:route.params.handyman.id,
          handyman:route.params.handyman,
          createdAt,
          text,
        });
      }, []);

      return (
        // <>
        //   {messages.map(message => (
        //     <Text key={message._id}>{message.text}</Text>
        //   ))}
        // </>
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={false}
          showUserAvatar={false}
          onSend={messages => onSend(messages)}
          messagesContainerStyle={{
            backgroundColor: '#fff'
          }}
          textInputStyle={{
            backgroundColor: '#fff',
            borderRadius: 20,
          }}
          user={{
            _id: auth?.currentUser?.email,
            avatar: 'https://i.pravatar.cc/300'
          }}
        />
      );
}


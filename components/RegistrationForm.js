import React, { useState } from 'react';
import { View, Text, Image ,TextInput,Button, TouchableOpacity,Platform } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
// import ImagePicker from 'react-native-image-picker';
import ImgPicker from './ImgPicker';
import * as ImagePicker from 'expo-image-picker';
import sanityClient, { urlFor } from "../sanity";

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const [idFile, setIdFile] = useState(null);
  const [photo, setPhoto] = React.useState(null);


  // const handleRegister = () => {
  //   // Handle registration logic here
  // };

    const handleRegister = async () => {
    try {
      const newUser = {
        _type: 'user',
        email,
        name,
        phone,
        password,
        id,
        idFile,
        photo,
      };

      await sanityClient.create(newUser);

      console.log(newUser)
      // Handle successful registration here, e.g. navigate to login screen
    } catch (error) {
      // Handle registration error here
      console.error(error);
    }
  };

  return (
    <View style={tw`flex-1 p-6`}>
      <Text style={tw`text-xl font-bold mb-6`}>Register</Text>
      <TextInput
        style={tw`bg-white border border-gray-300 rounded-md px-4 py-2 mb-4`}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={tw`bg-white border border-gray-300 rounded-md px-4 py-2 mb-4`}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={tw`bg-white border border-gray-300 rounded-md px-4 py-2 mb-4`}
        placeholder="Phone Number"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        style={tw`bg-white border border-gray-300 rounded-md px-4 py-2 mb-4`}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <ImgPicker/>
    
      <TouchableOpacity
        style={tw`bg-blue-500 rounded-md px-4 py-2 mt-4 mb-4`}
        onPress={handleRegister}
      >
        <Text style={tw`text-white text-center font-bold`}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RegistrationForm;

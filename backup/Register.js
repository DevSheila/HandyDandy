import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

import { auth } from '../firebase';



export default function LoginScreen({ setScreen }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

 const loginUser = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigator
  } catch (error) {
    if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
      setError('Your email or password was incorrect');
    } else if (error.code === 'auth/email-already-in-use') {
      setError('An account with this email already exists');
    } else {
      setError('There was a problem with your request');
    }
  }
};


  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.header}>Login</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity onPress={() => setScreen('signup')}>
          <Text style={styles.link}>Create an account</Text>
        </TouchableOpacity>

        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter email address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Enter password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <Button title="Login" onPress={loginUser} disabled={!email || !password} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: 240,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  error: {
    marginBottom: 20,
    color: 'red',
  },
});








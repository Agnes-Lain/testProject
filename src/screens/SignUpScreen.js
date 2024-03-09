import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { SafeAreaView, View, TextInput, StyleSheet, Button, Text } from "react-native";
import { registerUser } from '../modules/Authentify';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

function SignUpScreen ({test}) {
  // navigation={navigation}
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [userName, setUserName] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text>Email address :</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />
      <Text>Password :</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />

      <Text>Re-confirm Password :</Text>
      <TextInput
        style={styles.input}
        onChangeText={setRePassword}
        value={rePassword}
      />
      <Text>Add a Username :</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUserName}
        value={userName}
      />

      <Button
        title="Sign up now"
        onPress={()=>registerUser( email, password, rePassword, userName, test )}
      />
    </SafeAreaView>
  )
};

export default SignUpScreen;

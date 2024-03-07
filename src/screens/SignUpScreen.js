import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { SafeAreaView, View, TextInput, StyleSheet, Button, Text } from "react-native";

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

function SignUpScreen ({navigation}) {
  // navigation={navigation}
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const [userName, setUserName] = useState();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [resourceOwer, setResourceOwer] = useState();

  async function registerUser(email, password, rePassword, userName) {
    // console.log(email, password);
    if (password !== rePassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://192.168.1.159:3000/users/tokens/sign_up',{
        email: email,
        password: password,
        user_name: userName
      })
      .then (response => {
        console.log(response.data);
        setAccessToken(response.data.token);
        setRefreshToken(response.data.refresh_token);
        setResourceOwer(response.data.resource_owner)
        // console.log(token);
      })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (accessToken) {
      navigation.navigate('Posts', {accessToken, refreshToken, resourceOwer});
    }
  });

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
        onPress={()=>registerUser( email, password, rePassword, userName )}
      />
    </SafeAreaView>
  )
};

export default SignUpScreen;

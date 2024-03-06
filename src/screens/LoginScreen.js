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

function LogInScreen ({navigation}) {
  // navigation={navigation}
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [resourceOwer, setResourceOwer] = useState();

  async function navigateToPosts(email, password) {
    // console.log(email, password);
    try {
      const response = await axios.post('http://192.168.1.159:3000/users/tokens/sign_in',{
        email: email,
        password: password
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

      <Button
        title="Login now"
        onPress={()=>navigateToPosts( email, password )}
      />
    </SafeAreaView>
  )
};

export default LogInScreen;

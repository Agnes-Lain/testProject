import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, TextInput, StyleSheet, Button, Text } from "react-native"

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
  // const [token, setToken] = useState();

  const getUser = async ( email, password ) => {
    console.log(email, password);
    try {
      const response = await axios.get('http://192.168.1.159:3000/api/v1/');
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  }

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
        onPress={()=>getUser( email, password )}
      />
    </SafeAreaView>
  )
};

export default LogInScreen;

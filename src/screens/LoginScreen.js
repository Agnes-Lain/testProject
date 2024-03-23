import React, {useState} from 'react';
import { SafeAreaView, View, TextInput, StyleSheet, Button, Text } from "react-native";
import { signIn } from '../modules/Authentify';
import { useNavigation } from '@react-navigation/native';

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

function LoginScreen ({ test, loadPosts }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [accessToken, setAccessToken] = useState();

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
        onPress={()=>{signIn(email, password, test)}}
      />
      <View style={{marginBottom: 20}}/>

      <Button
        title="Sign up now"
        onPress={() => navigation.navigate('SignUp') }
      />
    </SafeAreaView>
  )
};

export default LoginScreen;

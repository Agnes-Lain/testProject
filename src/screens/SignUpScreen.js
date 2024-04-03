import React, {useState} from 'react';
import { SafeAreaView, TextInput, StyleSheet, Button, Text } from "react-native";
import { registerUser } from '../modules/Authentify';
import { useDispatch } from 'react-redux';
import { updateAccess } from '../store/authSlice';


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

function SignUpScreen () {
  // navigation={navigation}
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [userName, setUserName] = useState('');

  const dispatch = useDispatch();

  async function registerUserUp(mail, password, rePassword, userName) {
    const result = await registerUser(mail, password, rePassword, userName)
    if (result) {
      dispatch(updateAccess(true))
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
        onPress={()=>{registerUserUp(email, password, rePassword, userName)}}
      />
    </SafeAreaView>
  )
};

export default SignUpScreen;

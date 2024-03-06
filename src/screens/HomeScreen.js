import { Text, View, Button } from 'react-native';
import React from 'react';
// import Posts from './PostsScreen';
// import LoginScreen from './LoginScreen';

function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{marginBottom: 50}}>Home Screen</Text>
      <Button
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title="login here"
        onPress={() => navigation.navigate('Login')}
      />
      <View style={{marginBottom: 20}}/>
      <Button
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
        title="open posts"
        onPress={() => navigation.navigate('Posts')}
      />
    </View>
  );
};

export default HomeScreen;

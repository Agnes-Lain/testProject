// import { StatusBar } from 'expo-status-bar';
// import React, {useState, useEffect} from 'react';
// import { Text, View, Button } from 'react-native';
// import axios from 'axios';
// import {PostModal} from './src/components/core';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen  from './src/screens/HomeScreen';
import Posts  from './src/screens/PostsScreen';
import LogInScreen  from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }}/> */}
        <Stack.Screen name="Login" component={LogInScreen} />
        <Stack.Screen name="Posts" component={Posts} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;



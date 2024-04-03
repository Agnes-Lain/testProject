import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native';
// import HomeScreen  from './src/screens/HomeScreen';
import PostsScreen  from './src/screens/PostsScreen';
import LoginScreen  from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import { updateAccessStatus } from './src/modules/Authentify';
import NewPostScreen from './src/screens/NewPostScreen';
import {store} from './src/store/store';
import { Provider } from 'react-redux';
// import { ApiProvider } from '@reduxjs/toolkit/query/react';
// import { postsApi } from './src/services/postsApi';
import { useSelector, useDispatch } from 'react-redux';
import { updateAccess, updateCheckingToken } from './src/store/authSlice';

const LoggedStack = createNativeStackNavigator();
const UnloggedStack = createNativeStackNavigator();

function LoggedStackScreens() {
  return (
    <LoggedStack.Navigator>
      <LoggedStack.Screen name="Posts" component={PostsScreen}/>
      <LoggedStack.Screen name="NewPost" component={NewPostScreen}/>
    </LoggedStack.Navigator>
  )
}

function UnloggedStackScreens() {
  return (
    <UnloggedStack.Navigator>
      <UnloggedStack.Screen name="Login" component={LoginScreen}/>
      <UnloggedStack.Screen name="SignUp" component={SignUpScreen}/>
    </UnloggedStack.Navigator>
  )
}


function App() {
  // const [haveAccess, setHaveAccess] = useState(false);
  // const [checkingToken, setCheckingToken] = useState(true);

  // const globalState = useSelector((state)=>console.log(state))
  const access = useSelector((state) => state.authStatus.accessStatus)
  const tokenStatus = useSelector((state) => state.authStatus.checkingToken)
  const dispatch = useDispatch()



  useEffect(() => {
    async function checkAcess() {
      const result = await updateAccessStatus()
      // console.log(result)
      if (result) {
        // console.log("dispatch")
        dispatch(updateAccess(true))
        dispatch(updateCheckingToken(false))
      } else {
      dispatch(updateAccess(false))
      dispatch(updateCheckingToken(false))
      }
    }
    checkAcess()
  }, []);

  if (tokenStatus) {
    return (
      <View style={{justifyContent:'center',flex: 1, alignItems: 'center'}}>
        <Text>Checking token...</Text>
      </View>
    )
  }
  // console.log("part 2")

  return (
    <NavigationContainer>
        {access ? (
          <LoggedStackScreens/>
        ) : (
          <UnloggedStackScreens/>
        )}
    </NavigationContainer>
  );
};


export default () => {
  return (
    <Provider store={store}>

        <App />

    </Provider>
  );
};

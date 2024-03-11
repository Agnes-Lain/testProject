import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native';
// import HomeScreen  from './src/screens/HomeScreen';
import Posts  from './src/screens/PostsScreen';
import LoginScreen  from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import { checkingAccess } from './src/modules/Authentify';
import NewPostScreen from './src/screens/NewPostScreen';

const LoggedStack = createNativeStackNavigator();
const UnloggedStack = createNativeStackNavigator();

function LoggedStackScreens({test}) {
  return (
    <LoggedStack.Navigator>
      <LoggedStack.Screen name="Posts" component={()=> <Posts test={test}/>} />
      <LoggedStack.Screen name="NewPost" component={NewPostScreen} />
    </LoggedStack.Navigator>
  )
}

function UnloggedStackScreens({ test }) {
  return (
    <UnloggedStack.Navigator>
      <UnloggedStack.Screen name="Login" component={()=> <LoginScreen test={test} />} />
      <UnloggedStack.Screen name="SignUp" component={()=> <SignUpScreen test={test} />} />
    </UnloggedStack.Navigator>
  )
}


function App() {
  const [ haveAccess, setHaveAccess ] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);

  function test(accessStatus) {
    console.log("test function is called with status: " + accessStatus);
    if (accessStatus === 200 || accessStatus === 201){
      setHaveAccess(true);
    } else {
      setHaveAccess(false);
    }
  }

  useEffect(() => {
    async function checkToken() {
      const accessStatus = await checkingAccess();
      setHaveAccess(accessStatus);
      // const token = await getValueFor("accessToken");
      // console.log ('stock token is:\n' + token);
      setCheckingToken(false);
      // setAccessToken(token);
    }
    checkToken();
  }, []);

  if (checkingToken) {
    return (
      <View>
        <Text>Checking token...</Text>
      </View>
    )
  }
  return (
    <NavigationContainer>
        { haveAccess ? (
          <LoggedStackScreens test={test} />
          ) : (
          <UnloggedStackScreens test={test} />
        )}
    </NavigationContainer>
  );
};

export default App;



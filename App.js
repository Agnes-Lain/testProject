import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native';
// import HomeScreen  from './src/screens/HomeScreen';
import PostsScreen  from './src/screens/PostsScreen';
import LoginScreen  from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import { checkingAccess } from './src/modules/Authentify';
import NewPostScreen from './src/screens/NewPostScreen';
// import { getPosts } from './src/modules/HandlePost';
import store from './src/store/store';
import { Provider } from 'react-redux';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { postsApi } from './src/services/postsApi';
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "./src/store/loadPostsSlice";
import { useGetPostsQuery } from './src/services/postsApi';

const LoggedStack = createNativeStackNavigator();
const UnloggedStack = createNativeStackNavigator();

/*
const props = {
  test: function test() {
    console.log('test');
  },
  posts: [],
  setPosts: function setPosts() {
    console.log('setPosts');
  }
}
*/

function LoggedStackScreens({test}) {
  return (
    <LoggedStack.Navigator>
      <LoggedStack.Screen name="Posts" component={()=> <PostsScreen test={test} />} />
      <LoggedStack.Screen name="NewPost" component={() => <NewPostScreen />} />
    </LoggedStack.Navigator>
  )
}

function UnloggedStackScreens({ test}) {
  return (
    <UnloggedStack.Navigator>
      <UnloggedStack.Screen name="Login" component={()=> <LoginScreen test={test}/>} />
      <UnloggedStack.Screen name="SignUp" component={()=> <SignUpScreen test={test} />} />
    </UnloggedStack.Navigator>
  )
}


function App() {
  const [haveAccess, setHaveAccess] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  // const posts = useSelector((state) => state.loadPosts.value);
  // const dispatch = useDispatch()

  function test(accessStatus) {
    console.log("test function is called with status: " + accessStatus);
    if (accessStatus === 200 || accessStatus === 201){
      setHaveAccess(true);
    } else {
      setHaveAccess(false);
    }
  }

  // async function loadPosts() {
  //   console.log('loadPosts');
  //   try {
  //     const posts = await getPosts();
  //     setPosts(posts);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  useEffect(() => {
    async function checkToken() {
      const accessStatus = await checkingAccess();
      console.log('accessStatus is: ' + accessStatus);
      setHaveAccess(accessStatus);
      setCheckingToken(false);
    }
    checkToken();
  }, []);

  if (checkingToken) {
    return (
      <View style={{justifyContent:'center',flex: 1, alignItems: 'center'}}>
        <Text>Checking token...</Text>
      </View>
    )
  }

  return (
    <NavigationContainer>
        {haveAccess ? (
          <LoggedStackScreens test={test}/>
        ) : (
          <UnloggedStackScreens test={test} />
        )}
    </NavigationContainer>
  );
};


export default () => {
  return (
    <ApiProvider api={postsApi}>
      <App />
    </ApiProvider>
  );
};
// export default App;

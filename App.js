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
import { getPosts } from './src/modules/HandlePost';

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

function LoggedStackScreens({test, posts, loadPosts}) {
// function LoggedStackScreens(props) {
//   const { test, posts, setPosts } = props;

  // const test = props.test;
  // const { test: test } = props;
  // const { test } = props;

  // const posts = props.posts;
  // const setPosts = props.setPosts;

  return (
    <LoggedStack.Navigator>
      <LoggedStack.Screen name="Posts" component={()=> <Posts test={test} posts={posts} loadPosts={loadPosts} />} />
      <LoggedStack.Screen name="NewPost" component={() => <NewPostScreen loadPosts={loadPosts} />} />
    </LoggedStack.Navigator>
  )
}

function UnloggedStackScreens({ test, loadPosts}) {
  return (
    <UnloggedStack.Navigator>
      <UnloggedStack.Screen name="Login" component={()=> <LoginScreen test={test} loadPosts={loadPosts}/>} />
      <UnloggedStack.Screen name="SignUp" component={()=> <SignUpScreen test={test} />} />
    </UnloggedStack.Navigator>
  )
}


function App() {
  const [haveAccess, setHaveAccess] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  const [posts, setPosts] = useState([]);

  function test(accessStatus) {
    console.log("test function is called with status: " + accessStatus);
    if (accessStatus === 200 || accessStatus === 201){
      setHaveAccess(true);
    } else {
      setHaveAccess(false);
    }
  }

  async function loadPosts() {
    console.log('loadPosts');
    try {
      const posts = await getPosts();
      setPosts(posts);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function checkToken() {
      const accessStatus = await checkingAccess();
      console.log('accessStatus is: ' + accessStatus);
      setHaveAccess(accessStatus);
      // const token = await getValueFor("accessToken");
      // console.log ('stock token is:\n' + token);
      setCheckingToken(false);
      if (accessStatus) {
        loadPosts();
      }
      // setAccessToken(token);
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
        { haveAccess ? (
          <LoggedStackScreens test={test} posts={posts} loadPosts={loadPosts}/>
          ) : (
          <UnloggedStackScreens test={test} loadPosts={loadPosts} />
        )}
    </NavigationContainer>
  );
};

export default App;

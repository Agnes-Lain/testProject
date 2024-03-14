import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Button, TouchableHighlight } from 'react-native';
import { PostModal } from "../components/core";
import { signOut } from '../modules/Authentify';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getPosts, deletePost } from '../modules/HandlePost';

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  maincontainer: {
    marginBottom: 70,
    height: '100%',
    padding: 10,
  },
  item: {
    margin: 10,
    height: 70,
  },
  headerOne: {
    padding: 10,
    backgroundColor: '#2873',
    borderRadius: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'dodgerblue',
  },
  textPrimary: {
    color: 'dodgerblue',
    fontSize: 14,
  },
  bottomView: {
    width: '100%',
    height: 70,
    // flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
    flexDirection: 'row',
  },
});

function Posts ({ test, posts, loadPosts }) {
  // const [posts, setPosts] = useState([]);
  const [postInModal, setPostInModal] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  // const [isReRender, setIsReRender] = useState(false);
  const navigation = useNavigation();

  function refreshPosts(status) {
    if (status === 200 || status === 201 || status === 204){
      // console.log("called reRenderPosts");
      // setIsReRender(!isReRender);
      // console.log("isReRender is now: " + isReRender);
      loadPosts();
    }
  };

  const removePost = async (post_id) => {
    // Fetch data from your API and update the state
    try {
      await deletePost(post_id)
      console.log("post deleted");
      // console.log(returnStatus)
      // reRenderPosts(returnStatus)
      // refreshPosts(returnStatus)
      loadPosts();
    } catch (error) {
      console.error(error);
    }
  };

  // async function loadPosts() {
  //   console.log('loadPosts');
  //   try {
  //     const posts = await getPosts();
  //     setPosts(posts);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   // console.log('useEffect');
  //   loadPosts();
  // }, [isReRender]);

  // useFocusEffect(
  //   useCallback(() => {
  //     loadPosts();

  //     return () => {
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //     };
  //   }, [])
  // );

  const openModal = (post) => {
    setPostInModal(post)
    setModalVisible(true);
  };

  return (
    <View style={styles.main}>
    <ScrollView style={{flex: 1}}>
      <View style={styles.maincontainer}>
        {posts.map((post) => (
          <View key={post.id} style={styles.item}>
            <TouchableOpacity activeOpacity={0.6} onPress={()=>openModal(post)}>
              <Text style={styles.headerOne}>
                {post.id} - {post.title}
              </Text>
            </TouchableOpacity>
            <View style = {{marginTop: 5, flexDirection:'row', justifyContent: 'space-between'}}>
              <Text style={styles.textPrimary}>
                Author: {post.user.user_name}
              </Text>
              <TouchableHighlight onPress={()=>{removePost(post.id)}}>
                <View>
                    <Text style={{color:'red'}}>Delete</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
    <PostModal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      postInModal={postInModal}
    />
    <View style={styles.bottomView}>
      <Button
        title="Log out"
        onPress={()=>{signOut(test)}}
      />
      <Button
        title="New post"
        onPress={()=>navigation.navigate('NewPost')}
      />
    </View>
  </View>
  )
}

export default Posts;

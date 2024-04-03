import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Button, TouchableHighlight } from 'react-native';
import { PostModal } from "../components/core";
import { signOut } from '../modules/Authentify';
import { useNavigation } from '@react-navigation/native';
import { useGetPostsQuery,useDeletePostMutation } from '../services/postsApi';
import { useDispatch } from 'react-redux';
import { updateAccess } from '../store/authSlice';
import { postsApi } from '../services/postsApi';

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

function PostsScreen () {
  const [postInModal, setPostInModal] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch()


  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery();

  const [deletePost] = useDeletePostMutation()

  async function signedUserOut() {
    const result = await signOut()
    if (result) {
      dispatch(updateAccess(false))
      dispatch(postsApi.util.resetApiState());
    }
  }

  const openModal = (post) => {
    setPostInModal(post)
    setModalVisible(true);
  };

  function postsList() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.maincontainer}>
          {posts?.map((post) => (
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
                <TouchableHighlight onPress={()=>deletePost(post.id)}>
                  <View>
                      <Text style={{color:'red'}}>Delete</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    )
  }

  let content;
  if (isLoading) {
    content = <Text>Is loading...</Text>
  } else if (isSuccess) {
    // console.log(posts);
    content = postsList();
  } else if (isError) {
    content = <Text>{error.message}</Text>
  } else {
    content = <Text>Unexpected state</Text>;
  }


  return (
    // <View>{content}</View>
    <View style={styles.main}>
      {/* <View>{content}</View> */}
      <View style={{ flex:1 }}>
        {postsList()}
      </View>
      <PostModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        postInModal={postInModal}
      />
      <View style={styles.bottomView}>
        <Button
          title="Log out"
          onPress={()=> signedUserOut()}
        />
        <Button
          title="New post"
          onPress={()=>navigation.navigate('NewPost')}
        />
      </View>
    </View>
  )
}

export default PostsScreen;

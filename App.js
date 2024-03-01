// import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Modal, Alert, TouchableOpacity, Pressable } from 'react-native';
import axios from 'axios';
import {PostModal} from './src/components/core';

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    marginTop: 30,
    marginHorizontal: 10,
    height: 50,
    backgroundColor: '#2873',
    borderRadius: 10,
  },
  headerOne: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'dodgerblue',
  },
  textPrimary: {
    color: 'dodgerblue',
    fontSize: 14,
    marginTop: 15,
  },
});

function App () {
  const [posts, setPosts] = useState([]);
  const [postInModal, setPostInModal] = useState({});//[post, setPostInModal
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // console.log('useEffect');
    async function getPosts() {
      try {
        const response = await axios.get('http://192.168.1.159:3000/api/v1/posts');
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getPosts();
    // return () => {
    //   console.log('cleanup');
    // };
  }, []);

  const openModal = (post) => {
    setPostInModal(post)
    setModalVisible(true);
  };

  return (
    <ScrollView style={{marginTop: 50}}>
      {posts.map((post) => (
        <View key={post.id} style={styles.item}>
          {/* <TouchableOpacity activeOpacity={0.6} onPress={openModal}> */}
          <TouchableOpacity activeOpacity={0.6} onPress={()=>openModal(post)}>
          {/* <TouchableOpacity activeOpacity={0.6} onPress={openModal()}> */}

            <Text style={styles.headerOne} >
              {post.id} - {post.title}
            </Text>
          </TouchableOpacity>
          <Text style={styles.textPrimary}>
            Author: {post.user.user_name}
          </Text>
        </View>
      ))}

    <PostModal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      postInModal={postInModal}
    />

    </ScrollView>

    // <View style={styles.container}>
    //   <FlatList
    //     data = {posts}
    //     renderItem = {({ item }) =>
    //       <Text style={[styles.item, styles.headerOne]}>
    //         {item.title} - Author : {item.user.user_name}
    //       </Text>}
    //   />
    // </View>
  );
};

export default App;

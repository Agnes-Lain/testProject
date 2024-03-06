import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { PostModal } from "../components/core";

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
    flex: 2,
    padding: 10,
  },
  item: {
    margin: 10,
    flexDirection: 'column',
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
});


function Posts ({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  const [postInModal, setPostInModal] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const { accessToken, refreshToken, resourceOwer } = route.params;
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
};

  useEffect(() => {
    console.log('useEffect');
    async function getPosts() {
      try {
        const response = await axios.get('http://192.168.1.159:3000/api/v1/posts', config);
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
    <ScrollView style={styles.container}>
      {posts.map((post) => (
        <View key={post.id} style={styles.item}>
          {/* <TouchableOpacity activeOpacity={0.6} onPress={openModal}> */}
          <TouchableOpacity activeOpacity={0.6} onPress={()=>openModal(post)}>
            <Text style={styles.headerOne} >
              {post.id} - {post.title}
            </Text>
          </TouchableOpacity>
          <View style = {{marginTop: 5}}/>
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
  )
};

export default Posts;

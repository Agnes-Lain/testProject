import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import { PostModal } from "../components/core";
import { getValueFor, signOut } from '../modules/Authentify';


const styles = StyleSheet.create({
  maincontainer: {
    marginBottom: 70,
    height: '100%',
    padding: 10,
  },
  main: {
    flex: 1,
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
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
});


function Posts ({test}) {
  const [posts, setPosts] = useState([]);
  const [postInModal, setPostInModal] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // console.log('useEffect');
    async function getPosts() {
      try {
        const token = await getValueFor("accessToken");
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get('http://192.168.1.159:3000/api/v1/posts', config);
        // console.log('response.data: ', response.data);
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getPosts();
  }, []);

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
            <View style = {{marginTop: 5}}/>
            <Text style={styles.textPrimary}>
              Author: {post.user.user_name}
            </Text>
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
    </View>
  </View>
  )
}

export default Posts;

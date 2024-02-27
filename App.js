// import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

function App () {
  console.log('render App');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log('useEffect');
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
    return () => {
      console.log('cleanup');
    };
  }, []);

  return (
    // <View style={{marginTop: 50}}>
    //   {posts.map((post) => (
    //     <View key={post.id}>
    //       <Text>{post.id} - {post.title} - {post.user.user_name}</Text>
    //     </View>
    //   ))}
    // </View>

    <View style={styles.container}>
      <FlatList
        data = {posts}
        renderItem = {({ item }) =>
          <Text style={styles.item}>
            {item.title} - Author : {item.user.user_name}
          </Text>}
      />
    </View>
  );
};

export default App;

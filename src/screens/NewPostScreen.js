import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { postNewPost } from '../modules/HandlePost';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    margin: 20,
  },
  title: {
    fontSize: 20,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    margin: 12,
  },
  input: {
    height: '50%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

function NewPostScreen ({ loadPosts }) {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigation = useNavigation();

  async function returnToPosts() {
    const status = await postNewPost(title, content);
    console.log("status is: " + status);
    if (status === 201){
      // TODO add post to post list or refresh the list
      navigation.navigate('Posts');
      loadPosts();
    }
  }

  return (
    <View style={styles.container}>
      <Text>Title :</Text>
      <TextInput
        style={styles.title}
        onChangeText={setTitle}
        value={title}
      />
      <Text>Content :</Text>
      <TextInput
        style={styles.input}
        onChangeText={setContent}
        value={content}
      />

      <Button
        title="Add a new post now"
        onPress={()=>returnToPosts()}
      />
    </View>
  )
}

export default NewPostScreen

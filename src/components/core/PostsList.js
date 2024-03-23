import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TouchableHighlight } from "react-native";

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

function PostsList ({posts}){
  return (
    <View>
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
    </View>
  )
}

export default PostsList

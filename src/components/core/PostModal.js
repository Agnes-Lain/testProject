import React from "react";
import { Modal, View, Text, Pressable, Alert, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerOne: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'dodgerblue',
    padding: 10,
  },
  textPrimary: {
    color: 'dodgerblue',
    fontSize: 14,
    padding: 5,
    // marginTop: 15,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'pink',
    borderRadius: 10,
    width: "80%",
    height: "50%",
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  button: {
    borderRadius: 10,
    padding: 5,
    elevation: 2,
    textAlignVertical: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonClose: {
    backgroundColor: '#fff',
  },
 });


function PostModal ({modalVisible, setModalVisible, postInModal}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.headerOne}>
            {postInModal.title}
          </Text>
          <Text style={styles.textPrimary}>
            {postInModal.content}
          </Text>
          <View style={styles.bottom}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textPrimary}>
                close Modal
              </Text>
            </Pressable>
           </View>
        </View>
      </View>
    </Modal>
  )
}

export default PostModal;

import * as SecureStore from 'expo-secure-store';


async function saveAuth(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    // if key value pair can be find in secureStore:
    return result;
  } else {
    // if no key exist in the secureStore:
    return null;
  }
}

// this function will delete records in secureStore with given key:
async function deleteValueFor(key) {
  let result = await SecureStore.deleteItemAsync(key);
  return
}

export {saveAuth, getValueFor, deleteValueFor};

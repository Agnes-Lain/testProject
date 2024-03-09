import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const API_URL = 'http://192.168.1.159:3000/users/tokens/';


async function saveAuth(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    // alert("No values stored under \n"  + key );
    return null;
  }
}

async function deleteValueFor(key) {
  let result = await SecureStore.deleteItemAsync(key);
  return
}

function isEmailPasswordValid(email, password) {
  if (email === '' || password === '') {
    alert('Missing email or password');
    return false;
  }

  return true;
}

async function signIn(email, password, test){
  const emailPasswordIsValid = isEmailPasswordValid(email, password);
  if (!emailPasswordIsValid) return;

  try {
    const response = await axios.post(`${API_URL}sign_in`, {
      email: email,
      password: password
    })
      // console.log(response.status);
      saveAuth("accessToken", response.data.token);
      saveAuth("refreshToken", response.data.refresh_token);
      saveAuth("resourceOwer", response.data.resource_owner);
      test(response.status);
  } catch (error) {
    // console.error(error);
    alert('Wrong email or password, please retry');
  }
}


function isDataValid(email, password, rePassword) {
  if (password !== rePassword) {
    alert('Passwords do not match');
    return false;
  }

  const emailPasswordIsValid = isEmailPasswordValid(email, password);
  if (!emailPasswordIsValid) return false;

  return true;
}

async function registerUser(email, password, rePassword, userName, test) {
  // console.log(email, password);
  const dataIsValid = isDataValid(email, password, rePassword);
  if (!dataIsValid) {
    return;
  }

  try {
    const response = await axios.post(`${API_URL}sign_up`,{
      email: email,
      password: password,
      user_name: userName
    })
    // .then (response => {
    console.log(response.status);
    saveAuth("accessToken", response.data.token);
    saveAuth("refreshToken", response.data.refresh_token);
    saveAuth("resourceOwer", response.data.resource_owner);
    test(response.status);
      // console.log(token);
    // })
  } catch (error) {
    console.error(error);
  }
}

  async function checkingAccess() {
    try {
      // console.log('checkingAccess');
      const token = await getValueFor("accessToken");
      if (token === null) {
        // console.log('no token');
        return false;
      }
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const info = await axios.get(`${API_URL}info`, config);
      // console.log(info);
      return true
    } catch (error) {
      // console.log(error.response.data.error);
      const errorReason = error.response.data.error
      if (errorReason === "expired_token") {
        const refreshToken = await getValueFor("refreshToken");
        // console.log(refreshToken);
        const configRefresh = {
          headers: { Authorization: `Bearer ${refreshToken}` }
        };
        const newToken = await axios.post(`${API_URL}refresh`, {}, configRefresh);
        // console.log(newToken.data);
        saveAuth("accessToken", newToken.data.token);
        saveAuth("refreshToken", newToken.data.refresh_token);
        saveAuth("resourceOwer", newToken.data.resource_owner);
        return true
        }
      }
    }

  async function signOut(test) {
    try {
      const token = await getValueFor("accessToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.post(`${API_URL}revoke`, {}, config);
      console.log(response.status);
      deleteValueFor("accessToken");
      deleteValueFor("refreshToken");
      deleteValueFor("resourceOwer");
      test(response.status);

    } catch (error) {
      console.error(error);
    }
  }

export { saveAuth, getValueFor, signIn, registerUser, checkingAccess, signOut};

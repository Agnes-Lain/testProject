import { saveAuth, getValueFor, deleteValueFor } from '../utils/secreteStore';
import axios from 'axios';


const API_URL = 'http://192.168.1.53:3000/users/tokens/';


function isEmailPasswordValid(email, password) {
  if (email === '' || password === '') {
    alert('Missing email or password');
    return false;
  }

  return true;
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

async function updateAccessStatus() {
  try {
    // console.log('checkingAccess in updateAccessStatus function');
    const token = await getValueFor("accessToken");
    if (token === null) {
      // console.log("no token:", token);
      return false
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const info = await axios.get(`${API_URL}info`, config);
    return true
  } catch (error) {
    console.log("check userinfo error is: ", error.response.data.error);
    const errorReason = error.response.data.error
    if (errorReason === "expired_token") {
      const refreshToken = await getValueFor("refreshToken");
      console.log(refreshToken);
      const configRefresh = {
        headers: { Authorization: `Bearer ${refreshToken}` }
      };
      const newToken = await axios.post(`${API_URL}refresh`, {}, configRefresh);
      console.log(newToken.data);
      saveAuth("accessToken", newToken.data.token);
      saveAuth("refreshToken", newToken.data.refresh_token);
      saveAuth("resourceOwer", newToken.data.resource_owner);
      return true
      }
      return false
    }
  }

async function signIn(email, password){
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
      return true
  } catch (error) {
    console.error(error);
    alert('Wrong email or password, please retry');
  }
}

async function registerUser(email, password, rePassword, userName) {
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
      // console.log(response.status);
      saveAuth("accessToken", response.data.token);
      saveAuth("refreshToken", response.data.refresh_token);
      saveAuth("resourceOwer", response.data.resource_owner);
      return true;
  } catch (error) {
    console.error(error);
  }
}

  async function signOut() {
    // console.log("called sign out")
    try {
      const token = await getValueFor("accessToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.post(`${API_URL}revoke`, {}, config);
      // console.log(response.status);
      deleteValueFor("accessToken");
      deleteValueFor("refreshToken");
      deleteValueFor("resourceOwer");
      // test(response.status);
      return true
    } catch (error) {
      console.error(error);
    }
  }

export {
  updateAccessStatus,
  signIn,
  signOut,
  registerUser
  };

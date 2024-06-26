import { getValueFor } from "../utils/secreteStore";
import axios from "axios";
import { updateAccessStatus } from "./Authentify";

const API_URL = "http://192.168.1.53:3000/api/v1/posts";


async function setConfig () {
  try {
    const hasAccess = await updateAccessStatus();
    // console.log('hasAccess: ', hasAccess);
    if (hasAccess) {
      const token = await getValueFor("accessToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
        return config;
      }
  } catch (error) {
    console.log(error);
  }
}


async function getPosts() {
  try {
    console.log('now fetching posts...');
    const config = await setConfig();
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


  async function deletePost(post_id) {
    // throw new Error('BOUH!!!!');
    // try {
      // console.log("process delete")
      const config = await setConfig();
      // console.log(config)
      const response = await axios.delete(`${API_URL}/${post_id}`, config);
      return response.status;
    // } catch (error) {
    //   console.log(error);
    // }
  };

  async function postNewPost(title, content) {
    try {
      const config = await setConfig();
      const postPost = await axios.post(API_URL, {title, content}, config);
      if (postPost.status=== 201) {
        alert('Success!', 'Nes post created!')
        // console.log(postPost.status);
        return postPost.status;
      };
    } catch (error) { console.error(error); }
}


export { getPosts, deletePost, postNewPost };

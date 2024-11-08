import axios from 'axios';

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({ type: 'GET_POSTS', payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const addPost = (postData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/posts', postData);
    dispatch({ type: 'ADD_POST', payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({ type: 'DELETE_POST', payload: id });
  } catch (err) {
    console.error(err);
  }
};

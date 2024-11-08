import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../redux/actions/postActions';

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };

  return (
    <div>
      <h4>{post.content}</h4>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Post;

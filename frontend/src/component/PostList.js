import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, addPost } from '../redux/actions/postActions';
import Post from './Post';

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  const [content, setContent] = useState('');

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost({ content }));
    setContent('');
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a post..."
        />
        <button type="submit">Post</button>
      </form>
      <div>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;

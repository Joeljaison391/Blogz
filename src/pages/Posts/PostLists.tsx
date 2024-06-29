
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPosts } from '../../features/posts/postsSlice';
import type { RootState, AppDispatch } from '../../Context/store';

const PostLists: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const status = useSelector((state: RootState) => state.posts.status);
  const error = useSelector((state: RootState) => state.posts.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllPosts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center mt-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.postId} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <p className="text-gray-500 text-sm">Author: {post.author.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostLists;

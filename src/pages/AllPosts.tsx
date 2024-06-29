// src/pages/AllPosts.tsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPosts } from '../features/posts/postsSlice';
import type { RootState, AppDispatch } from '../Context/store';
import { HomeNavbar } from '../components/Navbars/HomeNavbar';
import PostComponent from '../components/AllPostsComponents/PostComponent';
import TrendingArticles from '../components/AllPostsComponents/TrendingArticles';
import TopDiscussions from '../components/AllPostsComponents/TopDiscussions';

const AllPosts: React.FC = () => {
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
    <>
      <div className="font-sans w-dvw overflow-hidden">
        <HomeNavbar />
      </div>
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-3/4 lg:pr-8">
            {posts.map(post => (
              <PostComponent key={post.postId} post={post} />
            ))}
          </div>
          <div className="lg:w-1/4 hidden lg:block">
            <TrendingArticles />
            <TopDiscussions />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPosts;

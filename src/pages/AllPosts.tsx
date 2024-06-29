/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../Context/store'; 
import { fetchPostsByPage, resetPosts } from '../features/posts/postsSlice';
import { HomeNavbar } from '../components/Navbars/HomeNavbar';
import PostComponent from '../components/AllPostsComponents/PostComponent';
import TrendingArticles from '../components/AllPostsComponents/TrendingArticles';
import TopDiscussions from '../components/AllPostsComponents/TopDiscussions';

const AllPosts: React.FC = () => {
 
  const dispatch: ThunkDispatch<RootState, undefined, any> = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const { posts, status, page, hasMore } = useSelector((state: RootState) => state.posts);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const loadInitialPosts = async () => {
      setLoadingMore(true);
      try {
        await dispatch(resetPosts());
        await dispatch(fetchPostsByPage(1)); 
      } catch (error) {
        console.error('Error loading initial posts:', error);
      } finally {
        setLoadingMore(false);
      }
    };

    loadInitialPosts();
  }, [dispatch]);

  const loadMorePosts = useCallback(async () => {
    console.log('Loading more posts');
    if (status !== 'loading' && hasMore && !loadingMore) {
      setLoadingMore(true);
      try {
        const nextPage = page + 1; // Increment the page number
        await dispatch(fetchPostsByPage(nextPage));
      } catch (error) {
        console.error('Error loading more posts:', error);
      } finally {
        setLoadingMore(false);
      }
    }
  }, [dispatch, status, hasMore, page, loadingMore]);

  const handleLoadMoreClick = () => {
    loadMorePosts();
  };

  return (
    <>
      <div className="font-sans w-full overflow-hidden">
        <HomeNavbar />
      </div>
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-3/4 lg:pr-8">
            {posts.map((post) => (
              <PostComponent key={post.postId} post={post} />
            ))}
            {loadingMore && <div className="text-center mt-4">Loading more posts...</div>}
            {!loadingMore && hasMore && (
              <div className="text-center mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleLoadMoreClick}
                >
                  Load More
                </button>
              </div>
            )}
            {!hasMore && <div className="text-center mt-4">No more posts to load</div>}
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

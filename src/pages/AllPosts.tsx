/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { motion } from 'framer-motion'
import { RootState } from '../Context/store'
import { fetchPostsByPage, resetPosts } from '../features/posts/postsSlice'
import { HomeNavbar } from '../components/Navbars/HomeNavbar'
import PostComponent from '../components/AllPostsComponents/PostComponent'
import TrendingArticles from '../components/AllPostsComponents/TrendingArticles'
import TopDiscussions from '../components/AllPostsComponents/TopDiscussions'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Skeleton } from '../components/ui/skeleton'

const AllPosts: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, undefined, any> = useDispatch()
  const { posts, status, page, hasMore } = useSelector((state: RootState) => state.posts)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    const loadInitialPosts = async () => {
      setLoadingMore(true)
      try {
        await dispatch(resetPosts())
        await dispatch(fetchPostsByPage(1))
      } catch (error) {
        console.error('Error loading initial posts:', error)
      } finally {
        setLoadingMore(false)
      }
    }

    loadInitialPosts()
  }, [dispatch])

  const loadMorePosts = useCallback(async () => {
    if (status !== 'loading' && hasMore && !loadingMore) {
      setLoadingMore(true)
      try {
        const nextPage = page + 1
        await dispatch(fetchPostsByPage(nextPage))
      } catch (error) {
        console.error('Error loading more posts:', error)
      } finally {
        setLoadingMore(false)
      }
    }
  }, [dispatch, status, hasMore, page, loadingMore])

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div 
            className="lg:w-2/3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Latest Posts</h1>
            {posts.map((post, index) => (
              <motion.div
                key={post.postId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="mb-6 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <PostComponent post={post} />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            {loadingMore && (
              <div className="space-y-4">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
              </div>
            )}
            {!loadingMore && hasMore && (
              <div className="text-center mt-8">
                <Button
                  onClick={loadMorePosts}
                  className="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
                >
                  Load More
                </Button>
              </div>
            )}
            {!hasMore && (
              <p className="text-center mt-8 text-gray-600">No more posts to load</p>
            )}
          </motion.div>
          <motion.div 
            className="lg:w-1/3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="mb-6">
              <CardContent>
                <h2 className="text-xl font-semibold mb-4 text-blue-600">Trending Articles</h2>
                <TrendingArticles />
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h2 className="text-xl font-semibold mb-4 text-blue-600">Top Discussions</h2>
                <TopDiscussions />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default AllPosts
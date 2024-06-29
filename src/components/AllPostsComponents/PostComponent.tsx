// src/components/AllPostsComponents/PostComponent.tsx

import React from 'react';
import { Post } from '../../features/posts/postsSlice';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface PostProps {
  post: Post;
}

const PostComponent: React.FC<PostProps> = ({ post }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -900 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -900 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg p-4 mb-6 w-full lg:w-auto transform transition duration-300 hover:scale-105 hover:shadow-lg border border-gray-200"
    >
      <div className="flex-grow">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-2">
          <div className="mb-2 lg:mb-0">
            <a className="text-sm font-semibold text-blue-500 hover:underline">
              <span>{post.author?.username || 'Unknown Author'}</span>
            </a>
          </div>
          <div className="text-sm text-gray-500">
            {new Date(post.publishAt).toLocaleDateString()}
          </div>
        </div>
        <h2 className="text-lg lg:text-xl font-bold mb-2">{post.title}</h2>
        <div
          className="text-gray-700 mb-4"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        />
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="mb-4 rounded-lg w-full lg:w-auto"
          />
        )}
      </div>
    </motion.div>
  );
};

export default PostComponent;

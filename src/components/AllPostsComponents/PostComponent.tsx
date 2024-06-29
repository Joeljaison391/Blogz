import React from 'react';
import { Post } from '../../features/posts/postsSlice';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

interface PostProps {
  post: Post;
}

const truncateContent = (content: string, limit: number) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = DOMPurify.sanitize(content);
  return tempDiv.textContent?.substring(0, limit) + '...';
};

const PostComponent: React.FC<PostProps> = ({ post }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -100 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col bg-white shadow-md rounded-lg p-4 mb-6 w-full lg:w-auto transform transition duration-300 hover:scale-105 hover:shadow-lg border border-gray-200"
    >
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          loading="lazy"
          className="mb-4 rounded-lg w-full lg:w-auto"
        />
      )}
      <div className="flex-grow">
        <h2 className="text-lg lg:text-xl font-bold mb-2">{post.title}</h2>
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
        <div className="text-gray-700 mb-4">
          {truncateContent(post.content, 150)}
        </div>
        <Link to={`/post/${post.postId}`} className="text-blue-500 hover:underline font-semibold">
          Read More
        </Link>
      </div>
    </motion.div>
  );
};

export default PostComponent;

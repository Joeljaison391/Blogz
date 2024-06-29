// src/components/AllPostsComponents/PostComponent.tsx

import React from 'react';
import { Post } from '../../features/posts/postsSlice';
import DOMPurify from 'dompurify';

interface PostProps {
  post: Post;
}

const PostComponent: React.FC<PostProps> = ({ post }) => (
  <div className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg p-4 mb-6 w-full lg:w-auto">
    <div className="flex-grow">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-2">
        <div className="mb-2 lg:mb-0">
          <a className="text-sm font-semibold text-blue-500 hover:underline"><span></span></a>
        </div>
        <div className="text-sm text-gray-500">{new Date(post.publishAt).toLocaleDateString()}</div>
      </div>
      <h2 className="text-lg lg:text-xl font-bold mb-2">{post.title}</h2>
      <div
        className="text-gray-700 mb-4"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
      />
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="mb-4 rounded-lg w-full lg:w-auto" />}
    </div>
  </div>
);

export default PostComponent;

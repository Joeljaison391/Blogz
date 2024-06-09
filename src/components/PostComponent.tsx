import React from 'react';
import { Post } from '../pages/DummyData';

interface PostProps {
  post: Post;
}

const PostComponent: React.FC<PostProps> = ({ post }) => (
  <div key={post.postId} className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg p-4 mb-6 w-full lg:w-auto">
    <div className="flex-shrink-0 mb-4 lg:mb-0 lg:mr-4">
      <img src={post.author.image} alt={post.author.name} className="w-12 h-12 lg:w-16 lg:h-16 rounded-full" />
    </div>
    <div className="flex-grow">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-2">
        <div className="mb-2 lg:mb-0">
          <a href={post.sourceLink} className="text-sm font-semibold text-blue-500 hover:underline">{post.source}</a>
          <span className="text-sm text-gray-500"> for {post.author.name}</span>
        </div>
        <div className="text-sm text-gray-500">{new Date(post.publishAt).toLocaleDateString()}</div>
      </div>
      <h2 className="text-lg lg:text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.content}</p>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="mb-4 rounded-lg w-full lg:w-auto" />}
      <div className="flex items-center text-gray-600 text-sm mb-2 space-x-4">
        <span>Discuss</span>
        <span>{post.likes} likes</span>
        <span>{post.comments} comments</span>
      </div>
      <div className="flex flex-wrap items-center">
        {post.tags.map((tag: string) => (
          <span key={tag} className="bg-gray-200 text-gray-600 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded">{tag}</span>
        ))}
      </div>
    </div>
  </div>
);

export default PostComponent;

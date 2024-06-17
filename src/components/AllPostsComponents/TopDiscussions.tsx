import React from 'react';
import { posts } from '../../pages/DummyData';

const TopDiscussions: React.FC = () => {
  // Sort posts by the number of likes in descending order
  const sortedPosts = posts.slice().sort((a, b) => b.comments - a.comments).slice(0, 5);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h2 className="text-xl font-bold mb-4">Top Discussions</h2>
      {sortedPosts.map(post => (
        <div key={post.postId} className="mb-4">
          <a href="#" className="text-sm font-semibold text-blue-500 hover:underline">{post.title}</a>
          <div className="text-sm text-gray-600">{post.author.name}</div>
          <div className="text-sm text-gray-600">{post.comments} comments</div>
        </div>
      ))}
    </div>
  );
};

export default TopDiscussions;

// src/components/Dashboard.tsx

import React, { useEffect, useState } from 'react';

const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState([] as any[]);

  const [selectedSection, setSelectedSection] = useState("Posts");


  useEffect(() => {
    // Fetch data here
    setPosts([
      {
        title: "Color Maze",
        description: "an accidental project",
        publishedDate: "2024-03-30",
        editedDate: "2024-03-30",
        reactions: 1,
        comments: 0,
        views: 59,
      },
      {
        title: "StarBoard v1.0.0",
        description: "",
        publishedDate: "2024-03-03",
        editedDate: null,
        reactions: 0,
        comments: 0,
        views: 55,
      },
    ]);


  }
  , []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <nav className="mb-4">
        <ul className="flex space-x-4">
          <li><button onClick={() => setSelectedSection("Posts")} className={selectedSection === "Posts" ? "font-bold" : ""}>Posts (17)</button></li>
          <li><button onClick={() => setSelectedSection("Series")} className={selectedSection === "Series" ? "font-bold" : ""}>Series (1)</button></li>
          <li><button onClick={() => setSelectedSection("Followers")} className={selectedSection === "Followers" ? "font-bold" : ""}>Followers (1069)</button></li>
          <li><button onClick={() => setSelectedSection("FollowingTags")} className={selectedSection === "FollowingTags" ? "font-bold" : ""}>Following tags (12)</button></li>
          <li><button onClick={() => setSelectedSection("FollowingUsers")} className={selectedSection === "FollowingUsers" ? "font-bold" : ""}>Following users (14)</button></li>
          <li><button onClick={() => setSelectedSection("FollowingOrganizations")} className={selectedSection === "FollowingOrganizations" ? "font-bold" : ""}>Following organizations (1)</button></li>
          <li><button onClick={() => setSelectedSection("FollowingPodcasts")} className={selectedSection === "FollowingPodcasts" ? "font-bold" : ""}>Following podcasts (1)</button></li>
          <li><button onClick={() => setSelectedSection("Analytics")} className={selectedSection === "Analytics" ? "font-bold" : ""}>Analytics</button></li>
          <li><button onClick={() => setSelectedSection("HiddenTags")} className={selectedSection === "HiddenTags" ? "font-bold" : ""}>Hidden tags (0)</button></li>
        </ul>
      </nav>

      <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Upload a video</button>

      {selectedSection === "Posts" && (
        <div>
          <div className="mb-4">
            <label htmlFor="sort" className="mr-2">Sort by:</label>
            <select id="sort" className="p-2 border border-gray-300 rounded">
              <option>Recently Created</option>
              <option>Recently Published</option>
              <option>Most Views</option>
              <option>Most Reactions</option>
              <option>Most Comments</option>
            </select>
          </div>

          {posts.map((post, index) => (
            <div key={index} className="mb-4 p-4 bg-white rounded shadow">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p>{post.description}</p>
              <p className="text-gray-500">Published: {post.publishedDate}</p>
              {post.editedDate && <p className="text-gray-500">Edited: {post.editedDate}</p>}
              <div className="flex space-x-4 mt-2">
                <span>{post.reactions} reactions</span>
                <span>{post.comments} comments</span>
                <span>{post.views} views</span>
              </div>
              <div className="mt-2 flex space-x-2">
                <button className="px-2 py-1 bg-gray-200 rounded">Manage</button>
                <button className="px-2 py-1 bg-gray-200 rounded">Edit</button>
                <button className="px-2 py-1 bg-gray-200 rounded">...</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add similar conditional rendering for other sections here */}
    </div>
  );
};

export default Dashboard;

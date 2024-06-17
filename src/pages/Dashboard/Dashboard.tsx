// src/components/Dashboard.tsx

import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { HomeNavbar } from '../../components/Navbars/HomeNavbar';


const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState([] as any[]);
  const [selectedSection, setSelectedSection] = useState("Posts");
  const [sortOption, setSortOption] = useState("Recently Created");

  useEffect(() => {
    // Fetch data here
    setPosts([
      {
        title: "Understanding evolution, through coding!",
        description: "",
        publishedDate: "2023-09-01",
        editedDate: null,
        reactions: 1,
        comments: 0,
        views: 35,
      },
      {
        title: "A library of infinite possibilities: The Library of Babel",
        description: "",
        publishedDate: "2023-07-22",
        editedDate: null,
        reactions: 1,
        comments: 0,
        views: 25,
      },
      {
        title: "Day 6: Introduction to Semantic HTML",
        description: "",
        publishedDate: "2024-06-16",
        editedDate: null,
        reactions: 0,
        comments: 0,
        views: 0,
      },
    ]);
  }, []);

  const sortPosts = (posts: any[], option: string) => {
    switch (option) {
      case "Recently Published":
        return [...posts].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
      case "Most Views":
        return [...posts].sort((a, b) => b.views - a.views);
      case "Most Reactions":
        return [...posts].sort((a, b) => b.reactions - a.reactions);
      case "Most Comments":
        return [...posts].sort((a, b) => b.comments - a.comments);
      default:
        return posts;
    }
  };

  const sortedPosts = sortPosts(posts, sortOption);

  return (
    <div className="min-h-screen bg-gray-100">
      <HomeNavbar />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        <div className="flex flex-col lg:flex-row">
          {/* Left Navigation */}
          <nav className="w-full lg:w-1/4 p-4">
            <ul className="space-y-4">
              <li><button onClick={() => setSelectedSection("Posts")} className={`w-full text-left ${selectedSection === "Posts" ? "font-bold" : ""}`}>Posts (2)</button></li>
              <li><button onClick={() => setSelectedSection("Series")} className={`w-full text-left ${selectedSection === "Series" ? "font-bold" : ""}`}>Series (0)</button></li>
              <li><button onClick={() => setSelectedSection("Followers")} className={`w-full text-left ${selectedSection === "Followers" ? "font-bold" : ""}`}>Followers (3)</button></li>
              <li><button onClick={() => setSelectedSection("FollowingTags")} className={`w-full text-left ${selectedSection === "FollowingTags" ? "font-bold" : ""}`}>Following tags (65)</button></li>
              <li><button onClick={() => setSelectedSection("FollowingUsers")} className={`w-full text-left ${selectedSection === "FollowingUsers" ? "font-bold" : ""}`}>Following users (0)</button></li>
              <li><button onClick={() => setSelectedSection("FollowingOrganizations")} className={`w-full text-left ${selectedSection === "FollowingOrganizations" ? "font-bold" : ""}`}>Following organizations (0)</button></li>
              <li><button onClick={() => setSelectedSection("FollowingPodcasts")} className={`w-full text-left ${selectedSection === "FollowingPodcasts" ? "font-bold" : ""}`}>Following podcasts (0)</button></li>
              <li><button onClick={() => setSelectedSection("Analytics")} className={`w-full text-left ${selectedSection === "Analytics" ? "font-bold" : ""}`}>Analytics</button></li>
              <li><button onClick={() => setSelectedSection("HiddenTags")} className={`w-full text-left ${selectedSection === "HiddenTags" ? "font-bold" : ""}`}>Hidden tags (0)</button></li>
            </ul>
            <button className="mt-8 w-full px-4 py-2 bg-blue-500 text-white rounded">Upload a video</button>
          </nav>

          {/* Main Content */}
          <div className="w-full lg:w-3/4 p-4">
            {/* Stats */}
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
              <div className="bg-white p-4 rounded shadow-md w-full md:w-1/3 text-center">
                <p className="text-2xl font-bold">2</p>
                <p className="text-gray-500">Total post reactions</p>
              </div>
              <div className="bg-white p-4 rounded shadow-md w-full md:w-1/3 text-center">
                <p className="text-2xl font-bold">0</p>
                <p className="text-gray-500">Total post comments</p>
              </div>
              <div className="bg-white p-4 rounded shadow-md w-full md:w-1/3 text-center">
                <p className="text-2xl font-bold">&lt; 500</p>
                <p className="text-gray-500">Total post views</p>
              </div>
            </div>

            {/* Posts Section */}
            {selectedSection === "Posts" && (
              <div>
                <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
                  <h2 className="text-xl font-bold">Posts</h2>
                  <div className="mt-2 md:mt-0">
                    <label htmlFor="sort" className="mr-2">Sort by:</label>
                    <select id="sort" className="p-2 border border-gray-300 rounded" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                      <option>Recently Created</option>
                      <option>Recently Published</option>
                      <option>Most Views</option>
                      <option>Most Reactions</option>
                      <option>Most Comments</option>
                    </select>
                  </div>
                </div>

                {sortedPosts.map((post, index) => (
                  <div key={index} className="mb-4 p-4 bg-white rounded shadow">
                    <h2 className="text-xl font-bold text-blue-600">{post.title}</h2>
                    <p className="text-gray-500">Published: {post.publishedDate} Language: English</p>
                    <div className="flex space-x-4 mt-2">
                      <span>{post.reactions} <i className="fas fa-heart"></i></span>
                      <span>{post.comments} <i className="fas fa-comment"></i></span>
                      <span>{post.views} <i className="fas fa-eye"></i></span>
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
        </div>
      </div>
    </div>

  );
};

export default Dashboard;

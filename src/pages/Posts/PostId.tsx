/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HomeNavbar } from "../../components/Navbars/HomeNavbar";
import { fetchPostById } from "../../features/posts/postsSlice";
import { RootState } from "../../Context/store";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from "@reduxjs/toolkit";
import transformHtmlToReact from "../../utils/transformHtmlToReact"; // Adjust the path accordingly

const PostId: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const post = useSelector((state: RootState) => state.posts.post);
  const status = useSelector((state: RootState) => state.posts.status);
  const error = useSelector((state: RootState) => state.posts.error);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById(Number(postId)));
    }
  }, [dispatch, postId]);

  return (
    <div className="font-sans min-h-screen bg-gray-100">
      <div className="w-full overflow-hidden">
        <HomeNavbar />
      </div>
      <div className="container mx-auto p-4">
        {status === "loading" && <p className="text-center text-gray-600">Loading...</p>}
        {status === "failed" && <p className="text-center text-red-600">Error: {error}</p>}
        {status === "succeeded" && post && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-6xl font-bold mb-8 text-center text-blue-800">{post.title}</h1>
            <div className="h-[3px] w-full bg-slate-950 rounded-lg mb-8"></div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">{post.author.username.charAt(0)}</div>
                <div>
                  <div className="text-lg font-bold">{post.author.username}</div>
                  <div className="text-sm text-gray-600">{new Date(post.publishAt).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
            <div className="post-content prose lg:prose-xl">
              {transformHtmlToReact(post.content)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostId;

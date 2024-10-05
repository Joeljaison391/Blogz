import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HomeNavbar } from "../../components/Navbars/HomeNavbar";
import { fetchPostById } from "../../features/posts/postsSlice";
import { RootState } from "../../Context/store";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from "@reduxjs/toolkit";
import transformHtmlToReact from "../../utils/transformHtmlToReact";

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
      <HomeNavbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {status === "loading" && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}
        {status === "failed" && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        {status === "succeeded" && post && (
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <header className="p-6 sm:p-8 bg-green-700 text-white">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
              <div className="flex items-center">
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-green-700 font-bold text-xl mr-4">
                  {post.author.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold">{post.author.username}</div>
                  <time className="text-sm opacity-75" dateTime={post.publishAt}>
                    {new Date(post.publishAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </time>
                </div>
              </div>
            </header>
            <div className="p-6 sm:p-8">
              <div className="prose prose-lg max-w-none">
                {transformHtmlToReact(post.content)}
              </div>
            </div>
          </article>
        )}
      </main>
    </div>
  );
};

export default PostId;
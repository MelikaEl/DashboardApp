"use client";

import PostsTable from "@/components/posts/PostsTable";
import BackButton from "@/components/BackButton";
import PostsPagination from "@/components/posts/PostsPagination";
import CreatePostButton from "@/components/CreatePostButton";
import { useState } from "react";

const PostsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  return (
    <>
      <BackButton text="Go Back" link="/" />

      <div className="flex justify-between items-center ">
        <h3 className="text-2xl mb-4 dark:text-pink-300">Posts</h3>
        <CreatePostButton link="/posts/create" />
      </div>
      <PostsTable currentPage={currentPage} postsPerPage={postsPerPage} />
      <PostsPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        postsPerPage={postsPerPage}
      />
    </>
  );
};

export default PostsPage;

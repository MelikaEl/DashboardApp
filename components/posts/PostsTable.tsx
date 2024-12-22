"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import Link from "next/link";
// import posts from '@/data/posts';
import { Post } from "@/types/posts";
import { useEffect, useState } from "react";
// import { getPosts } from "@/app/firebase/firestoreoperations";
import {subscribeToPosts} from "@/app/firebase/firestoreoperations"

interface PostsTableProps {
  // limit?: number;
  title?: string;
  post?: string;
}

// const PostsTable = ({ limit, title }: PostsTableProps) => {
// Sort posts in dec order based on date
// const sortedPosts: Post[] = [...posts].sort(
//   (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
// );

// Filter posts to limit
// const filteredPosts = limit ? sortedPosts.slice(0, limit) : sortedPosts;
const PostsTable = ({ post, title }: PostsTableProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToPosts((fetchedPosts) => {
      setPosts(fetchedPosts);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;
  // Filter posts to limit if specified
  // const filteredPosts = limit ? posts.slice(0, limit) : posts;
  // if (loading) return <div>Loading posts...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-10">
      {/* <h3 className="text-2xl mb-4 font-semibold">{title ? title : "Posts"}</h3> */}
      <Table>
        <TableCaption>A list of recent posts</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            {/* <TableHead className="hidden md:table-cell">Author</TableHead> */}
            {/* <TableHead className="hidden md:table-cell text-right">
              Date
            </TableHead> */}
            {/* <TableHead>View</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.title}</TableCell>
              {/* <TableCell className="hidden md:table-cell">
                {post.author}
              </TableCell> */}
              {/* <TableCell className="text-right hidden md:table-cell">
                {post.date}
              </TableCell> */}
              <TableCell>
                <Link href={`/posts/edit/${post.id}`}>
                  <button className="bg-pink-300 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded text-xs">
                    Edit
                  </button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostsTable;

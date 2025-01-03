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
import {
  subscribeToPosts,
  deletePost,
} from "@/app/firebase/firestoreoperations";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PostsTableProps {
  // limit?: number;
  title?: string;
  post?: string;
  author?: string;
  currentPage: number;
  postsPerPage: number;
}

// const PostsTable = ({ limit, title }: PostsTableProps) => {
// Sort posts in dec order based on date
// const sortedPosts: Post[] = [...posts].sort(
//   (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
// );

// Filter posts to limit
// const filteredPosts = limit ? sortedPosts.slice(0, limit) : sortedPosts;
const PostsTable = ({ currentPage, postsPerPage }: PostsTableProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = subscribeToPosts((fetchedPosts) => {
      setPosts(fetchedPosts);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Calculate pagination indexes
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;
  // Filter posts to limit if specified
  // const filteredPosts = limit ? posts.slice(0, limit) : posts;
  // if (loading) return <div>Loading posts...</div>;
  // if (error) return <div>Error: {error}</div>;

  const handleDelete = async (postId: string) => {
    try {
      const success = await deletePost(postId);
      if (success) {
        toast({
          title: "Success",
          description: "Post deleted successfully",
        });
      } else {
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete post",
      });
    }
  };

  return (
    <div className="mt-10">
      {/* <h3 className="text-2xl mb-4 font-semibold">{title ? title : "Posts"}</h3> */}
      <Table>
        <TableCaption>A list of recent posts</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Author</TableHead>
            {/* <TableHead className="hidden md:table-cell text-right">
              Date
            </TableHead> */}
            <TableHead>View</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPosts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.title}</TableCell>
              <TableCell className="hidden md:table-cell">
                {post.author}
              </TableCell>
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
              <TableCell>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-pink-300 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded text-xs"
                >
                  <Trash2 color="#fffafa" size={18} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostsTable;

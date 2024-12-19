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
import { Button } from "../ui/button";

import posts from "@/data/posts";
import { Post } from "@/types/posts";

import { useEffect, useState } from "react";
import { getPosts, deletePost } from "@/app/firebase/posts";
import { useToast } from "@/components/ui/use-toast";

interface PostsTableProps {
  limit?: number;
  title?: string;
}

const PostsTable = ({ limit, title }: PostsTableProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const fetchedPosts = await getPosts();
      const filteredPosts = limit ? fetchedPosts.slice(0, limit) : fetchedPosts;
      setPosts(filteredPosts);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load posts",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
      loadPosts();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete post",
      });
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">{title ? title : "Posts"}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Author</TableHead>
            <TableHead className="hidden md:table-cell text-right">
              Date
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.title}</TableCell>
              <TableCell className="hidden md:table-cell">
                {post.author}
              </TableCell>
              <TableCell className="hidden md:table-cell text-right">
                {post.date}
              </TableCell>
              <TableCell className="space-x-2">
                <Link href={`/posts/edit/${post.id}`}>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostsTable;

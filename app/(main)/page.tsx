'use client'
import DashboardStats from "@/components/dashboard/DashboardStats";
import PostsTable from "@/components/posts/PostsTable";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import { Folder, MessageCircle, Newspaper, User } from "lucide-react";

interface Post {
  id: string;
  post:string;
  title: string;
  body: string;
  author: string;
}
import { useState, useEffect } from "react";
import { subscribeToPosts } from "@/app/firebase/firestoreoperations";


export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToPosts((fetchedPosts) => {
      setPosts(fetchedPosts);
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
      <DashboardStats posts={posts} />
      <AnalyticsChart />
      <PostsTable title="Latest Posts" currentPage={1} postsPerPage={5} />
    </>
  );
}

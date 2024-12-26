import DashboardStats from "@/components/dashboard/DashboardStats";
import PostsTable from "@/components/posts/PostsTable";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import { Folder, MessageCircle, Newspaper, User } from "lucide-react";

export default function Home() {
  return (
    <>
      <DashboardStats />
      <AnalyticsChart />
      <PostsTable title="Latest Posts" currentPage={1} postsPerPage={5} />
    </>
  );
}

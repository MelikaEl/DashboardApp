"use client";

import { useEffect, useState } from "react";
import { subscribeToPosts, subscribeToUsers } from "@/app/firebase/firestoreoperations";
import DashboardCard from "./DashboardCard";
import {  Newspaper, User ,UserRoundPlus} from "lucide-react";

interface DashboardStatsProps {
  posts?: { author: string }[];
}

const DashboardStats = ({ posts }: DashboardStatsProps) => {
  const [postsCount, setPostsCount] = useState(0);
  const [authorsCount, setAuthorsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);//numbers of the users that are stored in the firestore database as user's collection

  useEffect(() => {
    const unsubscribePosts = subscribeToPosts((posts) => {
      setPostsCount(posts.length);
    });

    const unsubscribeUsers = subscribeToUsers((count) => {
      setUsersCount(count);
    });

    return () => {
      unsubscribePosts();
      unsubscribeUsers();
    };
  }, []);

  useEffect(() => {
    // Count unique authors whenever posts change
    const uniqueAuthors = new Set((posts ?? []).map((post) => post.author));
    setAuthorsCount(uniqueAuthors.size);
  }, [posts]);
  /*
The authorsCount state is updated whenever the posts prop changes.
The useEffect hook with the dependency array [posts] ensures that the unique authors are counted correctly whenever the posts prop is updated.
*/
  return (
    <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
      <DashboardCard
        title="Posts"
        count={postsCount}
        icon={
          <Newspaper className="text-pink-500 dark:text-pink-300" size={72} />
        }
      />
      <DashboardCard
        title="Authors"
        count={authorsCount}
        icon={<UserRoundPlus className="text-pink-500 dark:text-pink-300" size={72} />}
      />
      <DashboardCard
        title="Users"
        count={usersCount}
        icon={<User className="text-pink-500 dark:text-pink-300" size={72} />}
      />
     
       
    </div>
  );
};

export default DashboardStats;

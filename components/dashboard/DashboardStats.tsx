'use client';

import { useEffect, useState } from 'react';
import { subscribeToPosts } from '@/app/firebase/firestoreoperations';
import DashboardCard from './DashboardCard';
import { Folder, MessageCircle, Newspaper, User } from "lucide-react";

const DashboardStats = () => {
  const [postsCount, setPostsCount] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeToPosts((posts) => {
      setPostsCount(posts.length);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
      <DashboardCard
        title="Posts"
        count={postsCount}
        icon={<Newspaper className="text-pink-500 dark:text-pink-300" size={72} />}
      />
      <DashboardCard
        title="Categories"
        count={12}
        icon={<Folder className="text-pink-500 dark:text-pink-300" size={72} />}
      />
      <DashboardCard
        title="Users"
        count={750}
        icon={<User className="text-pink-500 dark:text-pink-300" size={72} />}
      />
      <DashboardCard
        title="Comments"
        count={1200}
        icon={<MessageCircle className="text-pink-500 dark:text-pink-300" size={72} />}
      />
    </div>
  );
};

export default DashboardStats;
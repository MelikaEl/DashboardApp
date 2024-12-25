'use client';

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from 'react';
import { getUserProfile } from '@/app/firebase/firestoreoperations';
import { auth } from '@/app/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface UserProfile {
    name: string;
    email: string;
    avatarUrl?: string;
  }


  export default function ProfilePage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const userProfile = await getUserProfile(currentUser.uid);
          if (userProfile) {
            setUser({
              name: userProfile.name,
              email: currentUser.email || '',
              avatarUrl: userProfile.avatarUrl
            });
          }
        }
        setLoading(false);
      });
  
      return () => unsubscribe();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!user) {
      return <div>Please log in to view your profile.</div>;
    }
  
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">User Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={user.avatarUrl || '/public/vercel.svg'} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

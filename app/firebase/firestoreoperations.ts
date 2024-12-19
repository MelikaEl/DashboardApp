import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/app/firebase/firebase';
import { Post } from '@/types/posts';

export async function getPosts(): Promise<Post[]> {
  const posts: Post[] = [];
  try {
   const postsRef = collection(db, 'posts');
   const q = query(postsRef, orderBy('date', 'desc'));
   const querySnapshot = await getDocs(q);
   
   querySnapshot.forEach((doc) => {
     posts.push({ id: doc.id, ...doc.data() } as Post);
   });
   return posts;
 } catch (error) {
   console.error('Error getting posts:', error);
   return [];
 }
}

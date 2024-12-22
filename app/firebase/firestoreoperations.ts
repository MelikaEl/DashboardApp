import { collection, onSnapshot, doc , getDoc, updateDoc} from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { Post } from "@/types/posts";

// Real-time subscription to posts
export function subscribeToPosts(callback: (posts: Post[]) => void) {
  const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
    const posts: Post[] = [];
    snapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() } as Post);
    });
    callback(posts);
  });

  return unsubscribe;
}

// Get a single post by ID
export async function getPost(postId: string): Promise<Post | null> {
  try {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);
   
   if (docSnap.exists()) {
     return { id: docSnap.id, ...docSnap.data() } as Post;
   }
   return null;
 } catch (error) {
   console.error("Error getting post:", error);
   return null;
 }
}

// Update a post
export async function updatePost(postId: string, data: Partial<Post>): Promise<boolean> {
 try {
   const postRef = doc(db, "posts", postId);
   await updateDoc(postRef, data);
   return true;
 } catch (error) {
   console.error("Error updating post:", error);
   return false;
 }
}

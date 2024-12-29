import { collection, onSnapshot, doc , getDoc, updateDoc,deleteDoc,addDoc, setDoc} from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { Post } from "@/types/posts";
import { auth } from "@/app/firebase/firebase";

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


// Delete a post
export async function deletePost(postId: string): Promise<boolean> {
  try{ const postRef = doc(db, "posts", postId);
   await deleteDoc(postRef);
   return true;
 } catch (error) {
   console.error("Error deleting post:", error);
   return false;
 }
}


// Create a new post
export async function createPost(data: Omit<Post, 'id'>): Promise<boolean> {
  try {
    const postsRef = collection(db, "posts");
   await addDoc(postsRef, data);
    return true;
  } catch (error) {
    console.error("Error creating post:", error);
    return false;
  }
}

// Get user profile data
export async function getUserProfile(userId: string) {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
}


// Create a new user in Firestore
export async function createUserProfile(userId: string, userData: { name: string; email: string; avatarUrl?: string }) {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, userData);
    return true;
  } catch (error) {
    console.error("Error creating user profile:", error);
    return false;
  }
}


// Add this new function to get users count
export function subscribeToUsers(callback: (count: number) => void) {
  const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
    callback(snapshot.size);
  });

  return unsubscribe;
}


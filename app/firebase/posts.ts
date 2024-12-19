import { db } from '../../scripts/firebase-admin';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { Post } from '@/types/posts';

// Collection reference
const postsCollection = collection(db, 'posts');

// Add a post
export const addPost = async (post: Omit<Post, 'id'>) => {
  const docRef = await addDoc(postsCollection, post);
  return { id: docRef.id, ...post };
};

// Get all posts
export const getPosts = async () => {
  const q = query(postsCollection, orderBy('date', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Post[];
};

// Update a post
export const updatePost = async (id: string, post: Partial<Post>) => {
  const docRef = doc(db, 'posts', id);
  await updateDoc(docRef, post);
};

// Delete a post
export const deletePost = async (id: string) => {
  const docRef = doc(db, 'posts', id);
  await deleteDoc(docRef);
};
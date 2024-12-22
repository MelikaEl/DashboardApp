import { collection, onSnapshot, doc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { Post } from "@/types/posts";

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

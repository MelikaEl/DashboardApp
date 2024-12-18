const { addDoc, collection } = require('firebase/firestore');
const { db } = require('../app/firebase/firebase');
const posts = require('../data/posts').default;

const seedPosts = async () => {
  try {
    const postsCollection = collection(db, 'posts');
    
    for (const post of posts) {
      await addDoc(postsCollection, {
        title: post.title,
        body: post.body,
        author: post.author,
        date: post.date,
        comments: post.comments || []
      });
      console.log(`Added post: ${post.title}`);
    }
    
    console.log('All posts seeded successfully!');
  } catch (error) {
    console.error('Error seeding posts:', error);
  } finally {
    process.exit(0);
  }
};

seedPosts();
















// import { addDoc, collection } from 'firebase/firestore';
// import { db } from '../app/firebase/firebase';
// import posts from '../data/posts';

// const seedPosts = async () => {
//   try {
//     const postsCollection = collection(db, 'posts');
    
//     for (const post of posts) {
//       await addDoc(postsCollection, {
//         title: post.title,
//         body: post.body,
//         author: post.author,
//         date: post.date,
//         comments: post.comments || []
//       });
//     }
    
//     console.log('Posts seeded successfully!');
//   } catch (error) {
//     console.error('Error seeding posts:', error);
//   }
// };

// // Run the seed function
// seedPosts();
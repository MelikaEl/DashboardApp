const { addDoc, collection } = require('firebase/firestore');
const { db } = require('./firebase-admin');

const posts = [
  {
    title: "Test Post 1",
    body: "This is test post 1",
    author: "John Doe",
    date: "2024-05-20",
    comments: []
  },
  {
    title: "Test Post 2",
    body: "This is test post 2",
    author: "Jane Doe",
    date: "2024-05-21",
    comments: []
  }
  // Add more test posts as needed
];

const seedPosts = async () => {
  try {
    const postsCollection = collection(db, 'posts');
    
    for (const post of posts) {
      await addDoc(postsCollection, post);
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
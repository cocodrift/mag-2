// pages/api/posts/publish.js

import { getSession } from 'next-auth/react';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { postId } = req.body;

  // Check if user is authenticated
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Check if user is admin
  if (session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const client = await clientPromise;
  const db = client.db();

  try {
    const updatedPost = await db.collection('posts').findOneAndUpdate(
      { _id: postId },
      { $set: { published: true } }, // Set published field to true
      { returnOriginal: false }
    );

    if (!updatedPost.value) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(updatedPost.value);
  } catch (error) {
    console.error('Error publishing post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

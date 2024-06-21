import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('next-blog');

  switch (req.method) {
    case 'POST':
      const { title, content, author } = req.body;
      const newPost = { title, content, author, createdAt: new Date() };
      await db.collection('posts').insertOne(newPost);
      res.json(newPost);
      break;

    case 'GET':
      const posts = await db.collection('posts').find().toArray();
      res.json(posts);
      break;
  }
}

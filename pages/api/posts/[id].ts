import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('next-blog');

  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      const post = await db.collection('posts').findOne({ _id: new ObjectId(id as string) });
      res.json(post);
      break;

    case 'PUT':
      const { title, content } = req.body;
      await db.collection('posts').updateOne(
        { _id: new ObjectId(id as string) },
        { $set: { title, content } }
      );
      res.status(200).json({ message: 'Post updated' });
      break;

    case 'DELETE':
      await db.collection('posts').deleteOne({ _id: new ObjectId(id as string) });
      res.status(200).json({ message: 'Post deleted' });
      break;
  }
}

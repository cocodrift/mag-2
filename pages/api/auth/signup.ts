import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('next-blog');

  const { email, password } = req.body;

  const user = await db.collection('users').findOne({ email });

  if (user) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { email, password: hashedPassword };

  await db.collection('users').insertOne(newUser);

  res.status(201).json({ message: 'User created' });
}

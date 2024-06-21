import { useQuery } from 'react-query';
import axios from 'axios';
import Link from 'next/link';
import Layout from '../components/Layout';

const fetchPublishedPosts = async () => {
  const { data } = await axios.get('/api/posts/'); // Endpoint for fetching published posts
  return data;
};

export default function Home() {
  const { data: posts, error, isLoading } = useQuery('posts', fetchPublishedPosts);

  if (isLoading) return <div className="text-center mt-8 text-gray-700">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">An error occurred</div>;

  return (
    <Layout>
      <div className="container mx-auto">
        <Link href="/posts/new" className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded mb-4">Create New Post
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <div key={post._id} className="p-4 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                <Link href={`/posts/${post._id}`} className="hover:underline">{post.title}</Link>
              </h2>
              <p className="text-gray-700">{post.content.slice(0, 100)}...</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

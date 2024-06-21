import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

function Admin() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) {
      // If not authenticated, redirect to sign-in page
      signIn();
    } else if (!session.user) {
      // If authenticated but not an admin, redirect to home page
      router.push('/');
    } else {
      // Fetch posts if authenticated and an admin
      fetch('/api/posts')
        .then((res) => res.json())
        .then((data) => setPosts(data));
    }
  }, [session, status, router]);

  const deletePost = async (id: string) => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    setPosts(posts.filter((post) => post._id !== id));
  };

  const archivePost = async (id: string) => {
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isArchived: true }),
    });
    setPosts(posts.map((post) => (post._id === id ? { ...post, isArchived: true } : post)));
  };

  if (status === 'loading') {
    return <div>Loading...</div>; // Show a loading state while the session is being fetched
  }

  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">Admin Panel</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <div key={post._id} className="border p-4 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold">{post.title}</h2>
              <p>{post.content}</p>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => deletePost(post._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => archivePost(post._id)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded"
                >
                  Archive
                </button>
                <button
                  onClick={() => router.push(`/posts/edit/${post._id}`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

Admin.auth = true; // This line enforces authentication

export default Admin;

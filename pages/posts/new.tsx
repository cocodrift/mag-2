import PostForm from '../../components/PostForm';
import Layout from '../../components/Layout';
import { useSession } from 'next-auth/react';

export default function NewPost() {
  const { data: session } = useSession();

  // Check if the user is not logged in, redirect them to the login page
  if (!session) {
    // Redirect to the login page or handle authentication logic here
    return <p>Please log in to create a new post.</p>;
  }

  // Render the page content if the user is logged in
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">Create New Post</h1>
        <PostForm />
      </div>
    </Layout>
  );
}

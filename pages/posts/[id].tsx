import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import axios from 'axios';
import Layout from '../../components/Layout';

const fetchPost = async (id: string) => {
  const { data } = await axios.get(`/api/posts/${id}`);
  return data;
};

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  const { data: post, error, isLoading } = useQuery(['post', id], () => fetchPost(id as string));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred</div>;

  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <p>{post.content}</p>
      </div>
    </Layout>
  );
}

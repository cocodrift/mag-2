import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';

interface PostFormData {
  title: string;
  content: string;
  published: false ;
  
}

export default function PostForm({ defaultValues }: { defaultValues?: PostFormData }) {
  const { register, handleSubmit } = useForm<PostFormData>({ defaultValues });
  const router = useRouter();

  const onSubmit = async (data: PostFormData) => {
    if (defaultValues) {
      await axios.put(`/api/posts/${defaultValues._id}`, data);
    } else {
      await axios.post('/api/posts', data);
    }
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          {...register('content')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        {defaultValues ? 'Update' : 'Create'} Post
      </button>
    </form>
  );
}

import { useState } from 'react';
import { PostsApi } from '../api/posts';

const PostCreate = () => {
  const postApi = new PostsApi();

  const [title, setTitle] = useState("");
  const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      const result = await postApi.create(title);
      if (result) {
        setTitle("");
      }
  }
  return (
    <div className='my-4'>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col m-4 text-xl">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-b"
          />
        </div>
        <button className="rounded bg-slate-200">Submit</button>
      </form>
    </div>
  );
}

export default PostCreate
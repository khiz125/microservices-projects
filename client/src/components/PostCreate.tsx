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
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default PostCreate
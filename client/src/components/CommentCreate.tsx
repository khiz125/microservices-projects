import React, { useState } from 'react'
import { CommentsApi } from '../api/comments';

type CommentCreateProps = {
  postId: string;
}
const CommentCreate: React.FC<CommentCreateProps> = ({ postId }) => {
  const commentApi = new CommentsApi();
  const [content, setContent] = useState("");
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await commentApi.create(postId, content);
    if (result) {
      setContent("")
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default CommentCreate
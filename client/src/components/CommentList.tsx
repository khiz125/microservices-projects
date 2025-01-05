/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { CommentsApi, CommentsByPostId } from '../api/comments';

type CommentListProps = {
  postId: string;
}
const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const commentApi = new CommentsApi();
  const [comments, setComments] = useState<CommentsByPostId>({});
  const fetchComments = async () => {
    const result = await commentApi.findAll(postId);
    if (result.ok) {
      setComments(result)
    }
  }

  useEffect(() => {
    fetchComments();
  }, [])
  return (
    <ul>{Object.values(comments).map((comment, i) => <li key={comment[i].id}>{comment[i].comment}</li>)}</ul>
  )
}

export default CommentList
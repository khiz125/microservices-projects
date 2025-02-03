/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import CommentList from './CommentList';
import CommentCreate from './CommentCreate';
import { PostsApi, Post } from '../api/posts';

const PostList = () => {
  const postApi = new PostsApi();
  const [posts, setPosts] = useState<Post[]>([]);
  const fetchPosts = async () => {
    const result = await postApi.findAll();
    if (result.ok) {
      const posts:Post[] = Object.values(result.data);
      setPosts(posts)
    }
  }

  useEffect(() => {
    fetchPosts();
  },[])
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {Object.values(posts).map((post) => {
        return (
          <div
            className="card"
            style={{ width: "30%", marginBottom: "20px" }}
            key={post.id}
          >
            <div className="card-body">
              <h3>{post.title}</h3>
              <CommentList postId={post.id} />
              <CommentCreate postId={post.id} />
            </div>
          </div>
        )

      })}
    </div>
  )
}

export default PostList
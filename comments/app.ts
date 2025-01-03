import { Hono } from 'hono';
import { logger } from 'hono/logger';

import { randomBytes } from 'crypto';

type Comments = {
  id: string;
  comments: string;
}

type CommentsByPostId = {
  [key: string]: Comments[]
}

const app = new Hono();

const commentsByPostId: CommentsByPostId  = {};

app.use('*', logger());

app.get('/posts/:id/comments', (c): ReturnType<typeof c.json<Result<Comments[]>>> => {
  const postId = c.req.param('id');
  if (!commentsByPostId[postId] || c.error) {
    return c.json({ ok: false, error: "post id is invalid." }, 500);
  }
  const comments = commentsByPostId[postId];
  return c.json({ ok: true, value: comments }, 200);
});

app.post('/posts/:id/comments', async (c): Promise<ReturnType<typeof c.json<Result<Comments[]>>>>  => {
  const postId = c.req.param('id');
  if (!commentsByPostId[postId] || c.error) {
    return c.json({ ok: false, error: "post id is invalid." }, 500);
  }
  const commentData = await c.req.json();
  const commentId = randomBytes(4).toString('hex');
  const comments = commentsByPostId[postId] = commentData.comments || [];
  comments.push({ id: commentId, commentData });
  commentsByPostId[postId] = comments;
  return c.json({ ok: true, value: comments }, 201);
})

export default app;

export type Ok<T> = { ok: true; value: T };
export type Err<E = string> = { ok: false; error: E };

export type Result<T, E = string> = Ok<T> | Err<E>;


import { Hono } from 'hono';
import { logger } from 'hono/logger';

import { randomBytes } from 'crypto';

type Posts = {
  id: string;
  title: string;
}
type PostsData = {
  [key: string]: Posts
}

const app = new Hono()

const posts: PostsData = {};


app.use('*', logger());

app.get('/posts', (c): ReturnType<typeof c.json<Result<PostsData>>> => {
  if (c.error || !!posts.length) {
    return c.json({ ok: false, error: "Internal server error." }, 500);
  }
  return c.json({ ok: true, value: posts }, 200);
});

app.post('/posts', async (c): Promise<ReturnType<typeof c.json<Result<Posts>>>> => {
  if (c.error) {
    return c.json({ ok: false, error: "Internal server error." }, 500);
  }
  const postData: Posts = await c.req.json();
  const id = randomBytes(4).toString('hex');
  posts[id] = { id: id, title: postData.title }
  
  return c.json({ ok: true, value: posts[id] }, 200);
})

export default app;

export type Ok<T> = { ok: true; value: T };
export type Err<E = string> = { ok: false; error: E };

export type Result<T, E = string> = Ok<T> | Err<E>;
export class PostsApi implements IPostApi {
  async findAll(): Promise<PostsData> {
    const url = 'http://localhost:4000/posts';
    try {
      const res = await fetch(url, {method: "GET"});
      if (res.ok) {
        const data: PostsData = await res.json();
        return data;
      }
    } catch (err) {
      console.log(err);
      throw new Error('Internal server error.');
    }
    throw new Error('Internal server error.');
  }
  async create(content: string): Promise<Posts> {
    const url = 'http://localhost:4000/posts';
    try {
      const res = await fetch(url, { method: "POST", body: content });
      if (res.ok) {
        const data: Posts = await res.json();
        return data;
      }
    } catch (err) {
      console.log(err);
      throw new Error('Internal server error.');
    }
    throw new Error('Internal server error.');
  }
}

export interface IPostApi {
  findAll(): Promise<PostsData>;
  create(content: string): Promise<Posts>;
}

export type PostsData = {
  [key: string]: Posts
}

export type Posts = {
  id: string;
  title: string;
}
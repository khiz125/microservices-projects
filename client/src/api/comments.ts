export class CommentsApi implements ICommentApi {
  async findAll(id: string): Promise<CommentsByPostId> {
    const url = `http://localhost:4001/posts/${id}/comments`;
    try {
      const res = await fetch(url, {method: "GET"});
      if (res.ok) {
        const data: CommentsByPostId = await res.json();
        return data;
      }
    } catch (err) {
      console.log(err);
      throw new Error('Internal server error.');
    }
    throw new Error('Internal server error.');
  }
  async create(id: string, content: string): Promise<Comments> {
    const url = `http://localhost:4001/${id}/:id/comments`;
    try {
      const res = await fetch(url, { method: "POST", body: content });
      if (res.ok) {
        const data: Comments = await res.json();
        return data;
      }
    } catch (err) {
      console.log(err);
      throw new Error('Internal server error.');
    }
    throw new Error('Internal server error.');
  }
}

export interface ICommentApi {
  findAll(id: string): Promise<CommentsByPostId>;
  create(id: string, content: string): Promise<Comments>;
}

export type Comments = {
  id: string;
  comment: string;
}

export type CommentsByPostId = {
  [key: string]: Comments[]
}

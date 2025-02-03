export class PostsApi implements IPostApi {
	async findAll(): Promise<PostsData> {
		const url = "http://localhost:4000/posts";
		try {
      console.log("url", url)
			const res = await fetch(url, { method: "GET" });
      console.log("res", res)
			if (res.ok) {
				const data: PostsData = await res.json();
        console.log("data", data)
				return data;
			}
		} catch (err) {
			console.log(err);
			throw new Error("Internal server error.");
		}
		throw new Error("Internal server error.");
	}
	async create(content: string): Promise<Post> {
		const url = "http://localhost:4000/posts";
		try {
			const res = await fetch(url, {
				method: "POST",
				body: JSON.stringify({ title: content }),
			});
			if (res.ok) {
				const data: Post = await res.json();
				return data;
			}
		} catch (err) {
			console.log(err);
			throw new Error("Internal server error.");
		}
		throw new Error("Internal server error.");
	}
}

export interface IPostApi {
	findAll(): Promise<PostsData>;
	create(content: string): Promise<Post>;
}

export type PostsData = {
	[key: string]: Post[];
};

export type Post = {
	id: string;
	title: string;
};

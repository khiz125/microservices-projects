import { Hono } from "hono";
import { logger } from "hono/logger";

import { randomBytes } from "crypto";
import { cors } from "hono/cors";

type Post = {
	id: string;
	title: string;
};
type PostData = {
	[key: string]: Post;
};

const app = new Hono();

const post: PostData = {
	"1234": { id: "5678", title: "test" },
};

app.use("*", logger());
app.use(
	"*",
	cors({
		origin: ['http://localhost:5173','http://localhost:4000',"http://localhost:3000"],
	})
);
app.get("/posts", (c): ReturnType<typeof c.json<Result<PostData>>> => {
	if (c.error) {
		return c.json({ ok: false, error: "Internal server error." }, 500);
	}
	return c.json({ ok: true, data: post }, 200);
});

app.post(
	"/posts",
	async (c): Promise<ReturnType<typeof c.json<Result<Post>>>> => {
		if (c.error) {
			return c.json({ ok: false, error: "Internal server error." }, 500);
		}
		const postData: Post = await c.req.json();
		const id = randomBytes(4).toString("hex");
		post[id] = { id: id, title: postData.title };
		await fetch("http://localhost:4005/events", {
			method: "POST",
			body: JSON.stringify({ id: id, title: postData.title }),
		});
		return c.json({ ok: true, data: post[id] }, 200);
	}
);

export default app;

export type Ok<T> = { ok: true; data: T };
export type Err<E = string> = { ok: false; error: E };

export type Result<T, E = string> = Ok<T> | Err<E>;
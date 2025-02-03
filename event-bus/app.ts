import { Hono } from "hono";
import { logger } from "hono/logger";

import { cors } from "hono/cors";

const app = new Hono();

app.use("*", logger());
app.use('/posts', cors({
  origin: ['http://localhost:5173',"http://localhost:4000","http://localhost:4001","http://localhost:3000"],
}));
app.use(
	"/posts/*",
	cors({
		origin: ['http://localhost:5173',"http://localhost:4000","http://localhost:4001","http://localhost:3000"],
	})
);
// app.get("/events", async (c) => {
//   const event = await c.req.json();
//   const params = {
// 		method: "GET",
// 	};
//   console.log("hello")
//   const p1 = fetch("http://localhost:4000/events", params);
//   const [res1] = await Promise.all([p1]);
//   return c.json({ ok: true, value: [res1.body] }, 200);
// })
app.post("/events", async (c) => {
	const event = await c.req.json();
	const params = {
		method: "POST",
		body: event,
	};
	const p1 = fetch("http://localhost:4000/events", params);
	// const p2 = fetch("http://localhost:4001/events", params);
	// const p3 = fetch("http://localhost:4002/events", params);
	// const [res1, res2, res3] = await Promise.all([p1, p2, p3]);
  const [res1] = await Promise.all([p1]);

	// return c.json({ ok: true, value: [res1.body, res2.body, res3.body] }, 200);
  return c.json({ ok: true, value: [res1.body] }, 200);
});

export default app;

import { Hono } from 'hono';

const app = new Hono()
app.get('/test', (c) => c.json({"message": "test"}));

export default app;
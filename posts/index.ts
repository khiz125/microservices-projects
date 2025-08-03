import app from "./app";

Bun.serve({
  port: 4000,
  fetch: app.fetch,
});

console.log("v1");
console.log("server running...");


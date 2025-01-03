import app from "./app";

Bun.serve({
  port: 3001,
  fetch: app.fetch
})

console.log("Hello via Bun!");
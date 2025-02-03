import app from "./app";

Bun.serve({
  port: 4005,
  fetch: app.fetch
})

console.log("Hello via Bun!");
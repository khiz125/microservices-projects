import app from "./app";

Bun.serve({
  port: 4001,
  fetch: app.fetch
})

console.log("Hello via Bun!");
import { app } from "./app.js";
import { env } from "./env/index.js";

async function startServer() {
  await app.listen({
    host: "0.0.0.0",
    port: env.PORT,
  });
  console.log("🚀 HTTP server running!")
  
}

startServer()
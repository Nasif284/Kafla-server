import "reflect-metadata";
import "dotenv/config";
import { DbManager } from "./config/db.pg.config";
import { getRedisClient } from "./config/redis.config";
import { buildContainer } from "./infrastructure/di/container";
import { App } from "./presentation/express/app";
import { createServer } from "http";
import { Server } from "socket.io";
import { registerChatSocket } from "./infrastructure/socket/chat.socket";
import { registerSocketAuth } from "./infrastructure/socket/socket-auth.middleware";
import { registerCallSocket } from "./infrastructure/socket/call.socket";

const PORT = parseInt(process.env.PORT ?? "5001", 10);

async function bootstrap(): Promise<void> {
  console.log("[Kafla Server] Initializing PostgreSQL client...");
  const db = DbManager.getInstance();
  const redis = getRedisClient();
  try {
    console.log("[Kafla Server] Connecting to database...");
    await db.$connect();
    console.log("[Kafla PostgreSQL] Connection verified successfully");
  } catch (err) {
    console.error("[Kafla PostgreSQL] Failed to connect:", err);
    process.exit(1);
  }

  try {
    console.log("[Server] Pinging Redis...");
    await redis.ping();
    console.log("Redis Connection verified");
  } catch (err) {
    console.error("redis Failed to connect:", err);
    process.exit(1);
  }

  const io = new Server({
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3001",
      credentials: true,
    },
  });

  const container = buildContainer(db, redis, io);
  const app = new App(container).getServer();

  const httpServer = createServer(app);

  io.attach(httpServer);

  registerSocketAuth(io);
  registerChatSocket(io);
  registerCallSocket(io);

  httpServer.listen(PORT, () => {
    console.log(`[Kafla Server] Running on http://localhost:${PORT}`);
    console.log(`[Kafla Server] Environment: ${process.env.NODE_ENV || "development"}`);
  });

  const shutdown = async () => {
    console.log("Shutting down TripHQ server gracefully...");
    await db.$disconnect();
    await redis.quit();
    process.exit(0);
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

bootstrap().catch((err) => {
  console.error("[TripHQ Server] Bootstrap failed:", err);
  process.exit(1);
});

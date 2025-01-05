import { webSocketController } from "@/api/ws/controller.ts";
import { WSContext } from "https://deno.land/x/hono@v4.3.11/helper/websocket/index.ts";
import { serveStatic } from "https://deno.land/x/hono@v4.3.11/middleware.ts";
import { Hono } from "https://deno.land/x/hono@v4.3.11/mod.ts";
import { ChatUsers } from "./src/api/ws/models/ChatUsers.ts";

const app = new Hono();
const apiApp = new Hono();

const chatUsers = new ChatUsers<WSContext>();

apiApp.get("/test", (c) => c.json({ message: "Hello Hono!!!" }));
apiApp.get("/ws", webSocketController(chatUsers));
app.route("/api", apiApp);
app.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }));
app.get("/about", serveStatic({ path: "./static/about.html" }));
app.get("/chat", serveStatic({ path: "./static/chat.html" }));
app.get("/", serveStatic({ path: "./static/index.html" }));

Deno.serve(app.fetch);

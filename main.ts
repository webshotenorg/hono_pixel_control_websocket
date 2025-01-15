import { webSocketController } from "@/chat/controller.ts";
import { ChatUsers } from "@/chat/models/ChatUsers.ts";
import { WSContext } from "https://deno.land/x/hono@v4.3.11/helper/websocket/index.ts";
import { serveStatic } from "https://deno.land/x/hono@v4.3.11/middleware.ts";
import { Hono } from "https://deno.land/x/hono@v4.3.11/mod.ts";

const app = new Hono();
const apiApp = new Hono();

const chatUsers = new ChatUsers<WSContext>();

apiApp.get("/test", (c) => c.json({ message: "Hello Hono!!!" }));
apiApp.get("/ws", webSocketController(chatUsers));
app.route("/api", apiApp);
app.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }));
app.get("/", serveStatic({ path: "./static/index.html" }));

Deno.serve(app.fetch);

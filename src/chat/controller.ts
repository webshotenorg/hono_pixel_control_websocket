import { broadcast } from "@/chat/business/broadcast.ts";
import { ChatUsers } from "@/chat/models/ChatUsers.ts";
import { upgradeWebSocket } from "https://deno.land/x/hono@v4.3.11/adapter/deno/websocket.ts";
import { WSContext } from "https://deno.land/x/hono@v4.3.11/helper/websocket/index.ts";

/**
 * WebSocket関連処理
 */
export const webSocketController = (chatUsers: ChatUsers<WSContext>) =>
  upgradeWebSocket((_c) => {
    let name = "";
    return {
      onMessage(event, ws: WSContext) {
        const req = JSON.parse(event.data.toString());
        if ("name" in req) {
          name = req.name;
          chatUsers.setName(name, ws);
          broadcast(chatUsers, { name, text: `${name}がログインしました` });
        } else if ("text" in req) {
          broadcast(chatUsers, { name, text: `（${name}）${req.text}` });
        }
      },
      onClose: () => {
        broadcast(chatUsers, { name, text: `${name}がログアウトしました` });
        chatUsers.deleteName(name);
      },
    };
  });

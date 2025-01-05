import { ChatUsers } from "@/chat/models/ChatUsers.ts";
import { upgradeWebSocket } from "https://deno.land/x/hono@v4.3.11/adapter/deno/websocket.ts";
import { WSContext } from "https://deno.land/x/hono@v4.3.11/helper/websocket/index.ts";
import { messageBroker } from "./business/messageBroker.ts";

/**
 * WebSocket関連処理
 */
export const webSocketController = (chatUsers: ChatUsers<WSContext>) =>
  upgradeWebSocket((_c) => {
    const uid = crypto.randomUUID();
    return {
      onOpen(_event, ws: WSContext) {
        chatUsers.loginUser(uid, ws);
      },
      onMessage(event, _ws: WSContext) {
        messageBroker(chatUsers, uid, event.data.toString());
      },
      onClose: () => {
        messageBroker(chatUsers, uid, null);
        chatUsers.logoutUser(uid);
      },
    };
  });

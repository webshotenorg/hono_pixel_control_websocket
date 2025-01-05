import { ChatUsers } from "@/chat/models/ChatUsers.ts";
import { WSContext } from "https://deno.land/x/hono@v4.3.11/helper/websocket/index.ts";
import { broadcast } from "./broadcast.ts";

export const messageBroker = (
  chatUsers: ChatUsers<WSContext>,
  uid: string,
  text: string | null,
) => {
  if (!chatUsers.getName(uid) && text !== null) {
    const name = text;
    const message = { uid, text: `${name}がログインしました` };
    broadcast(chatUsers, message);
    chatUsers.setName(uid, name);
  } else if (text === null) {
    broadcast(chatUsers, { uid, text: `${uid}がログアウトしました` });
  } else {
    const message = { uid, text: `${chatUsers.getName(uid)}:${text}` };
    broadcast(chatUsers, message);
  }
};

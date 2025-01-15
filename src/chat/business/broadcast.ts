import { ChatUsers } from "@/chat/models/ChatUsers.ts";
import { WSContext } from "https://deno.land/x/hono@v4.3.11/helper/websocket/index.ts";
import { IExportMessage, IMessage } from "./types.ts";

export const broadcast = (
  chatUsers: ChatUsers<WSContext>,
  message: IMessage,
) => {
  chatUsers.users.forEach((w, name) => {
    w.send(JSON.stringify({ me: { name }, message } satisfies IExportMessage));
  });
};

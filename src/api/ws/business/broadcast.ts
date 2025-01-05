import { WSContext } from "https://deno.land/x/hono@v4.3.11/helper/websocket/index.ts";
import { ChatUsers } from "../models/ChatUsers.ts";
import { IExportMessage, IMessage } from "./types.ts";

export const broadcast = (users: ChatUsers<WSContext>, message: IMessage) => {
  users.loginUsers.forEach((w, uid) => {
    w.send(JSON.stringify({ me: { uid }, message } satisfies IExportMessage));
  });
};

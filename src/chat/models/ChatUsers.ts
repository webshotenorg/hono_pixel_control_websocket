export type IChatUsers<T> = Map<string, T>;
export type IChatNames = Map<string, string>;

export class ChatUsers<T> {
  public loginUsers: IChatUsers<T>;
  public names: IChatNames;

  constructor() {
    this.loginUsers = new Map<string, T>();
    this.names = new Map<string, string>();
  }

  loginUser(uid: string, ws: T) {
    this.loginUsers.set(uid, ws);
  }

  logoutUser(uid: string) {
    this.loginUsers.delete(uid);
    this.names.delete(uid);
  }

  setName(uid: string, name: string) {
    this.names.set(uid, name);
  }

  getName(uid: string) {
    return this.names.get(uid);
  }
}

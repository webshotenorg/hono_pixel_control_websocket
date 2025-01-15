export type IChatNames<T> = Map<string, T>;

export class ChatUsers<T> {
  public users: IChatNames<T>;

  constructor() {
    this.users = new Map<string, T>();
  }

  setName(name: string, ws: T) {
    this.users.set(name, ws);
  }

  getName(name: string) {
    return this.users.get(name);
  }

  deleteName(name: string) {
    this.users.delete(name);
  }
}
